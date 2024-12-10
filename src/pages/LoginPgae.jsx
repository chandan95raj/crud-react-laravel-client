/* eslint-disable react/no-unescaped-entities */
import { Box, Paper, Typography, FormControl, TextField, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { LoginOutlined } from '@mui/icons-material';
import { Link } from "react-router-dom";

const LoginPage = () => {

  return (
    <>
      <Box>
        <Grid container alignItems="center" justifyContent='center'>         
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2 }} className="shadow rounded" >
              <Typography variant="h3" className='text-center'>Login</Typography>
              <hr />
              <Grid container spacing={4}>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <TextField
                      required
                      id="outlined-required"
                      label="Email"
                      placeholder="Enter email"
                      variant="standard"
                      type="text"
                    />
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <TextField
                      required
                      id="outlined-required"
                      label="Password"
                      placeholder="Enter password"
                      variant="standard"
                      type="password"
                    />
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Box>
                    <Button type="submit" variant="contained" color="success"
                      startIcon={<LoginOutlined />}>
                      Login
                    </Button>
                  </Box>
                  <hr />
                  <Box className='text-center'>
                    <Typography variant='body2'>
                      Don't have an account? <Link to="/signup">Signup</Link>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <img src="/login.png" width='100%' alt="login" />
          </Grid>
        </Grid>
      </Box>
    </>
  );

}

export default LoginPage;
