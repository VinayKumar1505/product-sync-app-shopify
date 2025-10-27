// app/utils/shopifySession.server.ts
import { shopifyApp } from "~/shopify.server";

export async function getCurrentStore(request: Request) {
  const { session } = await shopifyApp.auth.loadSession(request);
  return session.shop;
}
