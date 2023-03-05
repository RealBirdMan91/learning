import { LoaderFunction, redirect } from "@remix-run/node";
import { commitSession, getSession } from "~/auth/session.server";
import { createUser, getDiscordUser, getTokens } from "~/model/auth.model";
import { getUserByDiscordId } from "~/model/user.model";

export const loader: LoaderFunction = async ({ request }) => {
  const params = new URL(request.url).searchParams;
  const { error, error_description, state, code } = Object.fromEntries(
    params.entries()
  );

  const session = await getSession();
  try {
    if (error) throw new Error(error_description);
    if (!code) throw new Error("no code provided");

    const tokens = await getTokens(code);
    const discordUser = await getDiscordUser();

    let user = await getUserByDiscordId(discordUser.user.id);
    if (!user) {
      user = await createUser(discordUser, tokens);
    }

    session.set("userId", user.id);
    session.flash("toast", "Discord connected");
    return redirect(state, {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  } catch (err) {
    let error = err as Error;
    session.flash("error", error.message);
    return redirect("/");
  }
};
