import types from '@doaction/types';
import * as radash from 'radash';

export const data = {
  code: 2,
  userProxy: {
    user: {
      phone: '1811111111',
      devices: [
        {
          id: 2,
          phone_number: 18122222,
          role: [
            { id: 1, phone: 1812192 },
            { id: 2, phone: 1812192 },
            { id: 3, phone: 1812192 },
            {
              id: 4,
              phone: 1812192,
            },
            { id: 5, phone: 1812192 },
          ],
        },
        { id: 3, phone_number: 18122222 },
        { id: 4, phone_number: 18122222 },
        { id: 25, phone_number: 18122222 },
      ],
    },
    phone: '18111111111',
    user_name: 'dwa',
    user_phone: 182212321,
  },
  isBuy: 2,
};

export const fields = ['phone', 'user_phone', 'phone_number'];

interface DeepObject {
  [key: string]: DeepObject | object | string | null | number;
}

export function replaceFields<T extends DeepObject>(obj: T, fields: string[]): T {
  Object.keys(obj).forEach((key: keyof T) => {
    // @ts-ignore
    if (fields.includes(key)) {
      // @ts-ignore
      obj[key] = 'xxx'; // 在这里，我们使用类型断言来确保 newValue 能被赋值给 obj[key]
    } else if (
      (types.isArray(obj[key]) || types.isObject(obj[key])) &&
      (radash.isArray(obj[key]) || radash.isObject(obj[key]))
    ) {
      // @ts-ignore
      replaceFields(obj[key] as T[keyof T], fields); // 注意这里必须进行类型断言，因为 T[keyof T] 可能不是一个对象
    }
  });
  return obj;
}
