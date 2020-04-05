const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const radix = chars.length;

export function encode(num: number): string {
  if (num < radix) {
    return chars.charAt(num);
  }
  const remainder = num % radix;
  return `${encode((num - remainder) / radix)}${chars.charAt(remainder)}`;
}

export function decode(str: string): number {
  const len = str.length;
  let num = 0;
  for (let i = 0; i < len; i++) {
    num += chars.indexOf(str.charAt(len - i - 1)) * radix ** i;
  }
  return num;
}
