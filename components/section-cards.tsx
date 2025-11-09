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

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $1,250.00
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
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
          <CardDescription>PPF</CardDescription>
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
    </div>
  )
}
