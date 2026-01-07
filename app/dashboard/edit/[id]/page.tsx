"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
  });

  // Fetch existing product
  useEffect(() => {
    if (!id) return;

    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data) return;

        setForm({
          name: data.name ?? "",
          description: data.description ?? "",
          price: String(data.price ?? ""),
          stock: String(data.stock ?? ""),
          imageUrl: data.imageUrl ?? "",
        });

        setLoading(false);
      });
  }, [id]);

  const uploadImage = async () => {
    if (!file) return form.imageUrl;

    const data = new FormData();
    data.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    return result.url;
  };

  const submit = async () => {
    const imageUrl = await uploadImage();

    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        imageUrl,
      }),
    });

    router.push("/dashboard");
  };

  if (loading) {
    return <p className="p-10">Loading...</p>;
  }

  return (
    <div className="p-10 max-w-xl">
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>

      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 w-full mb-3"
        placeholder="Name"
      />

      <textarea
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
        className="border p-2 w-full mb-3"
        placeholder="Description"
      />

      <input
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="border p-2 w-full mb-3"
        placeholder="Price"
      />

      <input
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
        className="border p-2 w-full mb-3"
        placeholder="Stock"
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button
        onClick={submit}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Update Product
      </button>
    </div>
  );
}
