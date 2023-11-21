import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const columns = [
  { id: "nameBought", label: "Buyer #", minWidth: 170 },
  { id: "courseTitle", label: "Course", minWidth: 100 },
  //   {
  //     id: "orderDate",
  //     label: "Date",
  //     minWidth: 170,
  //     align: "right",
  //   },
  //   {
  //     id: "status",
  //     label: "Status",
  //     minWidth: 170,
  //     align: "right",
  //   },
  //   {
  //     id: "paymentMethod",
  //     label: "Payment method",
  //     minWidth: 170,
  //     align: "right",
  //   },
  //   {
  //     id: "type",
  //     label: "type",
  //     minWidth: 170,
  //     align: "right",
  //   },
  //   {
  //     id: "view",
  //     label: "View",
  //     minWidth: 170,
  //     align: "right",
  //   },
];

export const MentorOrderHistory = () => {
  return (
    <>
      <div>
        <OrderCourseHistory />
      </div>
    </>
  );
};

const OrderCourseHistory = () => {
  const orderHistory = useLoaderData();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function createData(orderHistory) {
    const orderCol = orderHistory?.map((oh) => {
      return {
        nameBought: oh.nameBought,
        courseTitle: oh.courseTitle,
        // orderDate: oh.orderDate,
        // status: oh.status,
        // paymentMethod: oh.paymentMethod,
        // type: "Course",
        // view: (
        //   <>
        //     <a
        //       onClick={() => {
        //         setList(oh.courses);
        //         handleOpen();
        //       }}
        //     >
        //       View Detail
        //     </a>
        //   </>
        // ),
      };
    });

    return orderCol;
  }

  const rows = createData(orderHistory);

  return (
    <>
      <div>
        <div className="text-3xl font-bold mb-3">Order Courses</div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
};
