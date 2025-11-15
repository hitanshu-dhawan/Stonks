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

interface PortfolioCardProps {
  title: string
  currentValue?: number
  totalInvestment?: number
  footerText: string
  date?: string
}

export function PortfolioCard({
  title,
  currentValue = 0,
  totalInvestment = 0,
  footerText,
  date,
}: PortfolioCardProps) {
  const gain = currentValue - totalInvestment
  const isPositive = gain >= 0
  const percentage = ((gain / (totalInvestment || 1)) * 100).toFixed(2)

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          ₹{currentValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            {isPositive ? <IconTrendingUp /> : <IconTrendingDown />}
            {isPositive ? '+' : '-'}{percentage}%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Investment : ₹{totalInvestment.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="text-muted-foreground">
          {date ? `Last updated : ${date}` : footerText}
        </div>
      </CardFooter>
    </Card>
  )
}
