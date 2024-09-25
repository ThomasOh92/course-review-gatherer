import React from 'react';
import SideMenu from './sidemenu';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MainGrid from './maingrid';

const HomePage: React.FC = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <SideMenu />
            <Stack
                spacing={2}
                sx={{
                alignItems: 'center',
                mx: 3,
                pb: 10,
                mt: { xs: 16, sm: 10, md: 0 },
                }}
            >
                <MainGrid />
            </Stack>
        </Box>
    );
}

export default HomePage;