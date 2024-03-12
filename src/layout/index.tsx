import Box from '@mui/material/Box';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Outlet, useMatches  } from 'react-router-dom';
import { ThemeSwitch } from '@/hooks/use-theme-switcher';

const Layout = () => {
    // meta
    const matches = useMatches();
    let bestMatch = matches[matches.length - 1];

    // theme switcher
    return <Box>
        <AppBar component={'nav'} position={'static'}>
            <Toolbar>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, display: 'block' }}
                >
                    {(bestMatch?.handle as any)?.title ?? '学习伙伴'}
                </Typography>
                <ThemeSwitch />
            </Toolbar>
        </AppBar>
        <Box component={'main'} sx={{p: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}}>
            <Outlet />
        </Box>
    </Box>;
};

export default Layout;
