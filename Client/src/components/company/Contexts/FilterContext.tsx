import { createContext, ReactNode, useContext, useState } from "react";
import {
  FilterContextValuesTypes,
  filterValueType,
  PrimaryFilter,
} from "../../../utitlities/typesUtils";

const primaryFilterValues: PrimaryFilter = {
  dateRange: {
    endDate: "",
    startDate: "",
  },
  saleRange: {
    maximumAmount: "",
    minimumAmount: "",
  },
  paymentMethod: "",
  paymentStatus: "",
  staffAssigned: "",
};

interface FilterContextValues {
  filters: FilterContextValuesTypes;
  handleSetSaleFilter: (filterValue: filterValueType) => void;
  handleSetExpenseFilter: (filterValue: filterValueType) => void;
  handleSetProductFilter: (filterValue: filterValueType) => void;
  resetFilters: () => void;
}

export const FilterContext = createContext<FilterContextValues | null>(null);

export const useFilterContext = (): FilterContextValues => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error(
      "useFiltercontext must be used within FilterContextProvider"
    );
  }
  return context;
};

export default function FilterContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [filters, setFilters] = useState<FilterContextValuesTypes>({
    saleFilter: primaryFilterValues,
    expenseFilter: primaryFilterValues,
    productFilter: primaryFilterValues,
  });

  const handleSetSaleFilter = (filterValue: filterValueType) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      saleFilter: {
        ...prevFilters.saleFilter,
        ...filterValue,
      },
    }));
  };

  const handleSetExpenseFilter = (filterValue: filterValueType) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      expenseFilter: {
        ...prevFilters.expenseFilter,
        ...filterValue,
      },
    }));
  };

  const handleSetProductFilter = (filterValue: filterValueType) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      productFilter: {
        ...prevFilters.productFilter,
        ...filterValue,
      },
    }));
  };

  const resetFilters = () => {
    setFilters({
      saleFilter: primaryFilterValues,
      expenseFilter: primaryFilterValues,
      productFilter: primaryFilterValues,
    });
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        handleSetExpenseFilter,
        handleSetProductFilter,
        handleSetSaleFilter,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
