"use client"

import * as React from "react"

import { createClient } from "@/lib/supabase/client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
  "Stocks": {
    label: "Stocks",
    color: "var(--chart-1)",
  },
  "Mutual Funds": {
    label: "Mutual Funds",
    color: "var(--chart-2)",
  },
  "PPF": {
    label: "PPF",
    color: "var(--chart-3)",
  },
  "Gold": {
    label: "Gold",
    color: "var(--chart-4)",
  },
  "Silver": {
    label: "Silver",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function TotalPortfolioPieChart() {

  const supabase = createClient();

  const [totalPortfolioSummary, setTotalPortfolioSummary] = React.useState<any[] | null>(null);

  React.useEffect(() => {
    const fetchTotalPortfolioSummary = async () => {

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

      const chartData = [
        {
          instrument: "Stocks",
          "Current Value": stocksSummaryData?.[0]?.["Current Value"] || 0,
          "Total Investment": stocksSummaryData?.[0]?.["Total Investment"] || 0,
          fill: "var(--chart-1)"
        },
        {
          instrument: "Mutual Funds",
          "Current Value": mutualFundsSummaryData?.[0]?.["Current Value"] || 0,
          "Total Investment": mutualFundsSummaryData?.[0]?.["Total Investment"] || 0,
          fill: "var(--chart-2)"
        },
        {
          instrument: "PPF",
          "Current Value": ppfSummaryData?.[0]?.["Current Value"] || 0,
          "Total Investment": ppfSummaryData?.[0]?.["Total Investment"] || 0,
          fill: "var(--chart-3)"
        },
        {
          instrument: "Gold",
          "Current Value": goldSummaryData?.[0]?.["Current Value"] || 0,
          "Total Investment": goldSummaryData?.[0]?.["Total Investment"] || 0,
          fill: "var(--chart-4)"
        },
        {
          instrument: "Silver",
          "Current Value": silverSummaryData?.[0]?.["Current Value"] || 0,
          "Total Investment": silverSummaryData?.[0]?.["Total Investment"] || 0,
          fill: "var(--chart-5)"
        },
      ]

      setTotalPortfolioSummary(chartData);
    };

    fetchTotalPortfolioSummary();
  }, [supabase]);

  const totalCurrentValue: number = React.useMemo(() => {
    return totalPortfolioSummary?.reduce((acc, curr) => acc + curr["Current Value"], 0) || 0;
  }, [totalPortfolioSummary]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Portfolio</CardTitle>
        <CardDescription>
          Portfolio Allocation (Current Value)
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {totalPortfolioSummary ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={(props) => <CustomTooltip {...props} totalValue={totalCurrentValue} />}
              />
              <Pie data={totalPortfolioSummary} dataKey="Current Value" nameKey="instrument" />
              <ChartLegend
                content={<ChartLegendContent nameKey="instrument" />}
                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
              />
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="mx-auto h-[250px]" />
        )}
      </CardContent>
    </Card>
  )
}

function CustomTooltip({ active, payload, totalValue }: { active?: boolean; payload?: any[]; totalValue: number }) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0];
  const name = data.name;
  const value = data.value as number;
  const percentage = ((value / totalValue) * 100).toFixed(1);

  return (
    <div className="rounded-lg border bg-background p-2 shadow-md">
      <div className="flex flex-col">
        <p className="text-sm font-normal text-foreground">
          {name}
        </p>
        <p className="text-sm text-muted-foreground">
          {new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
          }).format(value)}
          <span className="ml-1 text-xs">({percentage}%)</span>
        </p>
      </div>
    </div>
  );
}
