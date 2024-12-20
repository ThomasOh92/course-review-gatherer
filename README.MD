# Next Steps
- Review text is looking a bit thin. When extracting, need to qc for longer quotes. It seemed to ignore character requirement
- SO MUCH HALLUCINATION. NEED TO DO LINK BY LINK. GENERATE 3 QUOTES. CHECK ACCURACY OF ALL 3 QUOTES

- Consider reworking individual pages - left hand column (Generated Insight). Consider adding Course Metadata 
- Maybe change "Review Source Data Notes" to the actual list of sources
- Maybe further add - Sources have multiple fields (links, tag - trusted, high priority, experimental, name, description, type, added date, status)

===================

# Process Definition - Starting a new page - Every phase has a human in the loop
## Phase A - Collect and Manually Verify Links
1. Create a json file to hold the collected, titled "{course_name}_firstore.json"
2. Collect manually verified links and place them into the json file under "AllLinks", as an array <!-- human -->

## Phase B - Generate the quotes one link at a time and save the quotes
5. Open ChatGPT and provide the following prompt:
{insert link}
This link contains valuable reviews about the course {course name}. I would like you to go to the page and extract quotes that provide a review about the course. Find as many relevant quotes as possible.
- Each quote should be
-- between 400-600 characters, with a minimum of 70 words
-- contain information that will help someone decide whether they should take a course
-- Does not include newline characters (\n), tabs (\t), or other formatting artifacts.
-- Excludes HTML tags, URLs, or unrelated text (e.g., navigation headers or site footers).
-- No irrelevant parts (e.g., excessive mentions of course navigation or unrelated discussions) while preserving the core sentiment of the review.
-- Replace multiple spaces with a single space.
-- Remove special characters (except punctuation) unless they are critical to the meaning of the quote.

Present the quotes back to me in a formatted json file. All quotes are in array, within a key called "CollectedReviews" 
Each quote should have the following fields - 'quote', 'source_url' 'bolded text', 'flagged status', 'keywords', 'sentiment', 'date'. 
- For 'bolded text', look at the relevant quote and identify snippets that should be bolded. This should be the value
- For 'source_url', refer to the url that the quote is taken from 
- For 'flagged status', just set it as null
- For 'keywords', identify 3 key words from the quote that would be relevant to someone considering taking the course
- For 'sentiment', identify if the review is positive, neutral, or negative
- For 'date', check the associated url for the date of the quote
- Make the new json file available to me for download

Accelerations possible - did 4 reddit links at one go, but didnt get as many quotes. Tried with a batch of 5 and it worked as well.
But remember, I started with one link first.

## Phase C - Generate the final output to upload into firestore
7. Reupload cleaned document "{course name}_firestore.json" to ChatGPT and ask the following
This is a json containing reviews about Fast AI: Deep Learning for Coders. Reading through all the reviews, I would like you to generate the following additional fields in the json - "Title", "CollectedReviewHref", "CourseLink", "Short Summary", "ReviewSourceDataNotes", and "BulletPoints" - organised in that order, in front of "CollectedReviews: 
- Title value is {course name}
- CollectedReviewHref can be an empty value
- For CourseLink, go out into the internet and find the right link for the actual course
- For ShortSummary, generate a summary of all the reviews. It should be no more than 3 sentences and 300 characters.
- For ReviewSourceDataNotes, just count the links and summarise it in this format (e.g Reviews collected from 8 Reddit threads, 2 Hacknews discussions...)
- For BulletPoints, give me three to four bullet points, no more than 6 words each
8. Manually verify the new fields - - "Title", "CollectedReviewHref", "CourseLink", "Short Summary", "ReviewSourceDataNotes", and "BulletPoints" <!-- human -->

## Phase D - Website manual check
9. Once presented on website, pick a sample and manually check that the quotes are real, no obvious errors


==========================================

# Next Level Trust
