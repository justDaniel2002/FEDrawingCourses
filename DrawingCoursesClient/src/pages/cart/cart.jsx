import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  accountState,
  courseCartState,
  toolCartState,
} from "../../atom/accountState";
import { Form, Link, useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { toast } from "react-toastify";
import { setTitem } from "../../utils/localStorageExtension";

const columns = [
  { id: "Title", label: "Title", minWidth: 170 },
  { id: "Description", label: "Description", minWidth: 100 },
  {
    id: "Category",
    label: "Category",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Price",
    label: "Price\u00a0($)",
    minWidth: 170,
    align: "right",
    format: (value) => value + " $",
  },
  {
    id: "Quantity",
    label: "Quantity",
    minWidth: 170,
    align: "right",
  },
];

function createData(toolCart, courseCart) {
  const dbTool = toolCart.map((cart) => {
    const tool = cart.tool;
    return {
      Title: tool.name + " (tool)",
      Description: tool.description,
      Category: tool.category.name,
      Price: tool.price,
      Quantity: cart.quantity,
    };
  });

  const dbCourse = courseCart.map((cart) => {
    const course = cart.course;
    return {
      Title: course.title + " (course)",
      Type: course.description,
      Category: course.category.name,
      Price: course.price,
      Quantity: cart.quantity,
    };
  });
  return [...dbTool, ...dbCourse];
}

function total(db) {
  console.log(db);
  const total = db.reduce(
    (accumulator, currentValue) =>
      accumulator + Number.parseInt(currentValue.Price) * currentValue.Quantity,
    0
  );
  return total;
}

const Cart = () => {
  window.scrollTo(0, 0);
  const account = useRecoilValue(accountState);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [toolCart, setToolCart] = useRecoilState(toolCartState);
  const [courseCart, setCourseCart] = useRecoilState(courseCartState);

  const navigate = useNavigate();

  const rows = createData(toolCart, courseCart);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const postPayment = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const result = await api.postPayment(
      await formData.get(`ammount`),
      account.token
    );
    console.log(result);
    if (result && result.length > 0) {
      setTitem("cartCourse", courseCart);
      setTitem("cartTool", toolCart);
      windowOpen(result)
      setToolCart([]);
      setCourseCart([]);
      toast("check out successfully", { type: toast.TYPE.SUCCESS });
      navigate("/");
    }
  };

  const windowOpen = (url) => {
    const newTabWidth = 600; // Set your desired width
    const newTabHeight = 400; // Set your desired height

    const left = (window.innerWidth - newTabWidth) / 2;
    const top = (window.innerHeight - newTabHeight) / 2;

    const windowFeatures = `width=${newTabWidth},height=${newTabHeight},left=${left},top=${top}`;

    window.open(url, "_blank", windowFeatures);
  };
  return (
    <main className="mb-40">
      <div className="px-40 pb-40">
        <div className="text-3xl font-bold text-center my-20">Cart</div>
        <Link
          to={"/"}
          className="inline-block p-2 bg-black text-white mb-3 rounded-lg hover:text-black hover:bg-white hover:text-lg transition-all"
        >
          Go back to shopping
        </Link>
        {toolCart.length === 0 && courseCart.length === 0 ? (
          <div className="p-5 bg-orange border-t-2">
            you havent order anything
          </div>
        ) : (
          <div className="p-5 bg-orange border-t-2">
            you have {toolCart.length + courseCart.length} in your cart
          </div>
        )}

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

        <Form
          onSubmit={(event) => postPayment(event)}
          method="post"
          className="text-right mt-5 p-5"
        >
          <input hidden value={total(rows)} name="ammount" />
          <div className="font-bold text-2xl">Total: {total(rows)}$</div>
          {toolCart.length < 1 && courseCart.length < 1 ? (
            <button
              disabled
              className="p-2 bg-black text-white mt-3 rounded-lg transition-all"
            >
              Check Out
            </button>
          ) : (
            <button className="p-2 bg-black text-white mt-3 rounded-lg hover:text-black hover:bg-white hover:text-lg transition-all">
              Check Out
            </button>
          )}
        </Form>
      </div>
    </main>
  );
};

export default Cart;
