import React from "react";
import { Link } from "react-router-dom";
import { usePagination, useSortBy, useTable } from "react-table";

function EnquiryTable({
  tableRowData,
  tableColumnData,
  redirectPath,
  emptyMessage,
  clone,
  purpose,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,

    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: tableColumnData,
      data: tableRowData,
      initialState: { pageSize: 20 },
    },
    useSortBy,
    usePagination
  );

  if (tableRowData.length === 0) {
    return (
      <div className="flex justify-center text-xl my-5">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 overflow-x-auto flex-wrap">
      <table {...getTableProps()} className="overflow-x-auto">
        <thead className=" bg-black text-white">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className={`flex justify-start py-4 px-2`}>
                    {column.render("Header")}

                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, idx) => {
            prepareRow(row);
            return (
              <tr
                className={`hover:bg-gray-400 ${
                  idx % 2 === 1 ? "bg-gray-300" : ""
                }`}
                {...row.getRowProps()}
              >
                {row.cells.map((cell, index) => {
                  if (index === 0) {
                    return (
                      <td {...cell.getCellProps()}>
                        <Link
                          to={
                            purpose === "tests"
                              ? `${redirectPath}${cell.row.original.id}/info`
                              : purpose === "questionBank"
                              ? `${redirectPath}${cell.row.original.id}`
                              : purpose === "testReports"
                              ? `${redirectPath}${cell.row.original.id}`
                              : `${redirectPath}${cell.row.original.id}/info`
                          }
                        >
                          <p className="text-md font-medium hover:text-blue py-5 w-72 px-3 hover:underline">
                            {cell.render("Cell")}
                          </p>
                        </Link>
                      </td>
                    );
                  } else if (index === 3 && purpose === "challenges") {
                    return (
                      <td {...cell.getCellProps()}>
                        <a
                          href={cell.row.original.link}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 hover:text-blue hover:underline truncate"
                        >
                          {cell.render("Cell")}
                        </a>
                      </td>
                    );
                  } else if (index === 6 && purpose === "tests") {
                    return (
                      <td {...cell.getCellProps()}>
                        <div
                          className="w-1/3 px-2"
                          onClick={() => clone(cell.row.original.id)}
                        >
                          {cell.render("Cell")}
                        </div>
                      </td>
                    );
                  } else {
                    return (
                      <td {...cell.getCellProps()}>
                        <p className="px-3">{cell.render("Cell")}</p>
                      </td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-end gap-2 items-center">
        <button
          className="p-2 text-lg border rounded-md"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>{" "}
        <button
          className="p-2 text-lg border rounded-md"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </button>{" "}
        <button
          className="p-2 text-lg border rounded-md"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </button>{" "}
        <button
          className="p-2 text-lg border rounded-md"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50, 100, 150].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default EnquiryTable;
