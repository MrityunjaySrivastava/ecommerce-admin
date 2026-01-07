"use client";

export default function DeleteProductButton({
  productId,
}: {
  productId: string;
}) {
  const handleDelete = async () => {
    const ok = confirm("Are you sure you want to delete this product?");
    if (!ok) return;

    await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });

    window.location.reload();
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600"
    >
      Delete
    </button>
  );
}
