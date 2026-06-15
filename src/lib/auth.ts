import { cookies } from "next/headers";

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const auth = cookieStore.get("dashboard_auth");
  const password = process.env.DASHBOARD_PASSWORD;
  return auth?.value === password;
}
