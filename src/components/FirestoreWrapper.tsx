import { initializeFirestore } from "firebase/firestore";
import { FirestoreProvider, useInitFirestore } from "reactfire";

interface FirestoreWrapperProps {
  children: React.ReactNode;
}

export default function FirestoreWrapper({ children }: FirestoreWrapperProps) {
  const { data: firestoreInstance } = useInitFirestore(async (firebaseApp) => {
    const db = initializeFirestore(firebaseApp, {});
    return db;
  });

  return (
    <FirestoreProvider sdk={firestoreInstance}>{children}</FirestoreProvider>
  );
}
