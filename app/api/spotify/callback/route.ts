import { exchangeCodeForTokens } from "@/lib/spotify";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return new Response(`Spotify authorization failed: ${error}`, {
      status: 400,
    });
  }

  if (!code) {
    return new Response("Missing authorization code.", { status: 400 });
  }

  const redirectUri = new URL("/api/spotify/callback", request.url).toString();
  const tokens = await exchangeCodeForTokens(code, redirectUri);

  if (!tokens) {
    return new Response("Failed to exchange authorization code for tokens.", {
      status: 500,
    });
  }

  return new Response(
    [
      "Spotify connected.",
      "",
      "Add this to your server environment (never commit it):",
      "",
      `SPOTIFY_REFRESH_TOKEN=${tokens.refreshToken}`,
      "",
      "Then restart the app and remove or protect this callback route in production.",
    ].join("\n"),
    {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    },
  );
}
