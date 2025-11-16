import { createClient } from "@/lib/supabase/server";

import { PortfolioCard } from "@/components/portfolio-card"

export async function PreciousMetalsSectionCards() {

  const supabase = await createClient();

  const [
    { data: totalPortfolioSummaryData, error: totalPortfolioSummaryError },
    { data: goldSummaryData, error: goldSummaryError },
    { data: silverSummaryData, error: silverSummaryError },
  ] = await Promise.all([
    supabase
      .from("Daily Total Portfolio Summary")
      .select("*")
      .order("Date", { ascending: false })
      .limit(1),
    supabase
      .from("Daily Precious Metals - Holdings Summary")
      .select("*")
      .eq("Metal", "Gold")
      .order("Date", { ascending: false })
      .limit(1),
    supabase
      .from("Daily Precious Metals - Holdings Summary")
      .select("*")
      .eq("Metal", "Silver")
      .order("Date", { ascending: false })
      .limit(1),
  ]);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">

      {/* {totalPortfolioSummaryData?.[0] && (
        <PortfolioCard
          title="Total Portfolio"
          currentValue={totalPortfolioSummaryData?.[0]?.["Current Value"]}
          totalInvestment={totalPortfolioSummaryData?.[0]?.["Total Investment"]}
          footerText="Combined portfolio across all categories"
        />
      )} */}

      {goldSummaryData?.[0] && (
        <PortfolioCard
          title="Gold"
          currentValue={goldSummaryData?.[0]?.["Current Value"]}
          totalInvestment={goldSummaryData?.[0]?.["Total Investment"]}
          date={goldSummaryData?.[0]?.["Date"]}
        />
      )}

      {silverSummaryData?.[0] && (
        <PortfolioCard
          title="Silver"
          currentValue={silverSummaryData?.[0]?.["Current Value"]}
          totalInvestment={silverSummaryData?.[0]?.["Total Investment"]}
          date={silverSummaryData?.[0]?.["Date"]}
        />
      )}

    </div>
  )
}
