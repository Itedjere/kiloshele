import {
  FaChartArea,
  FaChartBar,
  FaChartLine,
  FaChartPie,
} from "react-icons/fa6";
import StatisticSlider from "../Statistics/StatisticSlider";
import StatisticsSkeleton from "../LoadingSkeletons/StatisticsSkeleton";
import StatsCard from "../Statistics/StatsCard";
import { useEffect, useState } from "react";
import { StatsCardProps } from "../../../utitlities/typesUtils";
import { useQuery } from "@apollo/client";
import { EXPENSES_STATS } from "../../../utitlities/graphql_queries";
import { formatPrice } from "../../../utitlities/utils";
import { IoIosStats } from "react-icons/io";

export default function ExpenseStatistics() {
  const [stats, setStats] = useState<StatsCardProps[]>([]);

  const { data, loading } = useQuery(EXPENSES_STATS, {
    fetchPolicy: "cache-and-network",
  });
  useEffect(() => {
    if (data?.expenseStats) {
      const statistics = data.expenseStats;
      setStats([
        {
          icon: <FaChartLine className="fa-3x text-primary" />,
          statsMessage: "Today's Expenses",
          statsValue: formatPrice(statistics.todayExpenses),
        },
        {
          icon: <FaChartBar className="fa-3x text-primary" />,
          statsMessage: "This Month Expenses",
          statsValue: formatPrice(statistics.monthExpenses),
        },
        {
          icon: <FaChartArea className="fa-3x text-primary" />,
          statsMessage: "This Year Expenses",
          statsValue: formatPrice(statistics.yearExpenses),
        },
        {
          icon: <IoIosStats className="fa-3x text-primary" />,
          statsMessage: "Last Year Expenses",
          statsValue: formatPrice(statistics.lastYearExpenses),
        },
        {
          icon: <FaChartPie className="fa-3x text-primary" />,
          statsMessage: `Most Paid Expenses: ${statistics.highestExpenseCategory}`,
          statsValue: formatPrice(statistics.highestExpenseAmount),
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
