import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addFriendValidator } from "../lib/validations/add-friend";
import Button from "./ui/button";

import { AddFriend } from "../lib/firestore/addFriend";
import { z } from "zod";
import { useFirestore } from "reactfire";
import { collection } from "firebase/firestore";

type Props = {};

type FormData = z.infer<typeof addFriendValidator>;

function AddFriendForm({}: Props) {
  const [showSuccessState, setShowSuccessState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });

  const firestore = useFirestore();
  const collectionRef = collection(firestore, "friends");

  //   const messagesQuery = query(collectionRef);
  //   const { data: user } = useUser();

  //   const { data: messages } = useFirestoreCollectionData(messagesQuery);

  //   console.log(user);

  function onSubmit(data: FormData) {
    AddFriend(data.email);
  }

  return (
    <form className="max-w-md" onSubmit={handleSubmit(onSubmit)}>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Add friend by E-mail
      </label>
      <div className="mt-2 flex gap-4">
        <input
          {...register("email")}
          type="text"
          name="email"
          id="email"
          className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
          placeholder="you@example.com"
        />
        <Button isLoading={loading}>Add</Button>
      </div>
      <p className="mt-1 text-sm text-red-600">{errors.email?.message}</p>
      {/*  {showSuccessState && (
        <p className="mt-1 text-sm text-green-600">Friend request sent</p>
      )} */}
    </form>
  );
}

export default AddFriendForm;
