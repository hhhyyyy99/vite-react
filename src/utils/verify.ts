export function calculateUtf8ByteLength(str: string): number {
  // 编码为 Uint8Array 来计算字节数
  const encoder = new TextEncoder();
  const encoded = encoder.encode(str);
  return encoded.length;
}

export function validateGroupAnnouncement(str: string, maxByteLength: number): boolean {
  const byteLength = calculateUtf8ByteLength(str);
  return byteLength <= maxByteLength;
}
// 写一个识别url的正则
export function validateUrl(url: string): boolean {
  const regex =
    /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?!-)([A-Za-z0-9-]{1,63}\.)*[A-Za-z]{2,6}|(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){2}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|\[?(([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:)|(([0-9A-Fa-f]{1,4}:){1,7}:)|(([0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,5}(:[0-9A-Fa-f]{1,4}){1,2})|(([0-9A-Fa-f]{1,4}:){1,4}(:[0-9A-Fa-f]{1,4}){1,3})|(([0-9A-Fa-f]{1,4}:){1,3}(:[0-9A-Fa-f]{1,4}){1,4})|(([0-9A-Fa-f]{1,4}:){1,2}(:[0-9A-Fa-f]{1,4}){1,5})|([0-9A-Fa-f]{1,4}:((:[0-9A-Fa-f]{1,4}){1,6}))|(:((:[0-9A-Fa-f]{1,4}){1,7}|:)))(%.+)?\]?)?(:(6553[0-5]|655[0-2][0-9]|65[0-4][0-9]{2}|64[0-9]{3}|[0-5]?[0-9]{1,4}))?$/;
  return regex.test(url);
}
