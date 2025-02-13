import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box, Link } from '@mui/material';

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

    const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(null,);
    const handleFocus = (index: number) => {
        setFocusedCardIndex(index);
      };    
    const handleBlur = () => {
    setFocusedCardIndex(null);
    };

    return (
        <Card
            variant="outlined"
            onFocus={() => handleFocus(3)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 3 ? 'Mui-focused' : ''}
            sx={{ height: '100%', maxWidth: 700 }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                }}
            >
                <div>
                    <Typography variant="body1">
                        {data ? data.ReviewSourceDataNotes : 'Loading...'}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'block', overflow: 'visible', WebkitLineClamp: 'unset', mt: 1, mb: 1 }}
                    >
                        <strong>AI Summary:</strong> {data ? data.ShortSummary : 'Loading...'}
                    </Typography>
                </div>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Link
                        sx={{ 
                            display: 'block', 
                            overflow: 'visible', 
                            WebkitLineClamp: 'unset', 
                            color: 'primary.main', 
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 'bold',
                            fontSize: '0.875rem', // Smaller font size
                            textDecoration: 'none', // Remove underline
                            '&:hover': {
                                textDecoration: 'underline', // Add underline on hover
                            }
                        }}
                        href={data ? data.CourseLink : 'Loading...'}
                        target='_blank'
                    >
                        Link to Course
                    </Link>
                    <Link
                        sx={{ 
                            display: 'block', 
                            overflow: 'visible', 
                            WebkitLineClamp: 'unset', 
                            color: 'secondary.main', 
                            ml: 3, 
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 'bold',
                            fontSize: '0.875rem', // Smaller font size
                            textDecoration: 'none', // Remove underline
                            '&:hover': {
                                textDecoration: 'underline', // Add underline on hover
                            }
                        }}
                        href={data ? data.CollectedReviewHref : 'Loading...'}
                    >
                        Collected Reviews
                    </Link>
                </Box>
            </CardContent>
        </Card>
    );
};

export default HomepageSummaryCard;