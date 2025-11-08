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
      name: "Ohboy",
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
      title: "Orders",
      url: "/dashboard/orders",
      icon: ListOrderedIcon,
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: Users2,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: Building,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="relative bg-white" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
