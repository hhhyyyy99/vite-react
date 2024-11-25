export const getMessageElemItem = (
  type: string,
  data: { text?: string; path?: string; name?: string; size?: number },
) => {
  switch (type) {
    case "text": {
      return {
        elem_type: 0,
        text_elem_content: data.text,
      };
    }
    case "block-video": {
      return {
        elem_type: 9,
      };
    }
    case "block-file": {
      return {
        elem_type: 4,
       
      };
    }
    case "block-image": {
      return {
        elem_type: 1,
      };
    }
    case "block-reply-msg": {
      return {
        elem_type: 999
      }
    }
  }
};
// 得到最终发送的messageElemArray
export const getMessageElemArray = (rawData: any) => {
  try {
    const data = JSON.parse(rawData);
    const { blocks, entityMap } = data; 
    const messageElementArray:any[] = [];

    blocks?.forEach((item:any) => {
      const { type, text, entityRanges } = item;
      switch (type) {
        case "unstyled": {
          const trimText = text;
          if (trimText?.length) {
            messageElementArray.push(
              getMessageElemItem("text", { text: text })
            );
          }
          break;
        }
        case "atomic": {
          entityRanges.forEach((v:any) => {
            const { key } = v;
            const entity = entityMap[key];
            const { type: customBlockType, data } = entity;
            messageElementArray.push(
              getMessageElemItem(customBlockType, data)
            );
          });
        }
      }
    });
    return messageElementArray;
  } catch (e) {
    console.log(e);
  }
  return [];
};