import Button, { ButtonProps } from "./ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { useFirestore, useUser } from "reactfire";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { createExpenseValidator } from "@/lib/validators/createExpenseValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Budget } from "types";

type FormData = z.infer<typeof createExpenseValidator>;

interface CreateExpenseButtonProps extends ButtonProps {
  budgets: Budget[] | undefined;
}

export default function CreateExpenseButton({
  variant,
  className,
  ...props
}: CreateExpenseButtonProps) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const firestore = useFirestore();
  const expenseCollection = collection(firestore, "expenses");
  const { data: user } = useUser();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createExpenseValidator),
  });

  async function createExpense(name: string, amount: number, budgetId: string) {
    try {
      setLoading(true);
      const validatedInput = createExpenseValidator.parse({
        name,
        amount: amount,
        budgetId,
      });
      const newExpense = {
        name: validatedInput.name,
        amount: validatedInput.amount,
        budgetId: validatedInput.budgetId,
        createdAt: serverTimestamp(),
        createdBy: user!.uid,
      };
      const docRef = await addDoc(expenseCollection, { ...newExpense });
      if (docRef?.id) {
        setLoading(false);
        toast({
          title: "Success",
          description: "Your expense has been created.",
        });
        reset();
        setOpen(false);
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof z.ZodError) {
        setError("name", { message: error.message });
        setError("amount", { message: error.message });
        setError("budgetId", { message: error.message });
        return;
      }
    }
  }

  function onSubmit(data: FormData) {
    createExpense(data.name, data.amount, data.budgetId);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" size="sm">
            <Icons.banknote size={14} className="mr-1" /> Create Expense
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex gap-1 items-center">
              <Icons.wallet size={20} className="mr-1" />
              Create An Expense
            </DialogTitle>
            <DialogDescription>
              What did you spend on. Enter expense name and amount.
            </DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col align-center gap-2">
              <Label htmlFor="budget" className="text-left">
                Expense Name
              </Label>

              <Controller
                name="budgetId"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the budget for this expense" />
                    </SelectTrigger>
                    <SelectContent>
                      {props.budgets
                        ? props.budgets.map((budget) => (
                            <SelectItem value={budget.id} key={budget.id}>
                              {budget.name}
                            </SelectItem>
                          ))
                        : null}
                    </SelectContent>
                  </Select>
                )}
              />
              <p className="mt-1 text-sm text-red-600">
                {errors.budgetId?.message}
              </p>
            </div>
            <div className="flex flex-col align-center gap-2">
              <Label htmlFor="name" className="text-left">
                Expense Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                {...register("name")}
                type="text"
                name="name"
                placeholder="Flight tickets"
              />
              <p className="mt-1 text-sm text-red-600">
                {errors.name?.message}
              </p>
            </div>
            <div className="flex flex-col align-center gap-2">
              <Label htmlFor="amount" className="text-left">
                Expense Amount
              </Label>
              <Input
                id="amount"
                type="number"
                className="col-span-3"
                {...register("amount", {
                  valueAsNumber: true,
                })}
                name="amount"
                placeholder="6500"
              />
              <p className="mt-1 text-sm text-red-600">
                {errors.amount?.message}
              </p>
            </div>
            <DialogFooter>
              <Button type="submit" isLoading={isLoading}>
                Add Expense
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
