import { NextResponse } from "next/server";
import sql from "mssql";
import { getDbPool } from "@/lib/db";
import type { ProcessorRequest } from "@/types/api";

export async function POST(request: Request) {
  let body: ProcessorRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({
      code: 9997,
      message: "Invalid JSON body",
      data: {},
    });
  }

  try {
    const pool = await getDbPool();
    const req = pool.request();
    req.input("input_json", sql.NVarChar(sql.MAX), JSON.stringify(body));
    req.output("output_json", sql.NVarChar(sql.MAX));

    const result = await req.execute("crm_sp_processor");
    const outputJson: string = result.output.output_json;

    if (!outputJson) {
      return NextResponse.json({ code: 9995, message: "Empty response from SP", data: {} });
    }

    const responseData = JSON.parse(outputJson);
    return NextResponse.json(responseData);
  } catch (err) {
    console.error("[processor] DB error:", err);
    return NextResponse.json({
      code: 9996,
      message: "Database error",
      data: {},
    });
  }
}
