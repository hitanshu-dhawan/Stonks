import { createClient } from "@/lib/supabase/server";

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Portfolio</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ₹{totalPortfolioSummaryData?.[0]?.["Current Value"]?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {((totalPortfolioSummaryData?.[0]?.["Current Value"] || 0) - (totalPortfolioSummaryData?.[0]?.["Total Investment"] || 0)) >= 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {((totalPortfolioSummaryData?.[0]?.["Current Value"] || 0) - (totalPortfolioSummaryData?.[0]?.["Total Investment"] || 0)) >= 0 ? '+' : '-'}{(((totalPortfolioSummaryData?.[0]?.["Current Value"] || 0) - (totalPortfolioSummaryData?.[0]?.["Total Investment"] || 0)) / (totalPortfolioSummaryData?.[0]?.["Total Investment"] || 1) * 100).toFixed(2)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Investment : ₹{totalPortfolioSummaryData?.[0]?.["Total Investment"]?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-muted-foreground">
            Combined portfolio across all categories
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Stocks</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ₹{stocksSummaryData?.[0]?.["Current Value"]?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {((stocksSummaryData?.[0]?.["Current Value"] || 0) - (stocksSummaryData?.[0]?.["Total Investment"] || 0)) >= 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {((stocksSummaryData?.[0]?.["Current Value"] || 0) - (stocksSummaryData?.[0]?.["Total Investment"] || 0)) >= 0 ? '+' : '-'}{(((stocksSummaryData?.[0]?.["Current Value"] || 0) - (stocksSummaryData?.[0]?.["Total Investment"] || 0)) / (stocksSummaryData?.[0]?.["Total Investment"] || 1) * 100).toFixed(2)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Investment : ₹{stocksSummaryData?.[0]?.["Total Investment"]?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-muted-foreground">
            Last updated : {stocksSummaryData?.[0]?.["Date"]}
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Mutual Funds</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ₹{mutualFundsSummaryData?.[0]?.["Current Value"]?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {((mutualFundsSummaryData?.[0]?.["Current Value"] || 0) - (mutualFundsSummaryData?.[0]?.["Total Investment"] || 0)) >= 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {((mutualFundsSummaryData?.[0]?.["Current Value"] || 0) - (mutualFundsSummaryData?.[0]?.["Total Investment"] || 0)) >= 0 ? '+' : '-'}{(((mutualFundsSummaryData?.[0]?.["Current Value"] || 0) - (mutualFundsSummaryData?.[0]?.["Total Investment"] || 0)) / (mutualFundsSummaryData?.[0]?.["Total Investment"] || 1) * 100).toFixed(2)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Investment : ₹{mutualFundsSummaryData?.[0]?.["Total Investment"]?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-muted-foreground">
            Last updated : {mutualFundsSummaryData?.[0]?.["Date"]}
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Public Provident Fund</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ₹{ppfSummaryData?.[0]?.["Current Value"]?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {((ppfSummaryData?.[0]?.["Current Value"] || 0) - (ppfSummaryData?.[0]?.["Total Investment"] || 0)) >= 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {((ppfSummaryData?.[0]?.["Current Value"] || 0) - (ppfSummaryData?.[0]?.["Total Investment"] || 0)) >= 0 ? '+' : '-'}{(((ppfSummaryData?.[0]?.["Current Value"] || 0) - (ppfSummaryData?.[0]?.["Total Investment"] || 0)) / (ppfSummaryData?.[0]?.["Total Investment"] || 1) * 100).toFixed(2)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Investment : ₹{ppfSummaryData?.[0]?.["Total Investment"]?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-muted-foreground">
            Last updated : {ppfSummaryData?.[0]?.["Date"]}
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Gold</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ₹{goldSummaryData?.[0]?.["Current Value"]?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {((goldSummaryData?.[0]?.["Current Value"] || 0) - (goldSummaryData?.[0]?.["Total Investment"] || 0)) >= 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {((goldSummaryData?.[0]?.["Current Value"] || 0) - (goldSummaryData?.[0]?.["Total Investment"] || 0)) >= 0 ? '+' : '-'}{(((goldSummaryData?.[0]?.["Current Value"] || 0) - (goldSummaryData?.[0]?.["Total Investment"] || 0)) / (goldSummaryData?.[0]?.["Total Investment"] || 1) * 100).toFixed(2)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Investment : ₹{goldSummaryData?.[0]?.["Total Investment"]?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-muted-foreground">
            Last updated : {goldSummaryData?.[0]?.["Date"]}
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Silver</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ₹{silverSummaryData?.[0]?.["Current Value"]?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {((silverSummaryData?.[0]?.["Current Value"] || 0) - (silverSummaryData?.[0]?.["Total Investment"] || 0)) >= 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {((silverSummaryData?.[0]?.["Current Value"] || 0) - (silverSummaryData?.[0]?.["Total Investment"] || 0)) >= 0 ? '+' : '-'}{(((silverSummaryData?.[0]?.["Current Value"] || 0) - (silverSummaryData?.[0]?.["Total Investment"] || 0)) / (silverSummaryData?.[0]?.["Total Investment"] || 1) * 100).toFixed(2)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Investment : ₹{silverSummaryData?.[0]?.["Total Investment"]?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-muted-foreground">
            Last updated : {silverSummaryData?.[0]?.["Date"]}
          </div>
        </CardFooter>
      </Card>

    </div>
  )
}
