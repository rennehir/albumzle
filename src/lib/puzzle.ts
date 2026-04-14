import { createRNG } from "./rng";
import { shuffleWithSeed } from "./shuffle";
import data from "../../data/sample.json";

const ALBUM_COUNT = 5;

export type Puzzle = {
  seed: string;
  shuffled: (typeof data)["albums"];
  solution: (typeof data)["albums"];
};

export const getDailyPuzzle = (date: Date): Puzzle => {
  const seed = date.toISOString().slice(0, 10);

  // Separate RNGs for clarity
  const selectionRng = createRNG(seed);
  const shuffleSeed = seed + "-shuffle";

  // 1. Pick N unique albums deterministically
  const pool = [...data.albums];
  const selected: typeof data.albums = [];

  while (selected.length < ALBUM_COUNT && pool.length > 0) {
    const index = selectionRng.nextInt(pool.length);
    selected.push(pool[index]);
    pool.splice(index, 1); // ensure uniqueness
  }

  // 2. Shuffle for UI (separately seeded!)
  const shuffled = shuffleWithSeed(selected, shuffleSeed);

  // 3. Correct order
  const sorted = [...selected].sort(
    (a, b) =>
      new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime(),
  );

  return {
    seed,
    shuffled, // what player sees
    solution: sorted, // correct order
  };
};
