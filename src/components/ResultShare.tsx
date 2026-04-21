import { useState } from "react";
import type { Attempt } from "../types";

type Props = {
  attempts: Attempt[];
  won: boolean;
  maxAttempts?: number;
};

const emojiMap: Record<Attempt["result"][number], string> = {
  correct: "🟩",
  misplaced: "🟨",
  wrong: "⬛",
};

export const ResultShare = ({ attempts, won, maxAttempts = 5 }: Props) => {
  const [copied, setCopied] = useState(false);

  const date = new Date().toISOString().slice(0, 10);

  const rows = attempts.map((attempt) =>
    attempt.result.map((r) => emojiMap[r]).join(""),
  );

  const shareText = `Albumzle ${date}
${rows.join("\n")}

${won ? `${attempts.length}/${maxAttempts}` : `X/${maxAttempts}`}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert(shareText); // fallback
    }
  };

  return (
    <div className="mt-6 mb-6 text-center">
      <pre className="bg-base-200 text-base-content p-4 rounded-xl inline-block font-mono text-sm leading-relaxed mb-3">
        {shareText}
      </pre>

      <div>
        <button className="btn btn-primary" onClick={handleCopy}>
          Share
        </button>
      </div>

      {copied && (
        <div className="text-sm mt-2 opacity-80">Copied to clipboard!</div>
      )}
    </div>
  );
};
