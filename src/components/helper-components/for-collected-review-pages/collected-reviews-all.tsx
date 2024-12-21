import React from 'react';
import { Box, Typography} from '@mui/material';
import { StyledCard, StyledCardContent, StyledTypography } from '../custom-styled-mui-components';

interface Quote {
    quote: string;
    source: string;
    source_url: string;
    key: number;
    bolded_text: string;
    flagged_status: boolean;
    keywords: string[];
    sentiment: string;
    date: string;
}



const CollectedReviewsAll: React.FC<Quote> = ({ quote, source, source_url, bolded_text, flagged_status, keywords, sentiment, date, key }) => {
    
    let formattedQuote: (string | JSX.Element)[] = [quote];
    const normalize = (str: string) => str.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').toLocaleLowerCase();

    if (normalize(quote).includes(normalize(bolded_text))) {

        const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const escapedBoldedText = escapeRegExp(bolded_text.replace(/\.$/, ''));
        const parts = quote.split(new RegExp(`(${escapedBoldedText})`, 'gi'));
        formattedQuote = parts.map((part, index) =>
            normalize(part) === normalize(bolded_text) ? (
                <strong key={index}>{part}</strong>
            ) : (
                part
            )
        );
    } 
    
    return (
        <>
                <StyledCard key={key}>
                    <StyledCardContent>
                        <Box>
                            <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                               {formattedQuote}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                <strong>Sentiment:</strong> {sentiment}
                            </Typography>
                            {date && (
                                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                    <strong>Date:</strong> {date}
                                </Typography>
                            )}
                            <Typography variant="body2" color="textSecondary">
                                <a href={source_url} target="_blank" rel="noopener noreferrer">
                                    {source}
                                </a>
                            </Typography>
                        </Box>
                    </StyledCardContent>
                </StyledCard>
        </>
    );
};

export default CollectedReviewsAll;