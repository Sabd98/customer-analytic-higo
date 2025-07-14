"use client";
import { useCallback, useState } from "react";
import useSWR from "swr";
import SummaryCharts from "@/components/dashboard/SummaryCharts";
import CustomerTable from "@/components/dashboard/CustomerTable";
import StatCard from "@/components/dashboard/StatCard";
import { Users, Smartphone, MapPin, Lightbulb } from "lucide-react";
import { fetchSummary, fetchCustomers } from "@/lib/api";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

//Home Page Component Content

export default function Home() {
  //Fetching parameters for the customer table
  const [tableParams, setTableParams] = useState({
    page: 1,
    pageSize: 20,
    sort: "number",
    order: "asc",
  });

  // Fetch summary data
  const {
    data: summaryData,
    error: summaryError,
    isLoadingSummary,
  } = useSWR("/api/summary", fetchSummary, { revalidateOnFocus: false });

  // Fetch customers data
  const {
    data: customersData,
    error: customersError,
    isLoading,
  } = useSWR(["/api/customers", tableParams], () =>
    fetchCustomers(
      tableParams.page,
      tableParams.pageSize,
      tableParams.sort,
      tableParams.order
    )
  );

  //Page and sorting handlers
  const handlePageChange = useCallback(
    (newPage) => {
      setTableParams((prev) => ({ ...prev, page: newPage }));
    },
    [setTableParams]
  );

  const handleSortChange = useCallback(
    (e) => {
      setTableParams((prev) => ({ ...prev, sort: e.target.value }));
    },
    [setTableParams]
  );

  const handleOrderChange = useCallback(
    (e) => {
      setTableParams((prev) => ({ ...prev, order: e.target.value }));
    },
    [setTableParams]
  );

  //Error handling for data fetching
  if (summaryError || customersError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="space-y-3">
      <h1 className="font-bold text-2xl">Customer Analytics Dashboard</h1>
      {/* Summary Datas*/}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Customers"
          value={customersData?.totalItems || 0}
          icon={<Users size={24} />}
          color="bg-blue-500"
          isLoading={isLoadingSummary}
        />
        <StatCard
          title="Brands"
          value={summaryData?.brands?.length || 0}
          icon={<Smartphone size={24} />}
          color="bg-green-500"
          isLoading={isLoadingSummary}
        />
        <StatCard
          title="Location Types"
          value={summaryData?.locations?.length || 0}
          icon={<MapPin size={24} />}
          color="bg-purple-500"
          isLoading={isLoadingSummary}
        />
        <StatCard
          title="Interest Types"
          value={summaryData?.interests?.length || 0}
          icon={<Lightbulb size={24} />}
          color="bg-yellow-500"
          isLoading={isLoadingSummary}
        />
      </section>

      {/* Sumary Charts*/}
      {summaryData && <SummaryCharts data={summaryData} />}

      {/* Table data*/}
      <section className="bg-purple-200 rounded-lg shadow p-6">
        <article className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Customer Data</h2>
          <nav className="flex gap-x-6">
            <FormControl
              variant="outlined"
              size="small"
              className="min-w-[200px]"
            >
              <InputLabel>Sort By</InputLabel>
              <Select
                value={tableParams.sort}
                onChange={handleSortChange}
                label="Sort By"
              >
                <MenuItem value="Number">ID</MenuItem>
                <MenuItem value="Name">Name</MenuItem>
                <MenuItem value="Age">Age</MenuItem>
                <MenuItem value="Date">Date</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              variant="outlined"
              size="small"
              className="min-w-[100px]"
            >
              <InputLabel>Order</InputLabel>
              <Select
                value={tableParams.order}
                onChange={handleOrderChange}
                label="Order"
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
          </nav>
        </article>

        <CustomerTable
          data={customersData}
          isLoading={isLoading}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
}
