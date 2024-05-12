"use client";

import TableSpecies from "./components/table";

const DashboardPage = () => {
  return (
    <>
      <div className="bg-[#0026b6] container mx-auto mb-10 py-4">
        <p className="text-[24px] font-semibold text-white">Data Species</p>
      </div>
      <div className="container mx-auto pt-0 py-10">
        <TableSpecies />
      </div>
    </>
  );
};

export default DashboardPage;
