import * as React from 'react';
import DashboardLayout from '../components/Layout';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';

const Home: React.FunctionComponent = () => {
  return (
    <DashboardLayout>
      <Container maxWidth={false} style={{ marginTop: 20 }}>
        <Grid item xs={12} md={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h4>Dashboard</h4>
          </Paper>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};

export default Home;
