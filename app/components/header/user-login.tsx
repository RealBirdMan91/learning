import { Form } from "@remix-run/react";
import { useTypedLoaderData } from "remix-typedjson";
import { type loader } from "~/root";
import { SiDiscord } from "react-icons/si";
import Button from "../shared/button";

export function UserLogin() {
  const { from } = useTypedLoaderData<typeof loader>();
  return (
    <Form>
      <Button leading={<SiDiscord />}>Login</Button>
    </Form>
  );
}
