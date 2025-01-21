import * as React from 'react';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseconfig';
import CollectedReviewsPage from './helper-components/for-collected-review-pages/collected-reviews-page';

export default function CS50x() {
  const [CS50xdata, setCS50xdata] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
      const docRefs = [
        { ref: doc(db, "summarizedReviews", "CS50x"), setter: setCS50xdata },
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
    <CollectedReviewsPage data={CS50xdata} courseId="CS50x" />
);
}
