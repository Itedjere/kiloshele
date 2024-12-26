import { useEffect, useState } from "react";
import { FaChartArea, FaChartPie } from "react-icons/fa6";
import { StatsCardProps } from "../../../utitlities/typesUtils";
import { PRODUCT_STATS } from "../../../utitlities/graphql_queries";
import StatisticsSkeleton from "../LoadingSkeletons/StatisticsSkeleton";
import StatisticSlider from "../Statistics/StatisticSlider";
import StatsCard from "../Statistics/StatsCard";
import { useQuery } from "@apollo/client";
import { formatPrice } from "../../../utitlities/utils";
import { IoStatsChartSharp } from "react-icons/io5";
import { PiEmpty } from "react-icons/pi";
import { LiaTemperatureLowSolid } from "react-icons/lia";
import { FaRegMoneyBillAlt } from "react-icons/fa";

export default function ProductStatistics() {
  const [stats, setStats] = useState<StatsCardProps[]>([]);
  const { data, loading } = useQuery(PRODUCT_STATS, {
    fetchPolicy: "cache-and-network",
  });
  useEffect(() => {
    if (data?.productStats) {
      const { productStats, serviceStats } = data.productStats;
      setStats([
        {
          icon: <FaChartArea className="fa-3x text-primary" />,
          statsMessage: "Total Products",
          statsValue: String(productStats.totalProducts),
        },
        {
          icon: <PiEmpty className="fa-3x text-primary" />,
          statsMessage: "Total Out Of Stock",
          statsValue: String(productStats.totalOutOfStock),
        },
        {
          icon: <LiaTemperatureLowSolid className="fa-3x text-primary" />,
          statsMessage: "Total Low Stock",
          statsValue: String(productStats.totalLowStock),
        },
        {
          icon: <FaRegMoneyBillAlt className="fa-3x text-primary" />,
          statsMessage: "Inventory Value",
          statsValue: formatPrice(productStats.totalInventoryValue),
        },
        {
          icon: <IoStatsChartSharp className="fa-3x text-primary" />,
          statsMessage: "Total Services",
          statsValue: String(serviceStats.totalServices),
        },
        {
          icon: <FaRegMoneyBillAlt className="fa-3x text-primary" />,
          statsMessage: "Average Service Price",
          statsValue: formatPrice(serviceStats.averageServicePrice),
        },
        {
          icon: <FaChartPie className="fa-3x text-primary" />,
          statsMessage: "Services With Additional Fees",
          statsValue: String(serviceStats.servicesWithAdditionalFees),
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
