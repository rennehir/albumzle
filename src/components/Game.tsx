import { useState } from "react";

type Album = {
  id: string;
  title: string;
  artist: { id: string; name: string };
  releaseDate: string;
};

type Puzzle = {
  shuffled: Album[];
  solution: Album[];
};

type Attempt = {
  guess: Album[];
  result: ("correct" | "misplaced" | "wrong")[];
};

const emojiMap = {
  correct: "🟩",
  misplaced: "🟨",
  wrong: "⬛",
};

const MAX_ATTEMPTS = 5;

export const Game = ({ puzzle }: { puzzle: Puzzle }) => {
  const [slots, setSlots] = useState<(Album | null)[]>(
    Array(puzzle.solution.length).fill(null),
  );
  const [pool, setPool] = useState<Album[]>(puzzle.shuffled);
  const [result, setResult] = useState<null | boolean[]>(null);

  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  // 👉 Add album to next empty slot
  const addToSlot = (album: Album) => {
    const index = slots.findIndex((s) => s === null);
    if (index === -1) return;

    const newSlots = [...slots];
    newSlots[index] = album;

    setSlots(newSlots);
    setPool(pool.filter((a) => a.id !== album.id));
  };

  // 👉 Remove album from slot
  const removeFromSlot = (index: number) => {
    const album = slots[index];
    if (!album) return;

    const newSlots = [...slots];
    newSlots[index] = null;

    setSlots(newSlots);
    setPool([...pool, album]);
  };

  // 👉 Submit guess
  const handleSubmit = async () => {
    if (slots.some((s) => s === null)) return;
    if (gameOver) return;

    const guess = slots.map((a) => a!.id);

    const res = await fetch("/api/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guess }),
    });

    const data = await res.json();

    const newAttempt: Attempt = {
      guess: slots.map((a) => a!), // store full album objects
      result: data.result,
    };

    const newAttempts = [...attempts, newAttempt];
    setAttempts(newAttempts);

    // 🟩 Win condition
    const isCorrect = data.result.every((r: string) => r === "correct");

    if (isCorrect) {
      setWon(true);
      setGameOver(true);
      return;
    }

    // ❌ Lose condition
    if (newAttempts.length >= MAX_ATTEMPTS) {
      setGameOver(true);
    }

    // 🔄 Reset slots for next attempt
    setSlots(Array(puzzle.shuffled.length).fill(null));
    setPool(puzzle.shuffled);
  };

  const generateShareText = () => {
    const date = new Date().toISOString().slice(0, 10);

    const rows = attempts.map((attempt) =>
      attempt.result.map((r) => emojiMap[r]).join(""),
    );

    return `Albumzle ${date}
  ${rows.join("\n")}

  ${won ? `${attempts.length}/5` : "X/5"}`;
  };

  const handleShare = async () => {
    const text = generateShareText();

    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch {
      alert(text); // fallback
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h2>Daily Album Order</h2>

      {gameOver && (
        <div style={{ marginTop: 20 }}>
          {won ? "🎉 Correct!" : "❌ Better luck tomorrow!"}
        </div>
      )}

      {gameOver && (
        <button
          onClick={handleShare}
          style={{
            marginTop: 12,
            padding: 10,
            width: "100%",
          }}
        >
          Share
        </button>
      )}

      {/* Attempt history */}
      <div style={{ marginBottom: 20 }}>
        {attempts.map((attempt, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 6 }}>
              {attempt.guess.map((album, j) => (
                <div
                  key={j}
                  style={{
                    flex: 1,
                    padding: 6,
                    fontSize: 12,
                    textAlign: "center",
                    background:
                      attempt.result[j] === "correct"
                        ? "#6aaa64"
                        : attempt.result[j] === "misplaced"
                          ? "#c9b458"
                          : "#787c7e",
                    color: "white",
                  }}
                >
                  <div>{album.title}</div>
                  <div style={{ fontSize: 10 }}>{album.artist.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 🟦 Slots */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {slots.map((album, i) => (
          <div
            key={i}
            onClick={() => removeFromSlot(i)}
            style={{
              flex: 1,
              minHeight: 60,
              border: "2px solid #ccc",
              background: result
                ? result[i]
                  ? "#6aaa64" // green
                  : "#c9b458" // yellow-ish
                : "#eee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: album ? "pointer" : "default",
              padding: 4,
              textAlign: "center",
            }}
          >
            {album ? (
              <div>
                <div>{album.title}</div>
                <small>{album.artist.name}</small>
              </div>
            ) : (
              "?"
            )}
          </div>
        ))}
      </div>

      {/* 🎵 Pool */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {pool.map((album) => (
          <button
            key={album.id}
            onClick={() => addToSlot(album)}
            style={{
              padding: 8,
              cursor: "pointer",
            }}
          >
            {album.title} – {album.artist.name}
          </button>
        ))}
      </div>

      {/* ✅ Submit */}
      <button
        onClick={handleSubmit}
        disabled={slots.some((s) => s === null)}
        style={{
          marginTop: 16,
          padding: 10,
          width: "100%",
        }}
      >
        Submit
      </button>
    </div>
  );
};
