"use client";

import type * as React from "react";
import {
  LayoutDashboard,
  ListOrderedIcon,
  Building,
  Users2,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "John Doe",
    email: "Admin",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Kvarow",
      logo: () => <span className="font-bold">Bddddddd</span>,
      plan: "eccoommerce",
    },
  ],

  navMain: [
    {
      title: "Dashboards",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Transaction",
      url: "/dashboard/transaction",
      icon: ListOrderedIcon,
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: Users2,
    },
    {
      title: "Skills",
      url: "/dashboard/skills",
      icon: Building,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <div>
      <Sidebar collapsible="icon" className="relative !bg-[#1f1e1e]" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </div>
  );
}
