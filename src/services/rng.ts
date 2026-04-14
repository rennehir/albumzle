/**
 * Convert string seed → number
 */
export function hashString(seed: string): number {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);

  return (h ^= h >>> 16) >>> 0;
}

/**
 * RNG generator
 */
export function createRNG(seed: string) {
  const h = hashString(seed);

  return {
    next() {
      return h / 4294967296; // 0–1
    },
    nextInt(max: number) {
      return Math.floor(this.next() * max);
    },
    pick<T>(arr: T[]): T {
      return arr[this.nextInt(arr.length)];
    },
  };
}
