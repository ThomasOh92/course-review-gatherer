import React from 'react';
import { Box, Typography} from '@mui/material';
import { StyledCard, StyledCardContent, StyledTypography } from '../custom-styled-mui-components';

interface Quote {
    source: string;
    quote: string;
    url: string;
    key: number;
}



const CollectedReviewsAll: React.FC<Quote> = ({ source, quote, url, key }) => {
    return (
        <>
                <StyledCard key={key}>
                    <StyledCardContent>
                        <Box>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                <strong>{source}:</strong> {quote}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <a href={url} target="_blank" rel="noopener noreferrer">
                                    {url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0]}
                                </a>
                            </Typography>
                        </Box>
                    </StyledCardContent>
                </StyledCard>
        </>
    );
};

export default CollectedReviewsAll;