/* eslint-disable react/prop-types */
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { BarChart } from '@mui/x-charts/BarChart';
const DashboardPage = ({ user }) => {
  if (!user) return null;
  return (
    <>
      <Box sx={{ py: 3 }}>
        <Typography variant="h4" >
          Welcome ! <span className='text-primary text-capitalize'>{user.name}</span>
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body1"><strong>Mobile:</strong> {user.mobile}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ backgroundColor: '#f2f2f2' }}>
            <CardContent>
              <Typography  sx={{ color: 'text.secondary', fontSize: 14 }}>
                Word of the Day
              </Typography>

              <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ backgroundColor: '#f2f2f2' }}>
            <CardContent>
              <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                Word of the Day
              </Typography>

              <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ backgroundColor: '#f2f2f2' }}>
            <CardContent>
              <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                Word of the Day
              </Typography>

              <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={12}>
          <BarChart
            series={[
              { data: [35, 44, 24, 34] },
              { data: [51, 6, 49, 30] },
              { data: [15, 25, 30, 50] },
              { data: [60, 50, 15, 25] },
            ]}
            height={290}
            xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default DashboardPage