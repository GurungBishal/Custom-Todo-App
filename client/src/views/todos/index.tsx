import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../../apis";
import Spinner from "../../component/Spinner";
import TodosTable from "./table";
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TodoStatus } from "../../store/constants";

const Todos = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [status, setStatus] = useState<TodoStatus>(TodoStatus.none);

  const navigate = useNavigate();

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["listTodos", status],
    queryFn: async () => {
      return fetchTodos({ pageNumber: page, pageSize: rowsPerPage }, status);
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  const onCreateTodoClick = () => {
    navigate("/todos/single");
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStatus(event.target.value as TodoStatus);
  };

  return (
    <>
      <Box mt={5} sx={{ position: "relative" }}>
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          Todo List
        </Typography>

        <TextField
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChange}
          sx={{
            position: "absolute",
            top: 40,
            left: 0,
            right: 1430,
            width: "150px",
            float: "right",
            marginLeft: "auto",
            borderRadius: "20px",
          }}
          select
        >
          <MenuItem value={"none"}>All</MenuItem>
          <MenuItem value={"completed"}>Done</MenuItem>
          <MenuItem value={"pending"}>Upcoming</MenuItem>
        </TextField>

        <Button
          sx={{
            position: "absolute",
            top: 40,
            left: 0,
            right: 340,
            width: "150px",
            float: "right",
            marginLeft: "auto",
            borderRadius: "10px",
          }}
          variant="contained"
          onClick={onCreateTodoClick}
        >
          Create
        </Button>

        <Button
          sx={{
            position: "absolute",
            top: 40,
            left: 0,
            right: 340,
            width: "150px",
            float: "right",
            marginLeft: "auto",
            borderRadius: "10px",
          }}
          variant="contained"
          onClick={onCreateTodoClick}
        >
          Create
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }} mt={10}>
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardContent>
            <TodosTable todos={data?.payload?.todos ?? []} />
            <TablePagination
              rowsPerPageOptions={[5]}
              component="div"
              count={data?.payload.todos?.length ?? 0}
              rowsPerPage={10}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Todos;
