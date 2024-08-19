import { useMemo, useState } from 'react';
import { Header } from '../../components/Header';
import { extractLinks,Verify} from '@hero/autolinker';
import './index.css';
function openLink(url: string) {
  console.log(url);
}
function handleUrl(text: string) {
 const result = extractLinks(text)
  return result.map((item, index) => {
   if(Verify.isUrl(item)){
       const url = item.startsWith("http") ? item : `http://${item}`;
    return <a key={index} href={url} onClick={() => openLink(item)} target="_blank">{item}</a>;
   }
   return <p key={index}>{item}</p>;
  });
}
export default function Test() {
  const [text, setText] = useState(
    'www.baidu.com好家伙，这aaa127.0.0.1:9000hgdhjagdjw是一个测试http://192.168.0.1:9000啊大大大127.0.0.1',
  );
  const Element = useMemo(() => handleUrl(text), [text]);
  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <textarea
          className="home-textarea"
          placeholder="请输入内容"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {/* <div dangerouslySetInnerHTML={{ __html: Element()}}></div> */}
        <div className="flex gap-2">{Element}</div>
      </div>
    </div>
  );
}
