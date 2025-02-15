import React, { useState } from "react";
import { Container, CircularProgress,  Box, Typography } from "@mui/material";

interface AnswerDisplayProps {
    loadingAnswer: boolean;
    answerData: any;
}

const AnswerDisplay: React.FC<AnswerDisplayProps> = (loadingAnswer, answerData) => {

    if (loadingAnswer) {
        return (
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    } else {
        return (
            <Container>
                <Typography>{answerData}</Typography>
            </Container>
        );
    }

};

export default AnswerDisplay;
