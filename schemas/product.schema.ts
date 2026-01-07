import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "Product name must be at least 3 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  price: z
    .number()
    .positive("Price must be greater than 0"),

  stock: z
    .number()
    .int("Stock must be an integer")
    .nonnegative("Stock cannot be negative"),

  imageUrl: z.string().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
