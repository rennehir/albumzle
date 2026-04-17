import data from "../data/sample.json";

export type Album = {
  id: string;
  title: string;
  artist: { id: string; name: string };
};

export type Attempt = {
  guess: Album[];
  result: ("correct" | "misplaced" | "wrong")[];
};

export type Puzzle = {
  seed: string;
  shuffled: (typeof data)["albums"];
  solution: (typeof data)["albums"];
};
