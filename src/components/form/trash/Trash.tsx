import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { Todo } from "../../../types";
import { useNavigate } from "react-router-dom";

const Trash = () => {
  const deletedTodos = useSelector((state: any) => state.todo.deletedTodos);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "20px",
      }}
    >
      <Typography variant="h3" component="h1">
        Trash
      </Typography>
      <Button variant="contained" onClick={handleClick}>
        Back to Existing Tasks
      </Button>
      <Grid
        container
        justifyContent="center"
        spacing={2}
        sx={{ width: "100%", marginTop: "20px" }}
      >
        {deletedTodos.map((todo: Todo) => (
          <Grid item key={todo.id} xs={12} sm={6} md={4} lg={3}>
            <Card variant="outlined" sx={{ width: "100%" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Title: {todo?.title}
                </Typography>
                <Typography variant="body1">
                  Description: {todo?.description}
                </Typography>
                <Typography variant="body2">
                  Deadline: {todo?.deadline}
                </Typography>
                <Typography variant="body2">Status: {todo?.status}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Trash;
