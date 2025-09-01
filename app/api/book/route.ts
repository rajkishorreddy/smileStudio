import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json(); // {name, email, phone, type, message}
  // TODO: send email, save to DB, or hit FastAPI
  console.log("[BOOKING]", data);

  // quick validation example
  if (!data?.name || !data?.email) {
    return NextResponse.json({ ok: false, error: "Missing name/email" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
