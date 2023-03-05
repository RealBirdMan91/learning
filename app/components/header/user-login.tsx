import { Form } from "@remix-run/react";
import { useTypedLoaderData } from "remix-typedjson";
import { type loader } from "~/root";
import { SiDiscord } from "react-icons/si";
import Button from "../shared/button";

export function UserLogin() {
  const { from } = useTypedLoaderData<typeof loader>();
  return (
    <Form
      action={`/login?type=discord&from=${from ? from : "/"}`}
      method="post"
    >
      <Button leading={<SiDiscord />}>Login</Button>
    </Form>
  );
}
