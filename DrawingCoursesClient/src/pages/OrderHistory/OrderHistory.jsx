import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useRecoilValue } from "recoil";
import { accountState } from "../../atom/accountState";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CourseListModal } from "../../components/Modal/CourseListModal";
import { useLoaderData } from "react-router-dom";
import { ToolListModal } from "../../components/Modal/ToolListModal";

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
  { id: "id", label: "Order #", minWidth: 170 },
  { id: "total", label: "Total", minWidth: 100 },
  {
    id: "orderDate",
    label: "Date",
    minWidth: 170,
    align: "right",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "right",
  },
  {
    id: "paymentMethod",
    label: "Payment method",
    minWidth: 170,
    align: "right",
  },
  {
    id: "type",
    label: "type",
    minWidth: 170,
    align: "right",
  },
  {
    id: "view",
    label: "View",
    minWidth: 170,
    align: "right",
  },
];

// export const OrderHistory = () => {
//   const account = useRecoilValue(accountState);
//   const {orderHistory, orderToolHistory} = useLoaderData();
//   const [listCourses, setList] = useState([]);
//   const [listTool, setListTool] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [open, setOpen] = useState(false);
//   const [openTool, setOpenTool] = useState(false);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const handleOpen = () => setOpen(true);
//   const handleOpenTool = () => setOpenTool(true);
//   const handleClose = () => {
//     setOpen(false);
//     setOpenTool(false);
//   };

//   function createData(orderHistory, orderToolHistory) {
//     const orderCol = orderHistory?.map((oh) => {
//       return {
//         id: oh.id,
//         total: oh.total,
//         orderDate: oh.orderDate,
//         status: oh.status,
//         paymentMethod: oh.paymentMethod,
//         type: "Course",
//         view: (
//           <>
//             <a
//               onClick={() => {
//                 setList(oh.courses);
//                 handleOpen();
//               }}
//             >
//               View Detail
//             </a>
//           </>
//         ),
//       };
//     });

//     const orderToolCol = orderToolHistory?.map((oh) => {
//       return {
//         id: oh.id,
//         total: oh.total,
//         orderDate: oh.orderDate,
//         status: oh.status,
//         paymentMethod: oh.paymentMethod,
//         type: "Tool",
//         view: (
//           <>
//             <a
//               onClick={() => {
//                 setListTool(oh.items);
//                 handleOpenTool();
//               }}
//             >
//               View Detail
//             </a>
//           </>
//         ),
//       };
//     });

//     return [...orderCol, ...orderToolCol];
//   }

//   const rows = createData(orderHistory, orderToolHistory);

//   return (
//     <>
//       <div className="py-40 px-20">
//         <Paper sx={{ width: "100%", overflow: "hidden" }}>
//           <TableContainer sx={{ maxHeight: 440 }}>
//             <Table stickyHeader aria-label="sticky table">
//               <TableHead>
//                 <TableRow>
//                   {columns.map((column) => (
//                     <TableCell
//                       key={column.id}
//                       align={column.align}
//                       style={{ minWidth: column.minWidth }}
//                     >
//                       {column.label}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {rows
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((row) => {
//                     return (
//                       <TableRow
//                         hover
//                         role="checkbox"
//                         tabIndex={-1}
//                         key={row.code}
//                       >
//                         {columns.map((column) => {
//                           const value = row[column.id];
//                           return (
//                             <TableCell key={column.id} align={column.align}>
//                               {column.format && typeof value === "number"
//                                 ? column.format(value)
//                                 : value}
//                             </TableCell>
//                           );
//                         })}
//                       </TableRow>
//                     );
//                   })}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[10, 25, 100]}
//             component="div"
//             count={rows.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>
//       </div>

//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <CourseListModal courses={listCourses} />
//         </Box>
//       </Modal>

//       <Modal
//         open={openTool}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <ToolListModal tools={listTool} />
//         </Box>
//       </Modal>
//     </>
//   );
// };

export const OrderHistory = () => {
 return <>
 <div>
  <OrderCourseHistory />
  <OrderToolHistory />
 </div>
 </>
}

 const OrderCourseHistory = () => {
  const {orderHistory, orderToolHistory} = useLoaderData();
  const [listCourses, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  function createData(orderHistory) {
    const orderCol = orderHistory?.map((oh) => {
      return {
        id: oh.id,
        total: oh.total,
        orderDate: oh.orderDate,
        status: oh.status,
        paymentMethod: oh.paymentMethod,
        type: "Course",
        view: (
          <>
            <a
              onClick={() => {
                setList(oh.courses);
                handleOpen();
              }}
            >
              View Detail
            </a>
          </>
        ),
      };
    });

    return orderCol;
  }

  const rows = createData(orderHistory);

  return (
    <>
      <div className="py-40 px-10">
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CourseListModal courses={listCourses} />
        </Box>
      </Modal>
    </>
  );
};

 const OrderToolHistory = () => {
  const {orderHistory, orderToolHistory} = useLoaderData();
  const [listTool, setListTool] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openTool, setOpenTool] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenTool = () => setOpenTool(true);
  const handleClose = () => {
    setOpenTool(false);
  };

  function createData(orderToolHistory) {

    const orderToolCol = orderToolHistory?.map((oh) => {
      return {
        id: oh.id,
        total: oh.total,
        orderDate: oh.orderDate,
        status: oh.status,
        paymentMethod: oh.paymentMethod,
        type: "Tool",
        view: (
          <>
            <a
              onClick={() => {
                setListTool(oh.items);
                handleOpenTool();
              }}
            >
              View Detail
            </a>
          </>
        ),
      };
    });

    return orderToolCol;
  }

  const rows = createData(orderToolHistory);

  return (
    <>
      <div className="pb-40 px-10">
      <div className="text-3xl font-bold mb-3">Order Tools</div>
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

      <Modal
        open={openTool}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ToolListModal tools={listTool} />
        </Box>
      </Modal>
    </>
  );
};
