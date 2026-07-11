import { getSpotifyAuthUrl } from "@/lib/spotify";

export async function GET(request: Request) {
  const redirectUri = new URL("/api/spotify/callback", request.url).toString();
  const authUrl = getSpotifyAuthUrl(redirectUri);

  if (!authUrl) {
    return new Response(
      "Spotify is not configured. Set SPOTIFY_CLIENT_ID first.",
      {
        status: 500,
      },
    );
  }

  return Response.redirect(authUrl);
}
