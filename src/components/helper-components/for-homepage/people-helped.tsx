import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const PeopleHelped = () => (
    <Paper 
        elevation={3} 
        sx={{ 
            width: '100%', 
            maxWidth: 400, 
            padding: 2,
            mt: 2,
            display: 'flex', 
            justifyContent: 'center', 
            flexDirection: 'column',
            backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : 'default',
        }}
        square
    >
        <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>
                People We've Helped
            </Typography>
            <List>
                <ListItem>
                    <ListItemText
                        primary="P. Lee"
                        secondary="Requested a review of 'Fast AI: Practical Deep Learning for Coders' - Created on 15 Nov 2024"
                    />
                </ListItem>
            </List>
        </Box>
    </Paper>
);

export default PeopleHelped;
