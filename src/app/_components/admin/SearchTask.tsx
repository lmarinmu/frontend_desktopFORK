"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/app/_components/ui/button";
import { Form, FormControl, FormField, FormItem } from "~/app/_components/ui/form";
import { Input } from "~/app/_components/ui/input";
import { Search } from "lucide-react";

const formSchema = z.object({
  taskId: z.string().min(1, "El Task ID es requerido")
});

interface SearchTaskProps {
  onSearch: (taskId: string) => void;
  isLoading?: boolean;
}

export function SearchTask({ onSearch, isLoading }: SearchTaskProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskId: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSearch(values.taskId);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2">
        <FormField
          control={form.control}
          name="taskId"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder="Ingresa el Task ID..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            "Buscando..."
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Buscar
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
