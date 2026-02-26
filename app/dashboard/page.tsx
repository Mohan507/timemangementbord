// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/lib/auth";
// import { redirect } from "next/navigation";

// type Timesheet = {
//   week: number;
//   dateRange: string;
//   status: "COMPLETED" | "INCOMPLETE" | "MISSING";
//   action: string;
// };

// const timesheets: Timesheet[] = Array.from({ length: 100 }, (_, i) => {
//   const weekNumber = i + 1;
//   const statuses: Timesheet["status"][] = ["COMPLETED", "INCOMPLETE", "MISSING"];
//   const status = statuses[i % 3];
//   const startDate = new Date(2024, 0, 1 + i * 7);
//   const endDate = new Date(startDate);
//   endDate.setDate(startDate.getDate() + 4);
//   const formatDate = (date: Date) =>
//     date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
//   return {
//     week: weekNumber,
//     dateRange: `${formatDate(startDate)} - ${formatDate(endDate)}`,
//     status,
//     action: status === "COMPLETED" ? "View" : status === "INCOMPLETE" ? "Update" : "Create",
//   };
// });

// export default function DashboardPage() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(5);

//   const totalPages = Math.ceil(timesheets.length / pageSize);
//   const paginatedTimesheets = timesheets.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   // Client-side session check
//   useEffect(() => {
//     getServerSession(authOptions).then((session) => {
//       if (!session) redirect("/login");
//     });
//   }, []);

// function getStatusColor(status: string) {
//   switch (status) {
//     case "COMPLETED":
//       return "bg-emerald-100 text-emerald-700";
//     case "INCOMPLETE":
//       return "bg-amber-100 text-amber-700";
//     case "MISSING":
//       return "bg-rose-100 text-rose-700";
//     default:
//       return "";
//   }
// }

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       {/* Navbar */}
//       <header className="bg-white border-b border-gray-200">
//         <div className="w-full px-6 lg:px-12 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-6">
//             <h1 className="text-lg font-semibold text-gray-800">ticktock</h1>
//             <span className="hidden sm:block text-sm text-gray-500">Timesheets</span>
//           </div>
//           <div className="text-sm text-gray-600">John Doe ▾</div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-1 p-4 sm:p-6 lg:p-8">
//         <div className="max-w-6xl mx-auto">
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
//               Your Timesheets
//             </h2>

//             {/* Filters */}
//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
//               <select className="w-full sm:w-auto px-3 py-2 text-sm border border-gray-300 rounded-md bg-white">
//                 <option>Date Range</option>
//                 <option>January 2024</option>
//                 <option>February 2024</option>
//               </select>

//               <select className="w-full sm:w-auto px-3 py-2 text-sm border border-gray-300 rounded-md bg-white">
//                 <option>Status</option>
//                 <option>COMPLETED</option>
//                 <option>INCOMPLETE</option>
//                 <option>MISSING</option>
//               </select>
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto rounded-lg border border-gray-200">
//               <table className="min-w-full text-sm text-left">
//                 <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
//                   <tr>
//                     <th className="px-4 sm:px-6 py-3">Week #</th>
//                     <th className="px-4 sm:px-6 py-3">Date</th>
//                     <th className="px-4 sm:px-6 py-3">Status</th>
//                     <th className="px-4 sm:px-6 py-3">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-gray-200">
//                   {paginatedTimesheets.map((ts) => (
//                     <tr key={ts.week} className="hover:bg-gray-50 transition">
//                       <td className="px-4 sm:px-6 py-4">{ts.week}</td>
//                       <td className="px-4 sm:px-6 py-4 text-gray-600">{ts.dateRange}</td>
//                       <td className="px-4 sm:px-6 py-4">
//                         <span
//                           className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
//                             ts.status
//                           )}`}
//                         >
//                           {ts.status}
//                         </span>
//                       </td>
//                       <td className="px-4 sm:px-6 py-4">
//                         {ts.action === "View" ? (
//                           <Link
//                             href="/dashboard/week"
//                             className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
//                           >
//                             {ts.action}
//                           </Link>
//                         ) : (
//                           <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
//                             {ts.action}
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 text-sm text-gray-600">
//               <div className="flex items-center gap-4">
//                 <select
//                   value={pageSize}
//                   onChange={(e) => {
//                     setPageSize(Number(e.target.value));
//                     setCurrentPage(1); // reset page
//                   }}
//                   className="border border-gray-300 rounded-md px-2 py-1"
//                 >
//                   <option value={5}>5 per page</option>
//                   <option value={10}>10 per page</option>
//                   <option value={20}>20 per page</option>
//                 </select>
//               </div>

//               <div className="flex flex-wrap items-center gap-2">
//                 <button
//                   onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                   className="px-3 py-1 border rounded-md hover:bg-gray-50"
//                 >
//                   Previous
//                 </button>

//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => {
//                   if (num === 1 || num === totalPages || (num >= currentPage - 1 && num <= currentPage + 1)) {
//                     return (
//                       <button
//                         key={num}
//                         onClick={() => setCurrentPage(num)}
//                         className={`px-3 py-1 border rounded-md hover:bg-gray-50 ${
//                           currentPage === num ? "bg-indigo-600 text-white" : ""
//                         }`}
//                       >
//                         {num}
//                       </button>
//                     );
//                   } else if (
//                     num === currentPage - 2 ||
//                     num === currentPage + 2
//                   ) {
//                     return <span key={num} className="px-2 text-gray-400">...</span>;
//                   } else {
//                     return null;
//                   }
//                 })}

