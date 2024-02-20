import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';

const Home = () => {
  return <Grid container spacing={2}>
      { [{
        title: '开始做题',
        desc: '随便刷刷，从做的少的题目开始',
        href: '',
        background: {
          x: 85,
          y: 130,
        }
      }, {
        title: '考试模式',
        desc: '来一场痛痛快快都决斗吧！',
        href: '',
        background: {
          x: 380,
          y: 150,
        }
      }, {
        title: '复习模式',
        desc: '查漏补缺',
        href: '',
        background: {
          x: 120,
          y: 480,
        }
      }, {
        title: '历史记录',
        desc: '看看曾经都做过些什么',
        href: '',
        background: {
          x: 750,
          y: 370,
        }
      }
      ].map(item => <Grid item xs={12} md={6}>
          <Card
            elevation={3}
            sx={{ display: 'flex' }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <CardHeader title={item.title}/>
              <CardContent><Typography variant={'body1'}>{item.desc}</Typography></CardContent>
              <CardActions>
                <Button variant={'text'} href={item.href}>START</Button>
              </CardActions>
            </Box>
            <CardMedia sx={{ width: 170, minWidth: 170, height: 170,  background: `url('/public/cats.jpeg') -${item.background.x}px -${item.background.y}px` }} component={'div'} />
          </Card>
      </Grid>) }
  </Grid>;
};

export default Home;
