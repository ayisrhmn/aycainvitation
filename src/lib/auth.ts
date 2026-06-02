import { headers } from "next/headers";

/**
 * Validasi HTTP Basic Auth dari header Authorization
 * Digunakan di server components untuk check credentials
 */
export async function validateBasicAuth(): Promise<boolean> {
  const headersList = await headers();
  const authHeader = headersList.get("authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return false;
  }

  const encoded = authHeader.slice(6);
  const decoded = Buffer.from(encoded, "base64").toString("utf-8");
  const [username, password] = decoded.split(":");

  const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    console.error("ADMIN_USERNAME atau ADMIN_PASSWORD tidak dikonfigurasi");
    return false;
  }

  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

/**
 * Return 401 response dengan WWW-Authenticate header
 * Trigger browser Basic Auth popup
 */
export function unauthorized401Response() {
  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="Admin Dashboard"`,
      "Content-Type": "text/plain",
    },
  });
}
