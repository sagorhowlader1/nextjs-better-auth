import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);




/**
 * sign up: register : create Account: first time user
 * sign in: log in: already have account: repeated user
 * sing out : log out
 */