import { pinyin } from 'pinyin-pro';

// 检查字符串是否只包含a-z范围内的字符
const isAlpha = (str:string) => /^[a-zA-Z]+$/.test(str);

// 判断是不是中文汉字
const isChinese = (str:string) => /[\u4e00-\u9fa5]/.test(str);

// 获取字符串的拼音首字母,如果不是则返回原字符串
const getInitial= (str:string) => {
  if (isChinese(str)) {
    const pinyinFirstChar = pinyin(str, { pattern: 'initial' });
    return pinyinFirstChar[0];
  }
  return str;
};

export function sort(list:Array<string>) {
  const sortedList = list.sort((a, b) => {
    const initialA = getInitial(a);
    const initialB = getInitial(b);
    // 按照字母顺序排序 如果isAlpha为false啧放在最后面
    if (isAlpha(initialA) && isAlpha(initialB)) {
      return initialA.localeCompare(initialB);
    } else if (isAlpha(initialA) && !isAlpha(initialB)) {
      return -1;
    } else if (!isAlpha(initialA) && isAlpha(initialB)) {
      return 1;
    }
    return 0;
  });
  return sortedList;
}

export function sortByKey<T>(list:T[], getValueByKey:(item:T)=> string): T[] {
  const sortedList = list.sort((a, b) => {
    const initialA = getInitial(getValueByKey(a).charAt(0));
    const initialB = getInitial(getValueByKey(b).charAt(0));
    // 按照字母顺序排序 如果isAlpha为false啧放在最后面
    if (isAlpha(initialA) && isAlpha(initialB)) {
      return initialA.localeCompare(initialB);
    } else if (isAlpha(initialA) && !isAlpha(initialB)) {
      return -1;
    } else if (!isAlpha(initialA) && isAlpha(initialB)) {
      return 1;
    }
    return 0;
  });
  return sortedList
}
