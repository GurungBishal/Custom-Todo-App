import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Stack,
  Button,
} from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { headCells } from "../constants";
import { ITodo } from "../../../types";
import { formatDate } from "../../../utils";
import AlertDialog from "../../../component/dialog";
import { deleteTodo } from "../../../apis";
import CustomSnackBar from "../../../component/Snackbar";

interface ITodosTable {
  todos: ITodo[];
}

const TodosTable = ({ todos }: ITodosTable) => {
  const [openDialog, setOpenDialog] = useState(false);

  const queryClient = useQueryClient();

  const [snackBarProps, setSnackBarProps] = useState({
    status: 200,
    message: "",
    open: false,
  });

  const handleSnackBarProps = (
    key: string,
    value: number | string | boolean
  ) => {
    setSnackBarProps((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleMultipleProps = (status = 200, message = "", open = false) => {
    setSnackBarProps((prevState) => ({
      ...prevState,
      message,
      status,
      open,
    }));
  };

  const [todoId, setTodoId] = useState("");

  const handleTodoId = (todoId: string) => {
    setTodoId(todoId);
  };

  const deleteTodoMutation = useMutation({
    mutationFn: (todoId: string) => {
      return deleteTodo(todoId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listTodos"] });
    },
  });

  const handleDeleteTodo = async () => {
    deleteTodoMutation
      .mutateAsync(todoId)
      .then((data) => {
        handleMultipleProps(200, data.message, true);
        handleTodoId("");
      })
      .catch((err) => {
        handleTodoId("");
        handleMultipleProps(400, err.message, true);
      });
  };

  const handleAlertDialogOpen = (openDialog = true) => {
    setOpenDialog(openDialog);
  };

  const navigate = useNavigate();

  const handleViewClick = (id: string) => {
    navigate(`/todos/${id}`);
  };

  const onDeleteButtonClick = (id: string) => {
    handleAlertDialogOpen();
    handleTodoId(id);
  };

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: "1200px" }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => {
                return (
                  <TableCell
                    key={headCell.id}
                    align={headCell.align}
                    padding={headCell.disablePadding ? "none" : "normal"}
                  >
                    {headCell.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo._id}>
                <TableCell align="left">{todo.name}</TableCell>
                <TableCell align="left">{todo.description}</TableCell>
                <TableCell align="left">{formatDate(todo.date)}</TableCell>
                <TableCell align="left">{todo.time}</TableCell>
                <TableCell align="left">{todo.status}</TableCell>

                <TableCell align="center">
                  <Stack direction={"row"} gap={2}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      sx={{
                        borderRadius: "8px",
                        padding: "11px",
                        minWidth: "auto",
                        color: "#000",
                        border: "1px solid #000",
                      }}
                      onClick={() => {
                        handleViewClick(todo._id);
                      }}
                    >
                      <RemoveRedEyeOutlinedIcon
                        sx={{ color: "secondary", fontSize: "1rem" }}
                      />
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      sx={{
                        borderRadius: "8px",
                        padding: "11px",
                        minWidth: "auto",
                        border: "1px solid #000",
                      }}
                      onClick={() => onDeleteButtonClick(todo._id)}
                    >
                      <DeleteIcon sx={{ color: "#000", fontSize: "1rem" }} />
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AlertDialog
        {...{
          open: openDialog,
          title: "Delete Todo",
        }}
        description="Are you sure you want to do this ?"
        handleAlertDialogClose={() => handleAlertDialogOpen(false)}
        handleMutation={() => {
          handleDeleteTodo();
        }}
      />

      <CustomSnackBar
        handleClose={() => handleSnackBarProps("open", false)}
        message={snackBarProps.message}
        open={snackBarProps.open}
        status={snackBarProps.status}
      />
    </>
  );
};

export default TodosTable;
