import React from 'react';
import { Card, Typography, List, ListItem, ListItemText, Box, Link } from '@mui/material';
import { StyledCard, StyledCardContent, StyledTypography } from '../custom-styled-mui-components';

interface Data {
    CollectedReviewHref: string | undefined;
    Title: string;
    BulletPoints: string[];
    ShortSummary: string;
    ReviewSourceDataNotes: string;
    CourseLink: string;
    data: () => Data;
}

interface HomepageSummaryCardProps {
    data: Data | null;
}


const HomepageSummaryCard: React.FC<HomepageSummaryCardProps> = ({ data }) => {
    if (data) {
        data = data.data();
    }

    const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(null,);
    const handleFocus = (index: number) => {
        setFocusedCardIndex(index);
      };    
    const handleBlur = () => {
    setFocusedCardIndex(null);
    };

    return (
        <StyledCard
            variant="outlined"
            onFocus={() => handleFocus(3)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 3 ? 'Mui-focused' : ''}
            sx={{ height: '100%', maxWidth: 700 }}
        >
            <StyledCardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                }}
            >
                <div>
                    <Typography variant="h6" component="div">
                        {data ? data.Title : 'Loading...'}
                    </Typography>
                    <List sx={{ padding: 0, margin: 0 }}>
                        {data?.BulletPoints?.map((point: string, index: number) => (
                            <ListItem key={index} sx={{ padding: 0, margin: 0 }}>
                                <ListItemText primary={`• ${point}`} />
                            </ListItem>
                        ))}
                    </List>
                    <StyledTypography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'block', overflow: 'visible', WebkitLineClamp: 'unset', mt: 1, mb: 1 }}
                    >
                        {data ? data.ShortSummary : 'Loading...'}
                    </StyledTypography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Card sx={{ maxWidth: 500, textAlign: 'center' }}>
                            Analysed from... {data ? data.ReviewSourceDataNotes : 'Loading...'}
                        </Card>
                    </Box>
                </div>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Link
                        sx={{ display: 'block', overflow: 'visible', WebkitLineClamp: 'unset', color: 'primary.main' }}
                        href={data ? data.CourseLink : 'Loading...'}
                        target='_blank'
                    >
                        Link to Course
                    </Link>
                    <Link
                        sx={{ display: 'block', overflow: 'visible', WebkitLineClamp: 'unset', color: 'secondary.main', ml: 3 }}
                        href={data ? data.CollectedReviewHref : 'Loading...'}
                    >
                        See Details on Collected Reviews
                    </Link>
                </Box>
            </StyledCardContent>
        </StyledCard>
    );
};

export default HomepageSummaryCard;