import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Footer from '../../Footer';
import getTheme from '../../mui-theme/getTheme';
import CollectedReviewShortSummary from './collected-reviews-short-summary';
import CollectedReviewsSources from './collected-reviews-sources';
import CollectedReviewsAll from './collected-reviews-all';

interface ReviewPageProps {
    data: any;
}

const ReviewPage: React.FC<ReviewPageProps> = ({data }) => {
    const [mode, setMode] = React.useState<PaletteMode>('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const mainTheme = createTheme(getTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });

    React.useEffect(() => {
        const savedMode = localStorage.getItem('themeMode') as PaletteMode | null;
        if (savedMode) {
            setMode(savedMode);
        } else {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setMode(systemPrefersDark ? 'dark' : 'light');
        }
    }, []);

    console.log(data);

    return (
        <ThemeProvider theme={showCustomTheme ? mainTheme : defaultTheme}>
            <CssBaseline enableColorScheme />
            <Container
                maxWidth="lg"
                component="main"
                sx={{ display: 'flex', flexDirection: 'column', my: 6, gap: 4 }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                    <Typography variant="h2" gutterBottom maxWidth='700px' align="center">{data?.Title}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: { xs: 'center', md: 'flex-start' }, width: '100%' }}>
                        {/* Left hand Column */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <CollectedReviewShortSummary data={data} />
                            <CollectedReviewsSources data={data} />
                        </Box>
                        <Grid xs={12} md={6}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%', alignItems: 'center' }}>
                                {data?.CollectedReviews?.map((quote: any, index: number) => (
                                    <CollectedReviewsAll source={quote.source} quote={quote.quote} url={quote.url} key={index}  />
                                )) || 'No data available'}
                            </Box>
                        </Grid>
                    </Box>
                </Box>
                <Footer />
            </Container>
        </ThemeProvider>
    );
};

export default ReviewPage;
