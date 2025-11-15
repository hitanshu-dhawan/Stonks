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
  "Price": {
    label: "Price",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function StockInstrumentPriceAreaChart({ instrument }: { instrument: string }) {

  const supabase = createClient();

  const [stockInstrumentPrice, setStockInstrumentPrice] = React.useState<any[] | null>(null);

  React.useEffect(() => {
    const fetchStockInstrumentPrice = async () => {
      const { data } = await supabase
        .from("Stocks - Holdings (History)")
        .select("*")
        .eq("Instrument", instrument)
        .order("created_at", { ascending: true });

      setStockInstrumentPrice(data);
    };

    fetchStockInstrumentPrice();
  }, [instrument, supabase]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>{instrument} Price</CardTitle>
        <CardDescription>
          Historical {instrument} Price
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {stockInstrumentPrice ? (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={stockInstrumentPrice}>
              <defs>
                <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
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
                dataKey="created_at"
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

                  return new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 0
                  }).format(value);
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
                dataKey="LTP"
                type="natural"
                fill="url(#fillPrice)"
                stroke="var(--chart-2)"
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
