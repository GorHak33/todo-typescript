import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
} from "@mui/material";
import {
  checkOverdue,
  deleteTodo,
  editTodo,
  markAsComplete,
} from "../../../Redux/todoSlice/todoSlice";
import { Todo } from "../../../types";
import { Formik, Form, Field } from "formik";

const TodoList: React.FC = () => {
  const todos = useSelector((state: any) => state.todo.todos);
  const dispatch = useDispatch();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedTodo, setEditedTodo] = useState({
    id: "",
    title: "",
    description: "",
    deadline: "",
    status: "",
  });

  useEffect(() => {
    dispatch(checkOverdue());
  }, [dispatch]);

  const handleEdit = (todo: Todo) => {
    setEditedTodo({
      id: todo.id || "",
      title: todo.title || "",
      description: todo.description || "",
      deadline: todo.deadline || "",
      status: todo.status || "",
    });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleSaveEdit = () => {
    if (editedTodo) {
      dispatch(editTodo(editedTodo));
      setOpenEditDialog(false);
    }
  };
  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };
  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof Todo
  ) => {
    const fieldValue = e.target.value;

    setEditedTodo(prevTodo => ({
      ...prevTodo,
      [fieldName]: fieldValue,
    }));
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {todos.map((todo: Todo) => (
        <Box key={todo.id} sx={{ width: 300, margin: 2 }}>
          <Card variant="outlined" sx={{ width: 300 }}>
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

              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(todo.id)}
                sx={{ marginTop: 1 }}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleEdit(todo)}
                sx={{ marginTop: 1 }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => dispatch(markAsComplete(todo.id))}
                sx={{ marginTop: 1 }}
              >
                {todo.status === "Pending"
                  ? "Mark Completed"
                  : "Reverse to pending"}
              </Button>
            </CardContent>
          </Card>
        </Box>
      ))}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              title: editedTodo.title,
              description: editedTodo.description,
              deadline: editedTodo.deadline,
              status: editedTodo.status,
            }}
            onSubmit={(values, actions) => {
              setEditedTodo({
                id: editedTodo.id,
                title: values.title,
                description: values.description,
                deadline: values.deadline,
                status: values.status,
              });
              handleSaveEdit();
              actions.resetForm();
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  type="text"
                  id="title"
                  name="title"
                  value={editedTodo.title}
                  placeholder="Title"
                  onChange={(e: any) => handleFieldChange(e, "title")}
                  sx={{ width: "100%" }}
                />
                <Field
                  as={TextField}
                  type="text"
                  id="description"
                  name="description"
                  value={editedTodo.description}
                  placeholder="Title"
                  onChange={(e: any) => handleFieldChange(e, "description")}
                  sx={{ width: "100%" }}
                />
                <Field
                  as={TextField}
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={editedTodo.deadline}
                  placeholder="Title"
                  onChange={(e: any) => handleFieldChange(e, "deadline")}
                  sx={{ width: "100%" }}
                />
                <Button variant="outlined" onClick={handleSaveEdit}>
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TodoList;
