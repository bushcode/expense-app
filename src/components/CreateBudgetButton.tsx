import Button, { ButtonProps, ButtonVariants } from "./ui/button";
import { Icons } from "./Icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBudgetValidator } from "@/lib/validators/createBudgetValidator";
import { useState } from "react";
import { useFirestore, useUser } from "reactfire";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

type FormData = z.infer<typeof createBudgetValidator>;

interface CreateBudgetButtonProps extends ButtonProps {}

export default function CreateBudgetButton({
  className,
  variant,
  ...props
}: CreateBudgetButtonProps) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const firestore = useFirestore();
  const budgetCollection = collection(firestore, "budgets");
  const { data: user } = useUser();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createBudgetValidator),
  });

  async function createBudget(name: string, amount: number) {
    try {
      setLoading(true);
      const validatedInput = createBudgetValidator.parse({ name, amount });
      const newBudget = {
        name: validatedInput.name,
        amount: validatedInput.amount,
        createdAt: serverTimestamp(),
        createdBy: user!.uid,
      };
      const docRef = await addDoc(budgetCollection, { ...newBudget });
      if (docRef?.id) {
        setLoading(false);
        toast({
          title: "Success",
          description: "Your budget has been created.",
        });
        reset();
        setOpen(false);
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof z.ZodError) {
        setError("name", { message: error.message });
        setError("amount", { message: error.message });
        return;
      }
    }
  }

  function onSubmit(data: FormData) {
    createBudget(data.name, data.amount);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className={cn(
              ButtonVariants({ variant }),
              {
                "cursor-not-allowed opacity-60": isLoading,
              },
              className
            )}
            {...props}
          >
            <Icons.wallet size={14} className="mr-1" /> Create Budget
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex gap-1 items-center">
              <Icons.wallet size={20} className="mr-1" />
              Create A Budget
            </DialogTitle>
            <DialogDescription>
              Start a budget. Enter budget name and amount.
            </DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col align-center gap-2">
              <Label htmlFor="name" className="text-left">
                Budget Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                {...register("name")}
                type="text"
                name="name"
                placeholder="Trip to Hawaii"
              />
              <p className="mt-1 text-sm text-red-600">
                {errors.name?.message}
              </p>
            </div>
            <div className="flex flex-col align-center gap-2">
              <Label htmlFor="amount" className="text-left">
                Budget Amount
              </Label>
              <Input
                id="amount"
                type="number"
                className="col-span-3"
                {...register("amount", {
                  valueAsNumber: true,
                })}
                name="amount"
                placeholder="3500"
              />
              <p className="mt-1 text-sm text-red-600">
                {errors.amount?.message}
              </p>
            </div>
            <DialogFooter>
              <Button type="submit" isLoading={isLoading}>
                Save Budget
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
