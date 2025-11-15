"use client"

// React hooks for state and lifecycle management
import { useState, useEffect } from 'react';

import { createClient } from "@/lib/supabase/client";
import { JwtPayload } from "@supabase/supabase-js";

import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconChartDonut,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconTrendingUp,
  IconChartPie,
  IconCoins,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavInstruments } from "@/components/nav-instruments"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Stocks",
      url: "/stocks",
      icon: IconTrendingUp,
    },
    {
      title: "Mutual Funds",
      url: "/mutual-funds",
      icon: IconChartPie,
    },
    {
      title: "Gold & Silver",
      url: "/precious-metals",
      icon: IconCoins,
    },
  ],
  // navSecondary: [
  //   {
  //     title: "Settings",
  //     url: "#",
  //     icon: IconSettings,
  //   },
  //   {
  //     title: "Get Help",
  //     url: "#",
  //     icon: IconHelp,
  //   },
  //   {
  //     title: "Search",
  //     url: "#",
  //     icon: IconSearch,
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const supabase = createClient();

  const [user, setUser] = useState<JwtPayload | undefined>(undefined);
  const [stocksHoldings, setStocksHoldings] = useState<any[] | null>(null);
  const [mutualFundsHoldings, setMutualFundsHoldings] = useState<any[] | null>(null);

  // Fetch user on component mount
  useEffect(() => {
    const fetchUser = async () => {
      // You can also use getUser() which will be slower.
      const { data } = await supabase.auth.getClaims();
      setUser(data?.claims);
    };

    fetchUser();
  }, [supabase]);

  // Fetch stocks holdings on component mount
  useEffect(() => {
    const fetchStocksHoldings = async () => {
      const { data } = await supabase
        .from("Stocks - Holdings")
        .select("*")
        .order("Instrument", { ascending: true });

      setStocksHoldings(data);
    };

    fetchStocksHoldings();
  }, [supabase]);

  // Fetch mutual funds holdings on component mount
  useEffect(() => {
    const fetchMutualFundsHoldings = async () => {
      const { data } = await supabase
        .from("Mutual Funds - Holdings")
        .select("*")
        .order("Name", { ascending: true });

      setMutualFundsHoldings(data);
    };

    fetchMutualFundsHoldings();
  }, [supabase]);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconChartDonut className="!size-5" />
                <span className="text-base font-semibold">Stonks</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {stocksHoldings && (
          <NavInstruments
            title="Stocks"
            items={stocksHoldings.map((holding) => ({
              name: holding.Instrument,
              url: `/stocks/${holding.Instrument}`,
              icon: IconTrendingUp,
            }))}
          />
        )}
        {mutualFundsHoldings && (
          <NavInstruments
            title="Mutual Funds"
            items={mutualFundsHoldings.map((holding) => ({
              name: holding.Name,
              url: `/mutual-funds`,
              icon: IconChartPie,
            }))}
          />
        )}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        {user && <NavUser user={{ name: 'Hitanshu Dhawan', email: user.email || '', avatar: 'https://avatars.githubusercontent.com/u/22273871' }} />}
      </SidebarFooter>
    </Sidebar>
  )
}
