import { useEffect, useState } from 'react';
import { firestore } from '../firebase/config';

const useFirestore = (collection) => {
  const [docs, setDocs] = useState<any>();

  useEffect(() => {
    const ubsub = firestore
      .collection(collection)
      .orderBy('added')
      .onSnapshot((snap) => {
        let documents: Array<any> = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });

    return () => ubsub();
  }, [collection]);

  return { docs };
};

export { useFirestore };
