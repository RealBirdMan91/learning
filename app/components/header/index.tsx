import { useTypedLoaderData } from "remix-typedjson";
import { loader } from "~/root";
import { UserLogin } from "./user-login";
import UserMenu from "./user-menu";

export default function Header() {
  const { user } = useTypedLoaderData<typeof loader>();

  return (
    <header className="text-white flex h-20 items-center py-4 px-8">
      <div className="flex-1">
        <h2 className="select-none text-lg font-bold">DevHaus Learning</h2>
        {user ? <UserMenu /> : <UserLogin />}
      </div>
    </header>
  );
}
