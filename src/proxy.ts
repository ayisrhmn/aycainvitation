import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  // Only protect /admin/* routes
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Get authorization header
  const authHeader = request.headers.get("authorization");

  // Check if credentials are provided
  if (!authHeader?.startsWith("Basic ")) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": `Basic realm="Admin Dashboard"`,
        "Content-Type": "text/plain",
      },
    });
  }

  // Decode and validate credentials
  try {
    const encoded = authHeader.slice(6);
    const decoded = Buffer.from(encoded, "base64").toString("utf-8");
    const [username, password] = decoded.split(":");

    const validUsername = process.env.ADMIN_USERNAME || "admin";
    const validPassword = process.env.ADMIN_PASSWORD || "adminayca2931";

    if (username === validUsername && password === validPassword) {
      return NextResponse.next();
    }
  } catch (error) {
    // Invalid base64 or malformed header
  }

  // Invalid credentials
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="Admin Dashboard"`,
      "Content-Type": "text/plain",
    },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
