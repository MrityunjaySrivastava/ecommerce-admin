"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductInput } from "@/schemas/product.schema";
import { useState } from "react";

export default function NewProductPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
  });

  const uploadImage = async () => {
    if (!file) return "";

    const data = new FormData();
    data.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    return result.url;
  };

  const onSubmit = async (data: ProductInput) => {
    const imageUrl = await uploadImage();

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        imageUrl,
      }),
    });

    router.push("/dashboard");
  };

  return (
    <div className="p-10 max-w-xl">
      <h1 className="text-xl font-bold mb-6">Add Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <input
            {...register("name")}
            placeholder="Product Name"
            className="border p-2 w-full"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <textarea
            {...register("description")}
            placeholder="Description"
            className="border p-2 w-full"
          />
          {errors.description && (
            <p className="text-red-600 text-sm">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            placeholder="Price"
            className="border p-2 w-full"
          />
          {errors.price && (
            <p className="text-red-600 text-sm">{errors.price.message}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            {...register("stock", { valueAsNumber: true })}
            placeholder="Stock"
            className="border p-2 w-full"
          />
          {errors.stock && (
            <p className="text-red-600 text-sm">{errors.stock.message}</p>
          )}
        </div>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {isSubmitting ? "Saving..." : "Save Product"}
        </button>

      </form>
    </div>
  );
}
