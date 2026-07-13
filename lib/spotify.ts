const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

type SpotifyTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

type SpotifyCurrentlyPlayingResponse = {
  is_playing: boolean;
  item: {
    name: string;
    artists: { name: string }[];
    external_urls: { spotify: string };
  } | null;
};

export type NowPlaying = {
  title: string;
  artist: string;
  url: string;
};

function getSpotifyCredentials() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  return { clientId, clientSecret, refreshToken };
}

async function getAccessToken(
  clientId: string,
  clientSecret: string,
  refreshToken: string,
): Promise<string | null> {
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as SpotifyTokenResponse;
  return data.access_token;
}

export async function getNowPlaying(): Promise<NowPlaying | null> {
  const credentials = getSpotifyCredentials();
  if (!credentials) {
    return null;
  }

  const accessToken = await getAccessToken(
    credentials.clientId,
    credentials.clientSecret,
    credentials.refreshToken,
  );

  if (!accessToken) {
    return null;
  }

  const response = await fetch(
    `${SPOTIFY_API_BASE}/me/player/currently-playing`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    },
  );

  if (response.status === 204 || !response.ok) {
    return null;
  }

  const data = (await response.json()) as SpotifyCurrentlyPlayingResponse;

  if (!data.is_playing || !data.item) {
    return null;
  }

  return {
    title: data.item.name,
    artist: data.item.artists.map((artist) => artist.name).join(", "),
    url: data.item.external_urls.spotify,
  };
}
