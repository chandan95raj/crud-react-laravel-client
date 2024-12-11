/* eslint-disable react/no-unescaped-entities */
import { Box, Paper, Typography, FormControl, TextField, Button, InputLabel, InputAdornment, IconButton, Input } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { LoginOutlined } from '@mui/icons-material';
import { Link } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../config";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // Function to handle login
  const loginUser = async (data) => {
    try {
      const response = await axios.post(`${baseURL}/api/login`, {
        email: data.email,
        password: data.password,
      });

      if (response && response.data.token) {
        const token = response.data.token.accessToken || response.data.token;
        localStorage.setItem('auth_token', token);
        toast.success(response.data.message);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.response ? error.response.data.message : "Something went wrong!");
      }
    }
  };


  const onSubmit = (data) => {
    loginUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Grid container alignItems="center" justifyContent="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2 }} className="shadow rounded">
              <Typography variant="h3" className="text-center">Login</Typography>
              <hr />
              <Grid container spacing={4}>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                          message: "Please enter a valid email",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Email"
                          placeholder="Enter email"
                          variant="standard"
                          error={!!errors.email}
                          helperText={errors.email?.message}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel htmlFor="outlined-required">Password *</InputLabel>
                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: "Password is required",
                        message: "Please enter a valid password",
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Enter password"
                          type={showPassword ? "text" : "password"}
                          error={!!errors.password}
                          helperText={errors.password?.message}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label={
                                  showPassword ? "hide the password" : "display the password"
                                }
                                onClick={() => setShowPassword((show) => !show)}
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Box>
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      startIcon={<LoginOutlined />}
                    >
                      Login
                    </Button>
                  </Box>
                  <hr />
                  <Box className="text-center">
                    <Typography variant="body2">
                      Don't have an account? <Link to="/signup">Signup</Link>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <img src="/login.png" width="100%" alt="login" />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default LoginPage;
