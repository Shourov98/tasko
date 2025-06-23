import DashboardBanner from "./DashboardBanner";
import DefaultBanner   from "./DefaultBanner";

export default function TopBanner({ variant = "default" }) {
  return variant === "dashboard" ? <DashboardBanner /> : <DefaultBanner />;
}
