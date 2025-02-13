import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CardContent from '@mui/material/CardContent';

interface CollectedReviewShortSummaryProps {
    data?: {
        BulletPoints: string[];
        ShortSummary: string;
    };
}

const CollectedReviewShortSummary: React.FC<CollectedReviewShortSummaryProps> = ({ data }) => {
    return (
        <Paper tabIndex={0} sx={{ height: '100%', maxWidth: 500 }}>
            <CardContent>
                <div>
                    <Typography variant="h6" component="div">Summary</Typography>
                    <List sx={{ padding: 0, margin: 0, mb: 2 }} >
                        {data?.BulletPoints.map((point: string, index: number) => (
                            <ListItem key={index} sx={{ padding: 0, margin: 0 }}>
                                <ListItemText primary={`• ${point}`} />
                            </ListItem>
                        ))}
                    </List>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                    >
                        {data ? data.ShortSummary : 'Loading...'}
                    </Typography>
                </div>
            </CardContent>
        </Paper>
    );
};

export default CollectedReviewShortSummary;