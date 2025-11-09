import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient();

        const { searchParams } = new URL(request.url);
        const name = searchParams.get("name");
        const ticker = searchParams.get("ticker");

        let query = supabase
            .from("Mutual Funds - Holdings (History)")
            .select("*")
            .order("id", { ascending: false });

        // Filter by name if provided
        if (name) {
            query = query.eq("Name", name);
        }

        // Filter by ticker if provided
        if (ticker) {
            query = query.eq("Google Finance Ticker", ticker);
        }

        const { data, error } = await query;

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
