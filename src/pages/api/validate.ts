import type { APIRoute } from "astro";
import { getDailyPuzzle } from "../../lib/puzzle";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  const { guess } = body;

  // Recreate puzzle from seed
  const date = new Date();
  const puzzle = getDailyPuzzle(date);

  const solution = puzzle.solution;

  // Validate
  const result = guess.map((id: string, i: number) => {
    if (solution[i].id === id) return "correct";
    if (solution.some((a) => a.id === id)) return "misplaced";
    return "wrong";
  });

  return new Response(JSON.stringify({ result }), {
    headers: { "Content-Type": "application/json" },
  });
};
