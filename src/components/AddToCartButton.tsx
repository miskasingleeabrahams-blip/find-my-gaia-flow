import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

export function AddToCartButton({
  product,
  className = "",
  label = "Add to basket",
}: {
  product: ShopifyProduct;
  className?: string;
  label?: string;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  const variant = product.node.variants.edges[0]?.node;
  const disabled = !variant || pending;

  const handleAdd = async () => {
    if (!variant) return;
    setPending(true);
    try {
      await addItem({
        product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions || [],
      });
      setDone(true);
      toast.success(`${product.node.title} added to basket`);
      setTimeout(() => setDone(false), 1500);
    } catch (e) {
      console.error(e);
      toast.error("Could not add to basket");
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      onClick={handleAdd}
      disabled={disabled}
      className={
        className ||
        "inline-flex items-center justify-center gap-2 rounded-full border border-sage-deep/30 px-5 py-2.5 text-sm text-sage-deep hover:bg-sage/10 transition disabled:opacity-50"
      }
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : done ? <Check className="h-4 w-4" /> : null}
      {pending ? "Adding…" : done ? "Added" : label}
    </button>
  );
}
