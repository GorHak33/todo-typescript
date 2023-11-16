import React, { useEffect } from "react";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { addTodo, checkOverdue } from "../../Redux/todoSlice/todoSlice";
import * as Yup from "yup";
import idGenerator from "../../helpers/idGenerator";
import { Button, Typography, Grid, TextField, Box } from "@mui/material";
import { TodoFormValues } from "../../types";
import { useNavigate } from "react-router-dom";

function TodoForm() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (
    values: TodoFormValues,
    actions: FormikHelpers<TodoFormValues>
  ) => {
    if (values.title.trim() === "") {
      return;
    }

    dispatch(
      addTodo({
        ...values,
        id: idGenerator(),
      })
    );
    actions.resetForm();
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    deadline: Yup.date()
      .required("Deadline is required")
      .min(new Date(), "Deadline must be in the future"),
  });
  const handleClick = () => {
    navigate("/trash");
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Box sx={{ position: "absolute", top: 0, right: 0, padding: "10px" }}>
        <Button variant="contained" onClick={handleClick}>
          See Deleted Todos
        </Button>
      </Box>
      <Grid item>
        <Typography variant="h1" gutterBottom>
          Todo List
        </Typography>
        <Formik<TodoFormValues>
          initialValues={{
            id: "",
            title: "",
            description: "",
            deadline: "",
            status: "Pending",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form style={{ display: "flex", flexDirection: "column" }}>
              <Box mb={2}>
                <Field
                  as={TextField}
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  error={errors.title && touched.title}
                  helperText={errors.title && touched.title && errors.title}
                  sx={{ width: "100%" }}
                />
              </Box>
              <Box mb={2}>
                <Field
                  as={TextField}
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Description"
                  error={errors.description && touched.description}
                  helperText={
                    errors.description &&
                    touched.description &&
                    errors.description
                  }
                  sx={{ width: "100%" }}
                />
              </Box>
              <Box mb={2}>
                <Field
                  as={TextField}
                  type="date"
                  id="deadline"
                  name="deadline"
                  error={errors.deadline && touched.deadline}
                  helperText={
                    errors.deadline && touched.deadline && errors.deadline
                  }
                  placeholder="Deadline"
                  sx={{ width: "100%" }}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: 10 }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
}

export default TodoForm;
