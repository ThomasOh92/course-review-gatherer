import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const SuggestCourse = () => {
    return (
        <Paper 
            elevation={3} 
            sx={{ 
                width: '100%', 
                maxWidth: 400, 
                padding: 2,
                display: 'flex', 
                justifyContent: 'center', 
                flexDirection: 'column',
                backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : 'default',
            }}
            square
        >
            <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" gutterBottom>
                    Suggest a Course
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ maxWidth: 300 }}>
                    Request for a course to be added!
                </Typography>
                <Box
                    sx={{
                        display: 'inline-block',
                        border: '1px solid',
                        borderColor: 'primary.main',
                        borderRadius: 1,
                        padding: '8px 16px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: 'primary.light',
                        },
                        mt: 1,
                    }}
                >
                    <Link 
                        href="https://docs.google.com/forms/d/e/1FAIpQLSeUFYoCTEIF102LXtKRyzT708hFPE_dZN_Z3VZmTAPVTYkrOg/viewform" 
                        target="_blank" 
                        sx={{ color: 'primary.main', textDecoration: 'none' }}
                    >
                        Submit Suggestion
                    </Link>
                </Box>
            </Box>
        </Paper>
    );
};

export default SuggestCourse;
