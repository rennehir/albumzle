import { createRNG } from "./rng";

export function shuffleWithSeed<T>(array: T[], seed: string): T[] {
  const rng = createRNG(seed);
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = rng.nextInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}
