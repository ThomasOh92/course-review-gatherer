import React from 'react';
import { Typography } from '@mui/material';
import { StyledCard, StyledCardContent, StyledTypography } from '../custom-styled-mui-components';

interface HomepageComingSoonProps {
    title: string;
}

const HomepageComingSoon: React.FC<HomepageComingSoonProps> = ({ title }) => {
    
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
            onFocus={() => handleFocus(0)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
            sx={{ height: '100%', width: '100%', maxWidth: 700 }}
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
                        {title ? title : 'Loading...'}
                    </Typography>
                    <StyledTypography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'block', overflow: 'visible', WebkitLineClamp: 'unset', mt: 1, mb: 1 }}
                    >
                        Summary Coming Soon...
                    </StyledTypography>
                </div>
            </StyledCardContent>
        </StyledCard>
    );
};

export default HomepageComingSoon;
