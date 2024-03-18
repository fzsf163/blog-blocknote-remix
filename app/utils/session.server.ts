// app/services/session.server.ts
import { createCookieSessionStorage, redirect } from "@remix-run/node";

const s =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJc3N1ZXIgKGlzcykiOiJJc3N1ZXIiLCJJc3N1ZWQgQXQgKGlhdCkiOiIyMDI0LTAzLTE4VDE1OjU5OjE4LjA4MFoiLCJFeHBpcmF0aW9uIFRpbWUgKGV4cCkiOiIyMDI0LTAzLTE4VDE2OjU5OjE4LjA4MFoiLCJTdWJqZWN0IChzdWIpIjoiU3ViamVjdCIsIlVzZXJuYW1lIChhdWQpIjoiSmF2YUd1aWRlcyIsIlJvbGUiOiJBRE1JTiJ9.jzfxlg2pOn2YU4hV2prIOMFDmdNzuxuW054vzNYt5ao";
// export the whole sessionStorage object
export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: [s], // replace this with an actual secret
    secure: process.env.NODE_ENV === "production",
    // enable this in prod only
  },
});

// you can also export the methods individually for your own usage
export let { getSession, commitSession, destroySession } = sessionStorage;

export async function requireUserSession(request: any) {
  // get the session
  const session = await getSession(request.headers.get("Cookie"));

  // validate the session, `userId` is just an example, use whatever value you
  // put in the session when the user authenticated
  const user = session.data?.sessionKey?.userID;
  if (!user) {
    throw redirect("/admin");
  }
  // if (!session.has("user")) {
  //   // if there is no user session, redirect to login
  //   throw redirect("/admin");
  // }

  return session;
}
