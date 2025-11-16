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

export function PublicProvidentFundAreaChart() {

  const supabase = createClient();

  const [publicProvidentFundSummary, setPublicProvidentFundSummary] = React.useState<any[] | null>(null);

  React.useEffect(() => {
    const fetchPublicProvidentFundSummary = async () => {
      const { data } = await supabase
        .from("PPF Statement")
        .select("*");

      if (data) {
        // Sort data by year, month, day
        const sortedData = data.sort((a: any, b: any) => {
          if (a["Date (Year)"] !== b["Date (Year)"]) {
            return a["Date (Year)"] - b["Date (Year)"];
          }
          if (a["Date (Month)"] !== b["Date (Month)"]) {
            return a["Date (Month)"] - b["Date (Month)"];
          }
          return a["Date (Day)"] - b["Date (Day)"];
        });

        let totalInvestment = 0;
        let currentValue = 0;

        const transformedData = sortedData.map((entry: any) => {
          // Create Date string
          const date = new Date(
            entry["Date (Year)"],
            entry["Date (Month)"] - 1,
            entry["Date (Day)"]
          ).toISOString();

          // Calculate cumulative Total Investment (only deposits)
          if (entry["Category"] === "Deposit") {
            totalInvestment += entry["Credit Amount"] || 0;
          }

          // Calculate cumulative Current Value (all entries)
          currentValue += (entry["Credit Amount"] || 0) - (entry["Debit Amount"] || 0);

          return {
            Date: date,
            "Total Investment": totalInvestment,
            "Current Value": currentValue,
          };
        });

        setPublicProvidentFundSummary(transformedData);
      }
    };

    fetchPublicProvidentFundSummary();
  }, [supabase]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Public Provident Fund</CardTitle>
        <CardDescription>
          Historical Public Provident Fund Performance
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {publicProvidentFundSummary ? (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={publicProvidentFundSummary}>
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
                    year: "numeric",
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
                        year: "numeric",
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
