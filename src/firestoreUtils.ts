import { db } from './firebaseconfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export async function addData(collectionName: string, data: any) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function readData(collectionName: string) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  // const data = querySnapshot.docs.map(doc => doc.data());
  return querySnapshot;
}
