import { type User as DiscordUser, Routes, REST } from "discord.js";
import { db } from "~/db.server";

const discordRest = new REST({ version: "10" });

type DiscordUserInfo = Awaited<ReturnType<typeof getDiscordUser>>;
type Tokens = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export const getTokens = async (code: string): Promise<Tokens> => {
  const { access_token, refresh_token, expires_in } = await fetch(
    "https://discord.com/api/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${process.env.APP_URL}/webhooks/oauth/discord&client_id=${process.env.DISCORD_CLIENT_ID}&client_secret=${process.env.DISCORD_CLIENT_SECRET}`,
    }
  ).then((res) => res.json());
  discordRest.setToken(access_token);
  return { access_token, refresh_token, expires_in };
};

export const getDiscordUser = async () => {
  const discordUser = (await discordRest.get(
    Routes.oauth2CurrentAuthorization(),
    { authPrefix: "Bearer" }
  )) as { user: DiscordUser };

  const moreDiscordUser = (await discordRest.get(Routes.user(), {
    authPrefix: "Bearer",
  })) as { email: string; username: string; id: string };
  return { user: discordUser.user, additional: moreDiscordUser };
};

export const createUser = async (
  discordUser: DiscordUserInfo,
  tokenInfo: Tokens
) => {
  const createdUser = await db.user.create({
    data: {
      accessToken: tokenInfo.access_token,
      refreshToken: tokenInfo.refresh_token,
      expiresIn: tokenInfo.expires_in,
      discordUserId: discordUser.user.id,
      displayName: discordUser.user.username,
      email: discordUser.additional.email,
      profilePicture: discordUser.user.avatar,
      role: "GUEST",
    },
  });

  return createdUser;
};
