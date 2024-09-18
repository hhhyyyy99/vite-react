import { useCallback, useMemo, useState } from 'react';
import { Header } from '../../../components/Header';
import { link } from '@hero/autolinker';
import '../index.css';

export default function Autolinker() {
  const [text, setText] = useState(
    'www.baidu.com好家伙，这aaa127.0.0.1:9000hgdhjagdjw是一个测试http://192.168.0.1:9000啊大大大127.0.0.1',
  );
  const transformedText = useCallback(() => {
    return link(text);
  }, [text]);
  return (
    <div>
      <textarea
        className="home-textarea"
        placeholder="请输入内容"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {/* <div dangerouslySetInnerHTML={{ __html: Element()}}></div> */}
      <div>{transformedText()}</div>
    </div>
  );
}
