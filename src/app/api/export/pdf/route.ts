import { NextResponse } from "next/server";
import { chromium } from "playwright";

import { renderResumePdfHtml } from "@/lib/export/pdfHtml";
import { PdfExportRequestSchema } from "@/lib/export/schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = PdfExportRequestSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json(
      {
        errors: payload.error.issues.map((issue) => ({
          message: issue.message,
          path: issue.path,
        })),
      },
      { status: 400 },
    );
  }

  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage();
    const html = renderResumePdfHtml(
      payload.data.resume,
      payload.data.templateId,
    );

    await page.setContent(html, {
      waitUntil: "networkidle",
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });
    const pdfBody = new Uint8Array(pdf);

    return new Response(pdfBody, {
      headers: {
        "Content-Disposition": 'attachment; filename="resume.pdf"',
        "Content-Type": "application/pdf",
      },
    });
  } finally {
    await browser.close();
  }
}
