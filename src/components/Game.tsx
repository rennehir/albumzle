import { useState } from "react";
import { Slots } from "./Slots";
import { Pool } from "./Pool";
import type { Album, Attempt, Puzzle } from "../types";
import { History } from "./History";

const MAX_ATTEMPTS = 5;

type GameProps = {
  puzzle: Puzzle;
};

export const Game = ({ puzzle }: GameProps) => {
  const [slots, setSlots] = useState<(Album | null)[]>(
    Array(puzzle.solution.length).fill(null),
  );
  const [pool, setPool] = useState<Album[]>(puzzle.shuffled);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const addToSlot = (album: Album) => {
    const i = slots.findIndex((s) => !s);
    if (i === -1) return;

    const next = [...slots];
    next[i] = album;

    setSlots(next);
    setPool(pool.filter((a) => a.id !== album.id));
  };

  const removeFromSlot = (i: number) => {
    const album = slots[i];
    if (!album) return;

    const next = [...slots];
    next[i] = null;

    setSlots(next);
    setPool([...pool, album]);
  };

  const submit = async () => {
    if (slots.some((s) => !s) || gameOver) return;

    const res = await fetch("/api/validate", {
      method: "POST",
      body: JSON.stringify({ guess: slots.map((a) => a!.id) }),
    });

    const data = await res.json();

    const attempt: Attempt = {
      guess: slots.map((a) => a!),
      result: data.result,
    };

    const nextAttempts = [...attempts, attempt];
    setAttempts(nextAttempts);

    const correct = data.result.every((r: string) => r === "correct");

    if (correct) {
      setWon(true);
      setGameOver(true);
      return;
    }

    if (nextAttempts.length >= MAX_ATTEMPTS) {
      setGameOver(true);
    }

    setSlots(Array(puzzle.solution.length).fill(null));
    setPool(puzzle.shuffled);
  };

  return (
    <>
      <History attempts={attempts} />
      <Slots slots={slots} removeFromSlot={removeFromSlot} />
      <Pool pool={pool} addToSlot={addToSlot} />
      <button onClick={submit} disabled={slots.some((s) => !s)}>
        Submit
      </button>
    </>
  );
};
