"use client"

import * as React from "react"

import { createClient } from "@/lib/supabase/client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
  "Total Investment": {
    label: "Total Investment",
    color: "var(--primary)",
  },
  "Current Value": {
    label: "Current Value",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {

  const supabase = createClient();

  const [totalPortfolioSummary, setTotalPortfolioSummary] = React.useState<any[] | null>(null);

  React.useEffect(() => {
    const fetchTotalPortfolioSummary = async () => {
      const { data } = await supabase
        .from("Daily Total Portfolio Summary")
        .select("*")
        .order("Date", { ascending: true });

      const filteredData = data?.filter((item) => item.Date >= "2025-11-01") || null;

      setTotalPortfolioSummary(filteredData);
    };

    fetchTotalPortfolioSummary();
  }, []);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Portfolio</CardTitle>
        <CardDescription>
          Historical Portfolio Performance
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {totalPortfolioSummary ? (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={totalPortfolioSummary || []}>
              <defs>
                <linearGradient id="fillTotalInvestment" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--chart-1)"
                    stopOpacity={1.0}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillCurrentValue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--chart-2)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chart-2)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="Date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  if (value === 0) return '';
                  const lakhs = value / 100000;
                  return `₹${lakhs.toFixed(0)}L`;
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="Current Value"
                type="natural"
                fill="url(#fillCurrentValue)"
                stroke="var(--chart-2)"
              />
              <Area
                dataKey="Total Investment"
                type="natural"
                fill="url(#fillTotalInvestment)"
                stroke="var(--chart-1)"
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <div className="aspect-auto h-[250px] w-full" />
        )}
      </CardContent>
    </Card>
  )
}
