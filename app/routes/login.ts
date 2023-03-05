import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getSession } from "~/auth/session.server";

export const action: ActionFunction = async ({ request }) => {
  const params = new URL(request.url).searchParams;
  const type = params.get("type");
  const from = params.get("from");
  switch (type) {
    case "discord": {
      const params = new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID || "",
        redirect_uri: `${process.env.APP_URL}/webhooks/oauth/discord`,
        scope:
          "identify email messages.read guilds guilds.join guilds.members.read",
        state: from!,
        response_type: "code",
      });

      const url = `https://discord.com/api/oauth2/authorize?${params.toString()}`;
      return redirect(url);
    }
    default:
      return redirect("/");
  }
};

export const loader: LoaderFunction = async () => {
  return redirect("/");
};
