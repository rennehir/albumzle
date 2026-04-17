import type { Album } from "../types";

type PoolProps = {
  pool: Album[];
  addToSlot: (album: Album) => void;
};

export const Pool = ({ pool, addToSlot }: PoolProps) => {
  return (
    <div className="flex flex-col gap-2">
      {pool.map((album) => (
        <button
          key={album.id}
          onClick={() => addToSlot(album)}
          className="btn btn-outline btn-sm justify-start"
        >
          {album.title} – {album.artist.name}
        </button>
      ))}
    </div>
  );
};
