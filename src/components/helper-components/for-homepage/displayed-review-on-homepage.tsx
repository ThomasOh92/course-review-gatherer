import React from 'react';
import { Box, Typography} from '@mui/material';
import { Card, CardContent } from '@mui/material';

interface DisplayedReviewProps {
    key: number;
    quote: string;
    source: string;
    source_url: string;
    date: string;
}


const DisplayedReviewOnHomePage: React.FC<DisplayedReviewProps> = ({ quote, source, source_url, date, key }) => {

    return (
        
            <Card key={key} sx={{ mb: 2 }}>
                <CardContent>
                    <Box>
                        <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
                            Review from {' '}
                            <a href={source_url} target="_blank" rel="noopener noreferrer">
                                {source}
                            </a>
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                            {quote}
                        </Typography>
                        {date && (
                            <Typography variant="body2" color="textSecondary">
                                <strong>Date:</strong> {date}
                            </Typography>
                        )}
                    </Box>
                </CardContent>
            </Card>
        
    );
};

export default DisplayedReviewOnHomePage;