"use client";

import { useEffect, useState } from "react";
// import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useAppSelector } from "@/hooks/hooks";
import { useGetProfileQuery } from "@/redux/features/auth/authApi";

const AppHeader = () => {
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);

  // Prevent hydration mismatch
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  useGetProfileQuery(undefined, {
    skip: !token,
  });

  // Use fallback until hydration is done
  const displayName = hydrated ? user?.fullName || "No Name" : "No Name";
  const displayRole = hydrated ? user?.role || "" : "";
  const displayImage = hydrated
    ? user?.profileImage || "https://github.com/shadcn.png"
    : "https://github.com/shadcn.png";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-white border-b px-4">
      {/* Left Side */}
      <div className="flex items-center gap-2">
        {/* <SidebarTrigger className="-ml-1" /> */}
        <Separator orientation="vertical" className="h-4" />
        <h1 className="text-lg font-medium text-gray-900">
          Welcome Back, {displayName}
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={displayImage} />
          </Avatar>
          <div className="flex flex-col text-sm">
            <span className="font-semibold text-gray-900">{displayName}</span>
            <span className="font-medium text-gray-900">{displayRole}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
