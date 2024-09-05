import {useState, useEffect, useRef} from "react";
import {Header} from "@/components/Header.tsx";
import "./index.css"
import {Input,Button,Radio} from "antd";
enum ResponseMode{
  Streaming="streaming",
  Blocking="blocking",
}
enum Type{
  Question="question",
  Answer="answer",
}
function scrollToBottom(element: HTMLElement): void {
  // 确保元素存在
  if (element) {
    // 滚动到元素底部
    element.scrollTop = element.scrollHeight + parseInt(getComputedStyle(element).paddingTop) + parseInt(getComputedStyle(element).paddingBottom);
  }
}
export default function AI(){
  const [question, setQuestion] = useState("");
  const [apiKey, setApiKey] = useState("")
  const [responseMode, setResponseMode] = useState(ResponseMode.Streaming)
  const [aiList,setAiList] = useState([])
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 当 chatContainerRef 的当前元素改变时，将滚动条滚动到底部
    if (chatContainerRef.current) {
      scrollToBottom(chatContainerRef.current);
    }
  }, [aiList]); // 空依赖数组确保这个效果仅在组件挂载后运行一次

  // 函数用于更新 aiList 中最后一个元素的 content
  const updateLastContent =  (newContent:string) => {
   // 替换aiList最后一组元素的content
   const newList = [...aiList]
   // @ts-ignore
    newList[newList.length-1].content = newContent
   setAiList(newList)
  };
  async function handleSubmit() {
    const input = {
      "query": question,
      "user": "abc-123",
      "Authorization": apiKey
    }
    // @ts-ignore
    // setAiList(item=> [...item, {type: Type.Question, content: question}])
    aiList.push({type: Type.Question, content: question})
    // @ts-ignore
    const {inputs_json,...reset} = input
    const inputs = inputs_json ? JSON.parse(inputs_json) : {}
    const params = {inputs,response_mode:responseMode,...reset}
    setQuestion("")
    if(responseMode == ResponseMode.Streaming){
     handleEventSource(params)
      return
    }
    const result:any = await chat_messages(params);
    // @ts-ignore
    aiList.push({type: Type.Answer, content:  result.answer})
    // setAiList((item:any[])=> [...item, {type: Type.Answer, content: result.answer}])
    // @ts-ignore
    if (chatContainerRef.current) {
      scrollToBottom(chatContainerRef.current);
    }
  }

  async function chat_messages(input:any) {
    const {Authorization,...params} = input
    const url = "https://api.dify.ai/v1/chat-messages"
    const result = await fetch(url,{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${Authorization}`,
      },
      body:JSON.stringify(params)
    }).then(response => response.json())
    return result
  }
  async function handleEventSource(input:any){
    const {Authorization,...params} = input
    // 发送 POST 请求到服务器以启动 SSE 流
    const response =  await fetch('https://api.dify.ai/v1/chat-messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Authorization}`,
      },
      body: JSON.stringify(params)
    })
    // 处理 SSE 流
    // 检查响应是否成功
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    // @ts-ignore
    aiList.push({type: Type.Answer, content: ""})
    const body = await response.body; // 假定服务端返回SSE流的URL
    // @ts-ignore
    const reader = body.getReader();
    reader.read().then(function processResult(result) {
      if (result.done) {
        console.log("Stream complete");
        return;
      }
      const text = new TextDecoder().decode(result.value);
      // 处理接收到的每一条消息
    const list =   text.split("data: ")
      list.forEach(item => {
        if(item.length > 0){
          const dataItem = JSON.parse(item);
          if(dataItem.event == "message"){
            // @ts-ignore
            const content = aiList[aiList.length - 1].content
            const newContent = content + dataItem.answer
            updateLastContent(newContent)
          }
        }
      })
      // 继续读取下一条消息
      reader.read().then(processResult);
    });
  }
  return(<>
    <div className={"home-container"}>
      <Header/>
      {/*写一个选择器(使用antd组件)让用户选择是streaming还是blocking模式*/}
      <div className={"response-mode"}>
        <h2 style={{textAlign: "center"}}>AI对话</h2>
        <span>选择返回模式:</span>
        <Radio.Group value={responseMode} onChange={(e) => setResponseMode(e.target.value)}>
          <Radio value={ResponseMode.Streaming}>Streaming</Radio>
          <Radio value={ResponseMode.Blocking}>Blocking</Radio>
        </Radio.Group>
        <Input value={apiKey} onChange={(e) => setApiKey(e.target.value)}></Input>
      </div>
      <div className={"ai-box"} ref={chatContainerRef}>
        {
          aiList.map((item:any,index) => {
            if(item.type === Type.Question){
              return <p key={index} className={"question-item"}>{item.content}</p>
            }else{
              return <p key={index} className={"answer-item"}>{item.content}</p>
            }
          })
        }
      </div>
      <div className={"question"}>
        <Input value={question} onChange={(e) => setQuestion(e.target.value)}></Input>
        <Button onClick={handleSubmit}>提交</Button>
      </div>
    </div>
  </>)
}
