import React, { useState } from "react";
import { Container, TextField, IconButton, Paper, Typography, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseconfig';


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

  const fetchReviews = async () => {
    try {
      // Reference the specific course's subcollection
      const reviewsRef = collection(db, `summarizedReviews/${selectedCourseData?.CollectionName}/CollectedReviews`);
      const querySnapshot = await getDocs(reviewsRef);

      let reviews: any[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        reviews.push({
          source_url: data.source_url || "Unknown URL",
          source: data.source || "Unknown Source",
          quote: data.quote || "No quote available"
        });
      });

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
    return reviews.map((review, index) => 
      `Review ${index + 1}:\nSource: ${review.source}\nURL: ${review.source_url}\nQuote: "${review.quote}"\n`
    ).join("\n\n");
  };

  const getOpenAIResponse = async (prompt: any, formattedReviews: any) => {
    try {
      const response = await fetch("https://getopenairesponse-r4whflv5oa-uc.a.run.app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, reviews: formattedReviews }),
        mode: "cors"
      });
  
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error("Error fetching OpenAI response:", error);
    }
  };
    
  const handleSend = async () => {
    if (!input.trim()) return;

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

    } catch (error) {
      console.error("Error handling question:", error);
    }
  }



  return (
    <Container sx={{ display: "flex", flexDirection: "column", height: "60vh", pt: 2, width: '100%'}}>
      <Box display="flex" alignItems="center">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="What would you like to know?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <IconButton color="primary" onClick={handleSend} sx={{ ml: 1 }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Container>
  );
};

export default SubmitQuestion;
