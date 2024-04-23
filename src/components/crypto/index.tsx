import { useState } from 'react';
import { encrypt, decrypt, replaceFields, key, data, fields } from '../../utils';

export default function Crypto() {
  const [value, setValue] = useState('18111111111');

  function handleEncrypt() {
    const enStr = encrypt(value, key);
    setValue(enStr);
    console.log(enStr);
  }

  function handleDecrypt() {
    const deStr = decrypt('luNt7LOxtpwKm1baESiqjA==', key);
    setValue(deStr);
    console.log(deStr);
  }

  function tranform() {
    const newData = replaceFields(data, fields);
    console.log(newData);
  }

  return (
    <>
      <p>值:{value}</p>
      <button onClick={handleEncrypt}>加密</button>
      <button onClick={handleDecrypt}>解密</button>
      <button onClick={tranform}>全部加密</button>
    </>
  );
}
