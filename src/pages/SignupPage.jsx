/* eslint-disable no-prototype-builtins */
import { Box, Paper, Typography, FormControl, TextField, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { LoginOutlined } from '@mui/icons-material';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseURL } from "../config";

const SignupPage = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const registerUser = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("password", data.password);

    try {
      const response = await axios.post(`${baseURL}/api/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const validationErrors = error.response.data.errors;
        for (const field in validationErrors) {
          if (validationErrors.hasOwnProperty(field)) {
            toast.error(validationErrors[field].join(' '));
          }
        }
      } else {
        toast.error(error.response ? error.response.data.message : "Something went wrong!");
      }
    }
  };


  const onSubmit = (data) => {
    registerUser(data);
  };

  return (
    <Box>
      <Grid container alignItems="center" justifyContent="center">
        <Grid size={{ xs: 12, md: 5 }} order={{ md: 1, xs: 2 }}>
          <img src="/signup.png" width="100%" alt="signup" />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} order={{ md: 2, xs: 1 }}>
          <Paper sx={{ p: 2 }} className="shadow rounded">
            <Typography variant="h3" className="text-center">Signup</Typography>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={4}>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <TextField
                      {...register("name", { required: "Name is required!" })}
                      label="Fullname"
                      placeholder="Enter name"
                      variant="standard"
                      error={!!errors.name}
                      helperText={errors?.name?.message}
                    />
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <TextField
                      {...register("email", {
                        required: "Email is required!",
                        pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" }
                      })}
                      label="Email"
                      placeholder="Enter email"
                      variant="standard"
                      error={!!errors.email}
                      helperText={errors?.email?.message}
                    />
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <TextField
                      {...register("mobile", {
                        required: "Mobile is required!",
                        pattern: { value: /^[0-9]{10}$/, message: "Mobile number must be 10 digits" }
                      })}
                      label="Mobile"
                      placeholder="Enter mobile no"
                      variant="standard"
                      error={!!errors.mobile}
                      helperText={errors?.mobile?.message}
                    />
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <TextField
                      {...register("password", {
                        required: "Password is required!",
                        minLength: { value: 8, message: "Password must be at least 8 characters" }
                      })}
                      label="Password"
                      placeholder="Set password"
                      variant="standard"
                      error={!!errors.password}
                      helperText={errors?.password?.message}
                      type="password"
                    />
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }} >
                  <Box>
                    <Button type="submit" variant="contained" color="secondary" startIcon={<LoginOutlined />}>
                      Signup
                    </Button>
                  </Box>
                  <hr />
                  <Box className="text-center">
                    <Typography variant="body2">
                      Already have an account? <Link to="/">Login</Link>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignupPage;
