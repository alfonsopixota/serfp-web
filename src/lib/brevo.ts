import { getCached } from "./cache";

const BREVO_API = "https://api.brevo.com/v3";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getHeaders() {
  return {
    "api-key": process.env.BREVO_API_KEY ?? "",
    "Content-Type": "application/json",
  };
}

export interface BrevoContact {
  id: number;
  email: string;
  createdAt: string;
  listIds: number[];
}

export async function getSubscribers(): Promise<BrevoContact[]> {
  return getCached("brevo:subscribers", CACHE_TTL, async () => {
    const listId = process.env.BREVO_LIST_ID ?? "3";
    const res = await fetch(`${BREVO_API}/contacts?listIds=${listId}&limit=100`, {
      headers: getHeaders(),
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();
    return (data.contacts ?? []).map((c: Record<string, unknown>) => ({
      id: c.id as number,
      email: c.email as string,
      createdAt: c.createdAt as string,
      listIds: c.listIds as number[],
    }));
  });
}

export async function getSubscriberCount(): Promise<number> {
  const subscribers = await getSubscribers();
  return subscribers.length;
}
