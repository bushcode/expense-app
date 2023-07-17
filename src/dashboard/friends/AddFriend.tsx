import {
  useFirestore,
  useDatabaseListData,
  useFirestoreDocData,
} from "reactfire";
import AddFriendForm from "../../components/AddFriendForm";
import { ref } from "firebase/database";
import { collection, doc } from "firebase/firestore";

type Props = {};

export default function AddFriend({}: Props) {
  //   const messagesRef = doc(firestore, "realtime-react", "messages");
  //   const { status, data } = useFirestoreDocData(messagesRef);
  //   console.log(status, data, messagesCollection);

  // const MessagesRef = doc(useFirestore(), "realtime-react", "messages");

  // // subscribe to a document for realtime updates. just one line!
  // const { status, data } = useFirestoreDocData(MessagesRef);

  // console.log(MessagesRef);

  return (
    <section className="pt-8">
      <h1 className="font-bold text-5xl mb-8">Add a friend</h1>
      <AddFriendForm />
    </section>
  );
}
