import { ImCart, ImListNumbered } from "react-icons/im";
import { BsCashStack } from "react-icons/bs";
import StatisticSlider from "../Statistics/StatisticSlider";
import { useQuery } from "@apollo/client";
import { SALES_STATS } from "../../../utitlities/graphql_queries";
import { useEffect, useState } from "react";
import { StatsCardProps } from "../../../utitlities/typesUtils";
import StatisticsSkeleton from "../LoadingSkeletons/StatisticsSkeleton";
import StatsCard from "../Statistics/StatsCard";
import { formatPrice, truncateString } from "../../../utitlities/utils";

export default function SaleStaticstics() {
  const [stats, setStats] = useState<StatsCardProps[]>([]);
  const { data, loading } = useQuery(SALES_STATS, {
    fetchPolicy: "cache-and-network",
  });
  useEffect(() => {
    if (data?.saleStats) {
      const stats = data.saleStats;
      setStats([
        {
          icon: <ImListNumbered className="fa-3x text-primary" />,
          statsMessage: "Total Sales Today",
          statsValue: String(stats.totalSalesToday),
        },
        {
          icon: <ImListNumbered className="fa-3x text-primary" />,
          statsMessage: "Total Sale This Month",
          statsValue: String(stats.totalSalesThisMonth),
        },
        {
          icon: <BsCashStack className="fa-3x text-primary" />,
          statsMessage: "Total Revenue Today",
          statsValue: formatPrice(stats.totalRevenueToday || 0),
        },
        {
          icon: <BsCashStack className="fa-3x text-primary" />,
          statsMessage: "Total Revenue This Month",
          statsValue: formatPrice(stats.totalRevenueThisMonth || 0),
        },
        {
          icon: <BsCashStack className="fa-3x text-primary" />,
          statsMessage: "Total Profit Today",
          statsValue: formatPrice(stats.totalProfitToday || 0),
        },
        {
          icon: <BsCashStack className="fa-3x text-primary" />,
          statsMessage: "Total Profit This Month",
          statsValue: formatPrice(stats.totalProfitThisMonth || 0),
        },
        {
          icon: <ImCart className="fa-3x text-primary" />,
          statsMessage: "Top Selling Product",
          statsValue: truncateString(
            stats.topSellingProducts[0].productName || ""
          ),
        },
        {
          icon: <ImCart className="fa-3x text-primary" />,
          statsMessage: "Low Selling Product",
          statsValue: truncateString(
            stats.lowSellingProducts[0].productName || ""
          ),
        },
        {
          icon: <ImCart className="fa-3x text-primary" />,
          statsMessage: "Most Profitable Product",
          statsValue: truncateString(
            stats.mostProfitableProducts[0].productName || ""
          ),
        },
      ]);
    }
  }, [data]);
  return (
    <>
      {loading ? (
        <StatisticsSkeleton />
      ) : (
        <StatisticSlider>
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              icon={stat.icon}
              statsMessage={stat.statsMessage}
              statsValue={stat.statsValue}
            />
          ))}
        </StatisticSlider>
      )}
    </>
  );
}
