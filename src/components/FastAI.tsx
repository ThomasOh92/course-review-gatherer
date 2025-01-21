import * as React from 'react';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseconfig';
import CollectedReviewsPage from './helper-components/for-collected-review-pages/collected-reviews-page';

export default function FastAI() {
  const [fastAIData, setfastAIData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
      const docRefs = [
        { ref: doc(db, "summarizedReviews", "FastAI"), setter: setfastAIData },
      ];

      const fetchDocs = docRefs.map(async ({ ref, setter }) => {
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
        setter(docSnap.data());
        }
      });

      await Promise.all(fetchDocs);
      } catch (error) {
      console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);



  return (
    <CollectedReviewsPage data={fastAIData} courseId='FastAI'/>
);
}
