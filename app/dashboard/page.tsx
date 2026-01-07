import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ProductCharts from "@/components/ProductCharts";
import DeleteProductButton from "@/components/DeleteProductButton";

async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  return res.json();
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/auth/login");
  }

  const products = await getProducts();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <a
        href="/dashboard/new"
        className="bg-black text-white px-4 py-2 rounded"
      >
        + Add Product
      </a>

      <div className="mt-6 grid gap-4">
        {products.map((p: any) => (
          <div
            key={p._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}

              <div>
                <h2 className="font-semibold">{p.name}</h2>
                <p className="text-sm text-gray-600">
                  ₹{p.price} | Stock: {p.stock}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href={`/dashboard/edit/${p._id}`}
                className="text-blue-600"
              >
                Edit
              </a>
              <DeleteProductButton productId={p._id} />


            </div>
          </div>
        ))}

      </div>
      <ProductCharts products={products} />

    </div>
  );
}
