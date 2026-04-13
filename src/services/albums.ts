import data from "../../data/sample.json";

export const getRandomAlbums = (count: number) => {
  return data.artists
    .flatMap((artist) =>
      artist.albums.map((album) => ({ ...album, artist: artist.artist })),
    )
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
};
