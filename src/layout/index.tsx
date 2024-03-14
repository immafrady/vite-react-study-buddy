import Box from '@mui/material/Box';
import { AppBar, Container, Toolbar, Typography, useTheme } from '@mui/material'
import { Outlet, useMatches  } from 'react-router-dom';
import { ThemeSwitch } from '@/hooks/use-theme-switcher';

const Layout = () => {
    // meta
    const matches = useMatches();
    let bestMatch = matches[matches.length - 1];
    const theme = useTheme()
    // theme switcher
    return <Box>
        <AppBar component={'nav'} position="sticky">
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
        <Container component="main" sx={{
            maxWidth: 'lg',
            pt: { xs: 2, sm: 2, md: 3, lg: 4, xl: 5 },
            pb: { xs: 2, sm: 2, md: 3, lg: 4, xl: 5 },
            height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
            position: 'relative',
        }}>
            <Outlet />
        </Container>
    </Box>;
};

export default Layout;
