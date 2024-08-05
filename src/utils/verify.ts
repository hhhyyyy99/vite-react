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