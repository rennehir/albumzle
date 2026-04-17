import type { Album } from "../types";

type SlotsProps = {
  slots: (Album | null)[];
  removeFromSlot: (index: number) => void;
};

export const Slots = ({ slots, removeFromSlot }: SlotsProps) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {slots.map((album, i) => (
        <div
          key={i}
          onClick={() => removeFromSlot(i)}
          className="h-20 rounded border border-base-300 bg-base-100 flex items-center justify-center text-center cursor-pointer"
        >
          {album ? (
            <div className="text-xs">
              <div>{album.title}</div>
              <div className="opacity-70 text-[10px]">{album.artist.name}</div>
            </div>
          ) : (
            "?"
          )}
        </div>
      ))}
    </div>
  );
};
