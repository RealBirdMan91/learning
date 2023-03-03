import type { MetaFunction, LinksFunction, LoaderArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { typedjson } from "remix-typedjson";

import stylesheet from "~/tailwind.css";
import { getUser } from "./auth/session.server";
import Header from "./components/header";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Learning Platform",
  viewport: "width=device-width,initial-scale=1",
});

export const loader = async ({ request }: LoaderArgs) => {
  return typedjson({
    user: await getUser(request),
    from: new URL(request.url).searchParams.get("from"),
  });
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-background text-foreground antialiased">
        <Header />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
