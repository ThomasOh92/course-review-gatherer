import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { StyledCardContent, StyledTypography } from '../custom-styled-mui-components';

interface CollectedReviewsSourcesProps {
    data?: {
        ReviewSourceDataNotes?: string;
    };
}

const CollectedReviewsSources: React.FC<CollectedReviewsSourcesProps> = ({ data }) => (
    <Paper tabIndex={0} sx={{ height: '100%', maxWidth: 500 }}>
        <StyledCardContent>
            <Typography variant="h6" component="div">Review Sources</Typography>
            <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
            >
                {data ? data.ReviewSourceDataNotes : 'Loading...'}
            </StyledTypography>
        </StyledCardContent>
    </Paper>
);

export default CollectedReviewsSources;