import React from "react";
import { Toaster } from "@/components/ui/sonner";
import LoadingScreen from "@/components/loading-screen";
import PreloadImages from "@/components/preload-images";

const criticalImages = [
  "/hero.webp",
  "/gradient-2.webp",
  "/template.png",
  "/favicon.png",
];

export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LoadingScreen />
      <PreloadImages images={criticalImages} />
      <Toaster position="top-right" />
      {children}
    </>
  );
}
