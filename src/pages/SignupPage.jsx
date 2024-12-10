import { useForm } from "react-hook-form";
import { Box, Paper, Typography, FormControl, TextField, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { LoginOutlined } from '@mui/icons-material';
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../modules/user/services/userServices.js";
import { toast } from "react-toastify";

const SignupPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const result = await createUser(data);
      if (result.status === 201) {
        toast.success(result.data.message);
        reset();
        navigate('/login');
      }
      else {
        toast.error(result.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Box>
        <Grid container alignItems="center" justifyContent='center'>
          <Grid size={{ xs: 12, md: 5 }} order={{ md: 1, xs: 2 }}>
            <img src="/signup.png" width='100%' alt="signup" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} order={{ md: 2, xs: 1 }}>
            <Paper sx={{ p: 2 }} className="shadow rounded">
              <Typography variant="h3" className='text-center'>Signup</Typography>
              <hr />
              <form onSubmit={handleSubmit(onSubmit)} >
                <Grid container spacing={4}>
                  <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        id="outlined-required"
                        label="Fullname"
                        placeholder="Enter name"
                        variant="standard"
                        type="text"
                        name="fullname"
                        {...register('fullname')}
                      />
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        placeholder="Enter email"
                        variant="standard"
                        type="text"
                        name="email"
                        {...register('email')}
                      />
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        id="outlined-required"
                        label="Mobile"
                        placeholder="Enter mobile no"
                        variant="standard"
                        type="text"
                        name="mobile"
                        {...register('mobile')}
                      />
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        id="outlined-required"
                        label="Password"
                        placeholder="Set password"
                        variant="standard"
                        type="text"
                        name="password"
                        {...register('password')}
                      />
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Box>
                      <Button type="submit" variant="contained" color="secondary"
                        startIcon={<LoginOutlined />}>
                        Signup
                      </Button>
                    </Box>
                    <hr />
                    <Box className='text-center'>
                      <Typography variant='body2'>
                        Allredy have an account? <Link to="/">Login</Link>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );

}

export default SignupPage;
