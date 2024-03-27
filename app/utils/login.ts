import { db } from "./db.server";

export default async function login(
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null,
) {
  let user = null;
  const uc = await db.user.count();
  if (uc === 0) {
    user = await db.user.create({
      data: {
        email: email as string,
        password: password as string,
      },
    });
  } else {
    user = await db.user.findUnique({
      where: {
        email: email as string,
        password: password as string,
      },
    });
  }

  return user ? { userID: user.id } : { userID: "Notfound" };
}
