import { createClient } from "@/lib/supabase/server";

import { PortfolioCard } from "@/components/portfolio-card"

export async function PublicProvidentFundSectionCards() {

  const supabase = await createClient();

  const [
    { data: totalPortfolioSummaryData, error: totalPortfolioSummaryError },
    { data: ppfSummaryData, error: ppfSummaryError },
  ] = await Promise.all([
    supabase
      .from("Daily Total Portfolio Summary")
      .select("*")
      .order("Date", { ascending: false })
      .limit(1),
    supabase
      .from("Daily PPF Statement Summary")
      .select("*")
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

      {ppfSummaryData?.[0] && (
        <PortfolioCard
          title="Public Provident Fund"
          currentValue={ppfSummaryData?.[0]?.["Current Value"]}
          totalInvestment={ppfSummaryData?.[0]?.["Total Investment"]}
          date={ppfSummaryData?.[0]?.["Date"]}
        />
      )}

    </div>
  )
}
