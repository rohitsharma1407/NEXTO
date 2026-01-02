"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import LiveBar from "./LiveBar";
import Stories from "../stories/Stories";

export default function GlobalTopBars() {
  const pathname = usePathname();

  // Hide LiveBar and Stories on any profile page (/profile...)
  const isProfile = pathname?.startsWith("/profile");

  return (
    <>
      <Header />
      {!isProfile && <LiveBar />}
      {!isProfile && <Stories />}
    </>
  );
}
