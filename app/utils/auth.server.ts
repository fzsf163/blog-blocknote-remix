// app/services/auth.server.ts
import { Authenticator, AuthorizationError } from "remix-auth";
import { destroySession, sessionStorage } from "~/utils/session.server";
import { FormStrategy } from "remix-auth-form";
import login from "./login";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export type User = {
  userID: string;
};
export let authenticator = new Authenticator<User | null>(sessionStorage, {
  sessionKey: "sessionKey",
  sessionErrorKey: "sessionErrorKey",
});

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email") as string;
    let password = form.get("password") as string;
    // let user = await login(email, password);
    let user = null;
    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method

    // You can validate the inputs however you want
    if (!email || email?.length === 0)
      throw new AuthorizationError("Bad Email");

    if (!password || password?.length < 0)
      throw new AuthorizationError("Password is required");

    let getUser = await login(email, password);
    if (getUser?.userID === "Notfound") {
      throw new AuthorizationError("Bad Credentials");
    } else {
      let id = getUser.userID;
      user = { userID: id };
    }
    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass",
);
