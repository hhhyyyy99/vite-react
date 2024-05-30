import { useState } from 'react';
import { Button, Input,message } from 'antd';
import axios from 'axios'
import "./index.css"
function isHostOrIP(value: string) {
  const reg = /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?!-)([A-Za-z0-9-]{1,63}\.)*[A-Za-z]{2,6}|(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){2}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|\[?(([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:)|(([0-9A-Fa-f]{1,4}:){1,7}:)|(([0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,5}(:[0-9A-Fa-f]{1,4}){1,2})|(([0-9A-Fa-f]{1,4}:){1,4}(:[0-9A-Fa-f]{1,4}){1,3})|(([0-9A-Fa-f]{1,4}:){1,3}(:[0-9A-Fa-f]{1,4}){1,4})|(([0-9A-Fa-f]{1,4}:){1,2}(:[0-9A-Fa-f]{1,4}){1,5})|([0-9A-Fa-f]{1,4}:((:[0-9A-Fa-f]{1,4}){1,6}))|(:((:[0-9A-Fa-f]{1,4}){1,7}|:)))(%.+)?\]?)?(:(6553[0-5]|655[0-2][0-9]|65[0-4][0-9]{2}|64[0-9]{3}|[0-5]?[0-9]{1,4}))?$/
  return reg.test(value);
}

export default function Qiankun() {
  const [value, setValue] = useState('');
  function verify(){
    const result = isHostOrIP(value)
    console.log(result);
    if(result){
      return message.success("正确")
    }
    return message.error("错误")
  }
  async function fetchRun(){
    await window.fetch('https://jsonplaceholder.typicode.com/todos/1',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
  }
  async function axiosRun(){
    await axios({
        url:"https://jsonplaceholder.typicode.com/posts",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
  }
  
  
  function ajaxRun(url:string) {
    // 创建一个新的XMLHttpRequest对象
    const xhr = new XMLHttpRequest();
  
    // 配置请求类型、URL以及是否异步处理
    xhr.open('GET', url, true);
  
    // 发送请求
    xhr.send();
  }
  return (
    <>
      <div className='home-container'>
        <div className='verify-box'>
        <Input
          placeholder={'Enter GitHub Token'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></Input>
        <Button onClick={verify}>校验</Button>
        </div>
        <div>
        <h1>接口请求</h1>
        <Button onClick={fetchRun}>运行fetch</Button>
        <Button onClick={axiosRun}>运行ajax</Button>
        <Button onClick={()=>ajaxRun('https://jsonplaceholder.typicode.com/albums')}>运行axios</Button>
      </div>
      </div>
    </>
  );
}