//                 <button
//                   onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//                   className="px-3 py-1 border rounded-md hover:bg-gray-50"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="mt-8">
//             <div className="bg-white border border-gray-200 rounded-lg shadow-sm py-5 text-center">
//               <p className="text-xs text-gray-400">
//                 © 2024 tentwenty. All rights reserved.
//               </p>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";

type Timesheet = {
  week: number;
  dateRange: string;
  status: "COMPLETED" | "INCOMPLETE" | "MISSING";
  action: string;
};

// Generate 100 dummy timesheets
const timesheets: Timesheet[] = Array.from({ length: 100 }, (_, i) => {
  const weekNumber = i + 1;
  const statuses: Timesheet["status"][] = [
    "COMPLETED",
    "INCOMPLETE",
    "MISSING",
  ];
  const status = statuses[i % 3];

  const startDate = new Date(2024, 0, 1 + i * 7);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 4);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return {
    week: weekNumber,
    dateRange: `${formatDate(startDate)} - ${formatDate(endDate)}`,
    status,
    action:
      status === "COMPLETED"
        ? "View"
        : status === "INCOMPLETE"
          ? "Update"
          : "Create",
  };
});

export default function DashboardPage() {
  const [dateFilter, setDateFilter] = useState<
    "ALL" | "January 2024" | "February 2024"
  >("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [statusFilter, setStatusFilter] = useState<"ALL" | Timesheet["status"]>(
    "ALL",
  );

  // Client-side session check
  // useEffect(() => {
  //   getServerSession(authOptions).then((session) => {
  //     if (!session) redirect("/login");
  //   });
  // }, []);

  // Filter timesheets by status
  const filteredTimesheets = timesheets.filter((t) => {
    const statusMatch = statusFilter === "ALL" || t.status === statusFilter;
    const dateMatch =
      dateFilter === "ALL" ||
      (dateFilter === "January 2024" && t.dateRange.includes("January")) ||
      (dateFilter === "February 2024" && t.dateRange.includes("February"));
    return statusMatch && dateMatch;
  });

  const totalPages = Math.ceil(filteredTimesheets.length / pageSize);
  const paginatedTimesheets = filteredTimesheets.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  function getStatusColor(status: string) {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-700";
      case "INCOMPLETE":
        return "bg-amber-100 text-amber-700";
      case "MISSING":
        return "bg-rose-100 text-rose-700";
      default:
        return "";
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200">
        <div className="w-full px-6 lg:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-semibold text-gray-800">ticktock</h1>
            <span className="hidden sm:block text-sm text-gray-500">
              Timesheets
            </span>
          </div>
          <div className="text-sm text-gray-600">John Doe ▾</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
              Your Timesheets
            </h2>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
              <select
                className="w-full sm:w-auto px-3 py-2 text-sm border border-gray-300 rounded-md bg-white"
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value as any);
                  setCurrentPage(1); // reset page when filter changes
                }}
              >
                <option value="ALL">All Dates</option>
                <option value="January 2024">January 2024</option>
                <option value="February 2024">February 2024</option>
              </select>

              <select
                className="w-full sm:w-auto px-3 py-2 text-sm border border-gray-300 rounded-md bg-white"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as any);
                  setCurrentPage(1); // reset page when filter changes
                }}
              >
                <option value="ALL">All Status</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="INCOMPLETE">INCOMPLETE</option>
                <option value="MISSING">MISSING</option>
              </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full text-sm text-left border-collapse">
                {/* Table Head */}
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider block">
                  <tr className="grid grid-cols-4">
                    <th className="px-4 sm:px-6 py-3">Week #</th>
                    <th className="px-4 sm:px-6 py-3">Date</th>
                    <th className="px-4 sm:px-6 py-3">Status</th>
                    <th className="px-4 sm:px-6 py-3">Actions</th>
                  </tr>
                </thead>

                {/* Scrollable Body */}
                <tbody className="divide-y divide-gray-200 block max-h-96 overflow-y-auto">
                  {paginatedTimesheets.map((ts) => (
                    <tr
                      key={ts.week}
                      className="hover:bg-gray-50 transition grid grid-cols-4"
                    >
                      <td className="px-4 sm:px-6 py-4">{ts.week}</td>
                      <td className="px-4 sm:px-6 py-4 text-gray-600">
                        {ts.dateRange}
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            ts.status,
                          )}`}
                        >
                          {ts.status}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        {["View", "Update", "Create"].includes(ts.action) ? (
                          <Link
                            href="/dashboard/week"
                            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                          >
                            {ts.action}
                          </Link>
                        ) : (
                          <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                            {ts.action}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 text-sm text-gray-600">
              <div className="flex items-center gap-4">
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 rounded-md px-2 py-1"
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                </select>
              </div>

              {/* Scrollable Pagination */}
              <div className="flex overflow-x-auto items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="px-3 py-1 border rounded-md hover:bg-gray-50"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (num) => {
                    if (
                      num === 1 ||
                      num === totalPages ||
                      (num >= currentPage - 1 && num <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={num}
                          onClick={() => setCurrentPage(num)}
                          className={`px-3 py-1 border rounded-md hover:bg-gray-50 ${
                            currentPage === num
                              ? "bg-indigo-600 text-white"
                              : ""
                          }`}
                        >
                          {num}
                        </button>
                      );
                    } else if (
                      num === currentPage - 2 ||
                      num === currentPage + 2
                    ) {
                      return (
                        <span key={num} className="px-2 text-gray-400">
                          ...
                        </span>
                      );
                    } else {
                      return null;
                    }
                  },
                )}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  className="px-3 py-1 border rounded-md hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm py-5 text-center">
              <p className="text-xs text-gray-400">
                © 2024 tentwenty. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
