import { db } from "./db.server";

export default async function login(
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null,
) {
  const user = await db.user.findUnique({
    where: {
      email: email as string,
      password: password as string,
    },
  });

  return user
    ? { userID: user.id }
    : { userID:"Notfound" };
}
