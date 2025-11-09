import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient();

        const { searchParams } = new URL(request.url);
        const instrument = searchParams.get("instrument");

        let query = supabase
            .from("Stocks - Holdings (History)")
            .select("*")
            .order("id", { ascending: false });

        // Filter by instrument if provided
        if (instrument) {
            query = query.eq("Instrument", instrument);
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
