import { getNowPlaying } from "@/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
  const nowPlaying = await getNowPlaying();

  if (!nowPlaying) {
    return new Response(null, { status: 204 });
  }

  return Response.json(nowPlaying);
}
