import type {User} from "@prisma/client"
import { db } from "~/db.server"
import invariant from "tiny-invariant";


export async function getUserById(id: string): Promise<User> {
    const user = await db.user.findUnique({ where: { id } });

    invariant(user, "User must be present")

    return user;
}