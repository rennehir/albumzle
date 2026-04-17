import { colorMap } from "../styles/utils";
import type { Attempt } from "../types";

export const History = ({ attempts }: { attempts: Attempt[] }) => {
  return (
    <div className="flex flex-col gap-2">
      {attempts.map((attempt, i) => (
        <div key={i} className="grid grid-cols-5 gap-2">
          {attempt.guess.map((album, j) => (
            <div
              key={j}
              className={`p-2 rounded text-xs text-center ${colorMap[attempt.result[j]]}`}
            >
              <div>{album.title}</div>
              <div className="opacity-70 text-[10px]">{album.artist.name}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
