import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { getUserById } from "~/model/user.model";

type SessionData = {
  userId: string;
  toast: string;
  error: string;
};

export const sessionStorage = createCookieSessionStorage<SessionData>({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.COOKIE_SECRET || ""],
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  },
});

export async function getUser(request: Request) {
  // get the session
  const cookie = request.headers.get("cookie");
  const session = await getSession(cookie);

  const userId = session.get("userId")!;

  try {
    return await getUserById(userId);
  } catch {
    return null;
  }
}

export async function requireUser(request: Request) {
  const cookie = request.headers.get("cookie");
  const session = await getSession(cookie);

  if (!session.has("userId")) {
    const url = new URL(request.url);
    throw redirect(`/?from=${url.pathname}`);
  }
  const userId = session.get("userId")!;

  try {
    return await getUserById(userId);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const { getSession, commitSession, destroySession } = sessionStorage;
