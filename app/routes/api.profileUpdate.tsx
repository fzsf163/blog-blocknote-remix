import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { db } from "~/utils/db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return { Ok: "FROM LAODER PROFILE UPDATE" };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const profileData = await request.json();
  const id = profileData?.id;
  const name = profileData?.name;
  const email = profileData?.email;
  const password = profileData?.password;
  const bio = profileData?.bio;

  const get_User = await db.user.findUnique({
    where: {
      id: id,
    },
    select: {
      bio: true,
      email: true,
      id: true,
      name: true,
      password: true,
    },
  });

  if (get_User) {
    await db.user.update({
      where: {
        id: get_User.id,
      },
      data: {
        name: name ?? get_User.name,
        bio: bio ?? get_User.bio,
        email: email ?? get_User.email,
        password: password ?? get_User.password,
      },
    });
    return { status: "Success" };
  }

  return { ok: "OK" };
};
