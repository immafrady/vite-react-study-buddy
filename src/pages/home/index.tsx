import { Card, Grid } from '@mui/material';

const Home = () => {
  return <Grid container spacing={2}>
      { [
        "aaa",
        "bbb",
        "ccc",
        "ddd"
      ].map(item => <Grid item xs={12} md={6}>
          <Card sx={{p: 5}}>{item}</Card>
      </Grid>) }
  </Grid>;
};

export default Home;
