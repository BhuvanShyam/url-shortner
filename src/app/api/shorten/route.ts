import UrlShortnerService from "@/services/UrlShortenerService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { originalUrl } = await req.json();

    if (!originalUrl) {
      return NextResponse.json(
        { error: "originalUrl is required" },
        { status: 400 }
      );
    }

    const shortnerService = new UrlShortnerService();
    const shortUrl = await shortnerService.shortenUrl(originalUrl);
    return NextResponse.json({ shortUrl }, { status: 201 });

  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
    const shortnerService = new UrlShortnerService();
    const response  = await shortnerService.getAllUrls();
    return NextResponse.json({response})
}
