import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import { collection, orderBy, query, where } from "firebase/firestore";
import { addFriendValidator } from "../validations/add-friend";
import { z } from "zod";

export function AddFriend(email: string) {
  try {
    // const validatedEmail = addFriendValidator.parse({ email });
    // const { data: user } = useUser();

    const firestore = useFirestore();

    const friendsCollectionRef = collection(firestore, "friends");
    // const incomingFriendRequests = collection(
    //   firestore,
    //   "incomingFriendRequests"
    // );

    const friendQuery = query(
      friendsCollectionRef,
      where("email", "==", email)
    );

    // const friendRequestQuery = query(
    //   incomingFriendRequests,
    //   where("email", "==", email)
    // );

    const { data: friends } = useFirestoreCollectionData(friendQuery);

    // const { data: friendRequests } =
    //   useFirestoreCollectionData(friendRequestQuery);

    console.log("here", friends);

    //id to add
    //check if id exists in users
    //check that id is not currentUser id

    //check that id is not already in friends

    //check that id is not already in pending
    //finally add id to pending
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { message: error.message };
    }
  }
}
