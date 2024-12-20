import React from 'react';
import { Box, Typography} from '@mui/material';
import { StyledCard, StyledCardContent, StyledTypography } from '../custom-styled-mui-components';

interface Quote {
    quote: string;
    source_url: string;
    key: number;
}



const CollectedReviewsAll: React.FC<Quote> = ({ quote, source_url, key }) => {
    const urlParts = source_url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/');
    const title = urlParts.length > 2 ? `${urlParts[0]}/${urlParts[1]}/${urlParts[2]}` : urlParts.join('/');
    return (
        <>
                <StyledCard key={key}>
                    <StyledCardContent>
                        <Box>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                <strong>{title}:</strong> {quote}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <a href={source_url} target="_blank" rel="noopener noreferrer">
                                    {source_url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0]}
                                </a>
                            </Typography>
                        </Box>
                    </StyledCardContent>
                </StyledCard>
        </>
    );
};

export default CollectedReviewsAll;