import { describe, expect, it } from "vitest";
import { getRandomAlbums } from "./albums";

describe("getRandomAlbums", () => {
  it("returns given amount of albums", () => {
    const albums = getRandomAlbums(5);
    expect(albums.length).toBe(5);
  });
});
