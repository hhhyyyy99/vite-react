import React, { useEffect, useRef, useState } from 'react';
// 引入编辑器组件
import BraftEditorInstance, { EditorState } from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import { getMessageElemArray } from './tools';
import rawJSON from './rawJson.json';
import './index.css';
import { ContentUtils } from 'braft-utils';

// 引入表情包扩展模块样式文件
import 'braft-extensions/dist/emoticon.css';
// 引入表情包扩展模块和默认表情包列表
import Emoticon, { defaultEmoticons } from 'braft-extensions/dist/emoticon';
import {blockRendererFn} from "./CustomBlock.tsx";

// 也可以使用自己的表情包资源，不受打包工具限制
const emoticons = [
  'http://path/to/emoticon-1.png',
  'http://path/to/emoticon-2.png',
  'http://path/to/emoticon-3.png',
  'http://path/to/emoticon-4.png',
];

const options = {
  includeEditors: ['editor-id-1'], // 指定该模块对哪些BraftEditor生效，不传此属性则对所有BraftEditor有效
  excludeEditors: ['editor-id-2'], // 指定该模块对哪些BraftEditor无效
  emoticons: emoticons, // 指定可用表情图片列表，默认为空
  closeOnBlur: false, // 指定是否在点击表情选择器之外的地方时关闭表情选择器，默认false
  closeOnSelect: false, // 指定是否在选择表情后关闭表情选择器，默认false
};

BraftEditorInstance.use(Emoticon(options));

const blockExportFn = (contentState: any, block: any) => {
  if (block.type === 'atomic') {
    const entity = contentState.getEntity(contentState.getBlockForKey(block.key).getEntityAt(0));

    const blockData = entity.getData();

    if (entity.getType() === 'block-video') {
      return {
        start: `<div class="block-video" >${JSON.stringify(blockData)}`,
        end: '</div>',
      };
    }

    if (entity.getType() === 'block-file') {
      return {
        start: `<div class="block-file" >${JSON.stringify(blockData)}`,
        end: '</div>',
      };
    }

    if (entity.getType() === 'block-image') {
      const { nase64URL, ...others } = blockData;
      return {
        start: `<div class="block-image">${others}`,
        end: '</div>',
      };
    }

    if (entity.getType() === 'block-reply-msg') {
      return {
        start: `<div class="block-reply-msg">${JSON.stringify(blockData)}`,
        end: '</div>',
      };
    }
  }
};

function sendMsg(v: any, option?) {
  const text = v.map((item: any) => item.text_elem_content).join('');
  return [{ text }];
}
export default function BraftEditor() {
  const [editorState, setEditorState] = useState<EditorState>(
    BraftEditorInstance.createEditorState(null, { blockExportFn }),
  );
  const editorInstance = useRef(null);
  const [renderArrary, setRenderArrary] = useState<any[]>([]);

  const handleChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    updateScroll();
  };
  const getContent = () => {
    const content = editorState.toRAW();

    const messageElemArray = getMessageElemArray(content);
    const renderArrary = sendMsg(messageElemArray);
    setRenderArrary(renderArrary);
  };

  const setContent = (json: any) => {
    const { blocks, entityMap } = json;

    // 将blocks数组中每一项的text组合成一个字符串
    const text = blocks.map((block: any) => block.text.trim()).join('');
    const newBlocks = { ...blocks[0], text };
    const newJson = { blocks: [newBlocks], entityMap };
    const rawString = JSON.stringify(newJson);
    const editorState = BraftEditorInstance.createEditorState(rawString);
    setEditorState(editorState);
  };
  // 根据根据HTML字符串得到最终展示文案
  const getPasteText = (htmlString: string) => {
    return htmlString;
  };
  const handlePastedText = (text: any) => {
    const pastedText = getPasteText(text);
    setEditorState(ContentUtils.insertText(editorState, pastedText));
  };
  const updateScroll = () => {
    // @ts-ignore
    const editorElement = editorInstance.current?.containerNode;
    const el = document.querySelector(".bf-container .public-DraftEditor-content>div")
    el!.scrollTop = 300
  };
  useEffect(() => {
    if (editorInstance.current) {
      // @ts-ignore
    }
  }, [editorInstance.current]);
  return (
    <div className="editor-wrapper">
      <div className="editor-wrapper-text">
      <BraftEditorInstance
        ref={editorInstance}
        value={editorState}
        onChange={handleChange}
        blockRendererFn={blockRendererFn}
        converts={{ blockExportFn }}
        contentStyle={{ height: '100%', fontSize: 14 }}
        draftProps={{ handlePastedText }}
      />
      </div>
      <div className='editor-wrapper-action'>
        <button onClick={getContent}>获取内容</button>
        <button onClick={() => setContent(rawJSON)}>渲染内容</button>
      </div>
      <p>
        {renderArrary.map((item, index) => {
          return <p key={index}>{`${item.text}`}</p>;
        })}
      </p>
    </div>
  );
}
