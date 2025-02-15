import React, { useState } from "react";
import { Container, TextField, IconButton, Box, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseconfig';
import { getFunctions, httpsCallable } from "firebase/functions";
import CircularProgress from "@mui/material/CircularProgress";
import DisplayedReviewOnHomePage from "./displayed-review-on-homepage";

interface SubmitQuestionProps {
  selectedCourseData: Data | null;
}

interface Data {
  CollectionName: string | undefined;
  CollectedReviewHref: string | undefined;
  Title: string;
  BulletPoints: string[];
  ShortSummary: string;
  ReviewSourceDataNotes: string;
  CourseLink: string;
  data: () => Data;
}


const SubmitQuestion: React.FC<SubmitQuestionProps> = ({selectedCourseData}) => {
  const [input, setInput] = useState("");
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [summaryAnalysis, setSummaryAnalysis] = useState<string>("");
  const [selectedReviewIDs, setSelectedReviewIDs] = useState<string[]>([]);
  const [fetchedReviews, setFetchedReviews] = useState<any[]>([]);

  const fetchReviews = async () => {
    try {
      // Reference the specific course's subcollection
      const reviewsRef = collection(db, `summarizedReviews/${selectedCourseData?.CollectionName}/CollectedReviews`);
      const querySnapshot = await getDocs(reviewsRef);

      let reviews: any[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        reviews.push({
          ReviewId: data.ReviewID || "Unknown Review ID",
          source_url: data.source_url || "Unknown URL",
          source: data.source || "Unknown Source",
          quote: data.quote || "No quote available",
          date: data.date || "Unknown Date",
        });
      });
      setFetchedReviews(reviews);

      if (reviews.length === 0) {
        return "No reviews found for this course.";
      }
      return reviews;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return null;
    }
  }

  const formatReviewsForOpenAI = (reviews: any[]) => {
    return reviews.map((review) => 
      `Review ID: ${review.ReviewId}:\nSource: ${review.source}\nURL: ${review.source_url}\nQuote: "${review.quote}"\n`
    ).join("\n\n");
  };

  const getOpenAIResponse = async (prompt: any, formattedReviews: any) => {
    const functions = getFunctions();
    const getOpenAIResponseCallable = httpsCallable(functions, "getOpenAIResponse");
    try {
      const response: any = await getOpenAIResponseCallable({ prompt, formattedReviews })
      return response.data.message;

    } catch (error) {
      console.error(error);
    }
  };

  const processOpenAiResponse = (response: any) => {
    const extractedSummaryAnalysis = response.split("\n\n")[0].trim();
    setSummaryAnalysis(extractedSummaryAnalysis);

    const reviewIdPattern = /Review ID:\s([a-f0-9-]+)/g;
    let match;
    const reviewIds = [];

    while ((match = reviewIdPattern.exec(response)) !== null) {
        reviewIds.push(match[1]);
        console.log(reviewIds)
    }
    setSelectedReviewIDs(reviewIds);
  }
    
  const handleSend = async () => {
    if (!input.trim()) return;
    setLoadingAnswer(true);
    try {
      const reviews = await fetchReviews();
      if (!reviews || reviews === "No reviews found for this course.") {
        alert("No reviews found for this course.");
        return;
      }

      const formattedReviews = formatReviewsForOpenAI(reviews);
      console.log("Prompt:", input);

      const response = await getOpenAIResponse(input, formattedReviews);
      console.log("This is OpenAI's response", response)
      processOpenAiResponse(response);
      setLoadingAnswer(false);

    } catch (error) {
      console.error("Error handling question:", error);
      setSummaryAnalysis(error);
      setLoadingAnswer(false);
    }
    
  }

  return (
    <Container sx={{ display: "flex", flexDirection: "column", pt: 2, width: '100%'}}>
      <Box display="flex" alignItems="center">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="What would you like to know?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        disabled={loadingAnswer}
      />
      <IconButton color="primary" onClick={handleSend} sx={{ ml: 1 }} disabled={loadingAnswer}>
        <SendIcon />
      </IconButton>

      {loadingAnswer && <CircularProgress />}

      </Box>
      <Typography sx={{color: 'text.Primary', mb: 2, mt:2 }}>{summaryAnalysis}</Typography>
      {fetchedReviews
      .filter(review => selectedReviewIDs.includes(review.ReviewId))
      .map((review, index) => (
        <DisplayedReviewOnHomePage key={index} source={review.source} source_url={review.source_url} quote={review.quote} date={review.date}/>
      ))}
    </Container>
  );
};

export default SubmitQuestion;
