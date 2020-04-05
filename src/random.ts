import { encode } from "./encrypt";

const seed = Number.MAX_SAFE_INTEGER - 11e14;

export function random(): string {
  return encode(1e15 + Math.floor(Math.random() * seed) + Date.now());
}
