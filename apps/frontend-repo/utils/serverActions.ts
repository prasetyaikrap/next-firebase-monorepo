"use server";

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setCookies(cookieItems: ResponseCookie[]) {
  const cookieStore = await cookies();
  cookieItems.forEach((cookie) =>
    cookieStore.set({
      path: "/",
      httpOnly: true,
      secure: true,
      ...cookie,
    })
  );
}

export async function getCookies(keys: string[]) {
  const cookieStore = await cookies();
  return keys.map((key) => cookieStore.get(key));
}

export async function deleteCookies(keys: string[]) {
  const cookieStore = await cookies();
  return keys.map((key) => cookieStore.delete(key));
}

export async function deleteCookie(key: string) {
  (await cookies()).delete(key);
}

export async function redirectTo(path: string) {
  return redirect(path);
}
