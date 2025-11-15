import { createClient } from "@/lib/supabase/server";

import { PortfolioCard } from "@/components/portfolio-card"

export async function SectionCards() {

  const supabase = await createClient();

  const { data: totalPortfolioSummaryData, error: totalPortfolioSummaryError } = await supabase
    .from("Daily Total Portfolio Summary")
    .select("*")
    .order("Date", { ascending: false })
    .limit(1);

  const { data: stocksSummaryData, error: stocksSummaryError } = await supabase
    .from("Daily Stocks - Holdings Summary")
    .select("*")
    .order("Date", { ascending: false })
    .limit(1);

  const { data: mutualFundsSummaryData, error: mutualFundsSummaryError } = await supabase
    .from("Daily Mutual Funds - Holdings Summary")
    .select("*")
    .order("Date", { ascending: false })
    .limit(1);

  const { data: ppfSummaryData, error: ppfSummaryError } = await supabase
    .from("Daily PPF Statement Summary")
    .select("*")
    .order("Date", { ascending: false })
    .limit(1);

  const { data: goldSummaryData, error: goldSummaryError } = await supabase
    .from("Daily Precious Metals - Holdings Summary")
    .select("*")
    .eq("Metal", "Gold")
    .order("Date", { ascending: false })
    .limit(1);

  const { data: silverSummaryData, error: silverSummaryError } = await supabase
    .from("Daily Precious Metals - Holdings Summary")
    .select("*")
    .eq("Metal", "Silver")
    .order("Date", { ascending: false })
    .limit(1);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">

      <PortfolioCard
        title="Total Portfolio"
        currentValue={totalPortfolioSummaryData?.[0]?.["Current Value"]}
        totalInvestment={totalPortfolioSummaryData?.[0]?.["Total Investment"]}
        footerText="Combined portfolio across all categories"
      />

      <PortfolioCard
        title="Stocks"
        currentValue={stocksSummaryData?.[0]?.["Current Value"]}
        totalInvestment={stocksSummaryData?.[0]?.["Total Investment"]}
        footerText=""
        date={stocksSummaryData?.[0]?.["Date"]}
      />

      <PortfolioCard
        title="Mutual Funds"
        currentValue={mutualFundsSummaryData?.[0]?.["Current Value"]}
        totalInvestment={mutualFundsSummaryData?.[0]?.["Total Investment"]}
        footerText=""
        date={mutualFundsSummaryData?.[0]?.["Date"]}
      />

      <PortfolioCard
        title="Public Provident Fund"
        currentValue={ppfSummaryData?.[0]?.["Current Value"]}
        totalInvestment={ppfSummaryData?.[0]?.["Total Investment"]}
        footerText=""
        date={ppfSummaryData?.[0]?.["Date"]}
      />

      <PortfolioCard
        title="Gold"
        currentValue={goldSummaryData?.[0]?.["Current Value"]}
        totalInvestment={goldSummaryData?.[0]?.["Total Investment"]}
        footerText=""
        date={goldSummaryData?.[0]?.["Date"]}
      />

      <PortfolioCard
        title="Silver"
        currentValue={silverSummaryData?.[0]?.["Current Value"]}
        totalInvestment={silverSummaryData?.[0]?.["Total Investment"]}
        footerText=""
        date={silverSummaryData?.[0]?.["Date"]}
      />

    </div>
  )
}
