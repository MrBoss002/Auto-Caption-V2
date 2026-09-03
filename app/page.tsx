import type { Metadata } from "next";
import DashboardClient from "./dashboard-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard · MrBoss Auto-Caption",
  description: "Real-time statistics and channel management overview.",
};

export default function HomePage() {
  return <DashboardClient />;
}
