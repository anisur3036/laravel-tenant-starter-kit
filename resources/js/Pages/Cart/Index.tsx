// @ts-nocheck
import DangerButton from "@/components/DangerButton";
import { PaginationComponent } from "@/components/Pagination";
import PrimaryButton from "@/components/PrimaryButton";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link, router, usePage } from "@inertiajs/react";
import {
  Heart,
  Minus,
  MinusIcon,
  Pencil,
  PlusIcon,
  ShoppingBasket,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface Props {
  products: {
    data: {
      id: number;
      img: string;
      name: string;
      purchase_price: number;
      selling_price: number;
      stock: number;
      barcode: string;
      description: string;
      user: { id: number; name: string };
      created_at: string;
    }[];
    meta: {
      links: { url: string; label: string; active: boolean }[];
    };
  };
}

export default function Index({ products }: Props) {
  const { flash } = usePage<PageProps>().props;

  const [carts, setCarts] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedCarts = localStorage.getItem("carts");
    if (storedCarts) {
      setCarts(JSON.parse(storedCarts));
    }
  }, []);

  // Save to localStorage whenever carts change
  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(carts));
  }, [carts]);

  const handleCartAdd = (id) => {
    const productToAdd = products.data.find((product) => product.id === id); // Use find for efficiency

    if (productToAdd) {
      const indexProduct = carts.findIndex((item) => item.id === id);

      if (indexProduct >= 0) {
        // Create a *new* array with the updated quantity
        const updatedCarts = carts.map((item, index) => {
          if (index === indexProduct) {
            return { ...item, qty: item.qty + 1 }; // Increment quantity (assumed 1)
          }
          return item;
        });
        setCarts(updatedCarts);
      } else {
        // Add a *new* item to the cart using the spread operator
        setCarts([...carts, { ...productToAdd, qty: 1 }]);
      }
    }
  };

  const handleIncrementQty = (id: number) => {
    const updatedCarts = carts.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item,
    );
    setCarts(updatedCarts);
  };

  const handleDecrementQty = (id: number) => {
    const itemToDecrement = carts.find((item) => item.id === id);

    if (itemToDecrement) {
      if (itemToDecrement.qty > 1) {
        const updatedCarts = carts.map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item,
        );
        setCarts(updatedCarts);
      } else {
        const updatedCarts = carts.filter((item) => item.id !== id);
        setCarts(updatedCarts);
      }
    }
  };

  const handleQtyInputChange = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newQty = parseInt(event.target.value, 10); // Parse input value as an integer

    if (isNaN(newQty) || newQty < 0) {
      // Handle invalid input (e.g., empty or non-numeric) - you might want to reset to a valid value or display an error
      return; // Or set a default, like newQty = 1;
    }

    if (newQty === 0) {
      const updatedCarts = carts.filter((item) => item.id !== id);
      setCarts(updatedCarts);
    } else {
      const updatedCarts = carts.map((item) =>
        item.id === id ? { ...item, qty: newQty } : item,
      );
      setCarts(updatedCarts);
    }
  };

  const removeCartItem = (index) => {
    const updateCart = [...carts];
    updateCart.splice(index, 1);
    setCarts(updateCart);
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    for (const item of carts) {
      const product = products.data.find((p) => p.id === item.id);
      if (product) {
        subtotal += item.qty * product.selling_price;
      }
    }
    return subtotal;
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Products
          </h2>
          <Link
            prefetch={true}
            className={buttonVariants()}
            href={route("products.create")}
          >
            Create product
          </Link>
        </div>
      }
    >
      <Head title="Products" />
      <ToastContainer />

      <div className="mt-8 mb-6 mx-2 bg-gray-50 dark:bg-gray-950 rounded-md p-4">
        <div className="grid grid-cols-8 gap-2">
          <div className="col-span-5">Product info</div>
          <div className="col-span-3">Cart Info</div>
        </div>
        <div className="grid grid-cols-8 gap-2">
          <div className="col-span-5">
            <div className="flex flex-wrap gap-4">
              {products.data.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleCartAdd(product.id)}
                  className="w-40 overflow-hidden bg-white border cursor-pointer border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="w-40 h-32 overflow-hidden">
                    <img
                      className="bg-cover rounded-t-lg transition-all hover:scale-110"
                      src={product.img}
                      alt={product.name}
                    />
                  </div>
                  <div className="p-5">
                    <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                      {product.name}
                    </h5>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">Size</span>
                        <span className="text-sm font-semibold">{32}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">
                          Price(Tk.)
                        </span>
                        <span className="text-sm font-semibold">
                          {product.selling_price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className=" mt-4 flex justify-end">
              <PaginationComponent links={products.meta.links} />
            </div>
          </div>

          <div className="relative col-span-3 flex flex-col gap-4">
            <div
              id="cart-info"
              className="absolute overflow-y-auto min-h-64 max-h-32 border rounded-xl border-slate-700 p-4"
            >
              {carts.map((product, index) => (
                <div
                  className="h-28 grid grid-cols-5 items-center gap-4 border-b border-slate-700 pt-2"
                  key={product.id}
                >
                  <div className="w-16 p-1 col-span-1">
                    <img
                      className="bg-cover"
                      src={product.img}
                      alt={product.name}
                    />
                  </div>
                  <div className="col-span-3 flex flex-col gap-2">
                    <div className="flex items-center gap-8">
                      <h5>{product.name}</h5>
                      <span className="font-semibold">
                        {new Intl.NumberFormat("de-DE", {
                          style: "currency",
                          currency: "BDT",
                          maximumFractionDigits: 0,
                        }).format(product.selling_price)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleDecrementQty(product.id)}
                        className="bg-slate-600 py-1.5 px-2 border border-slate-700 rounded-l"
                      >
                        <MinusIcon size={20} className="text-red-500" />
                      </button>
                      <div className="w-24">
                        <input
                          className="w-full px-4 py-1 dark:bg-slate-600 border border-slate-700"
                          type="number"
                          value={product.qty}
                          onChange={(event) =>
                            handleQtyInputChange(product.id, event)
                          }
                        />
                      </div>
                      <button
                        onClick={() => handleIncrementQty(product.id)}
                        className="bg-slate-600 py-1.5 px-2 border border-slate-700 rounded-r"
                      >
                        <PlusIcon size={20} className="text-green-500" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-yellow-600 text-sm">
                        <Heart size={14} />
                        <span>Add to favorites</span>
                      </button>
                      <button
                        onClick={() => removeCartItem(index)}
                        className="text-red-600 font-semibold text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="py-8">
                    {new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "BDT",
                      maximumFractionDigits: 0,
                    }).format(product.qty * product.selling_price)}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full rounded-xl bg-accent absolute bottom-0 px-4 py-2 space-y-4">
              <div className="grid grid-cols-4 border-b border-slate-700 py-1">
                <p className="col-span-3">Subtotal</p>
                <p className="col-span-1 text-right">
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "BDT",
                    maximumFractionDigits: 0,
                  }).format(calculateSubtotal())}
                </p>
              </div>
              <div className="grid grid-cols-4 border-b border-slate-700 py-1">
                <p className="col-span-3">Savings</p>
                <p className="col-span-1 text-right">5222</p>
              </div>
              <div className="grid grid-cols-4 border-b border-slate-700 py-1">
                <p className="col-span-3">Tax</p>
                <p className="col-span-1 text-right">5222</p>
              </div>
              <div className="grid grid-cols-4 py-1">
                <p className="col-span-3 font-semibold">Total</p>
                <p className="col-span-1 text-right font-semibold">
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "BDT",
                    maximumFractionDigits: 0,
                  }).format(calculateSubtotal())}
                </p>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <PrimaryButton>Cash</PrimaryButton>
                <PrimaryButton>Bkash</PrimaryButton>
                <PrimaryButton>Bank</PrimaryButton>
                <PrimaryButton>Nagad</PrimaryButton>
                <PrimaryButton>Cash</PrimaryButton>
                <PrimaryButton>Bkash</PrimaryButton>
                <PrimaryButton>Bank</PrimaryButton>
                <PrimaryButton>Nagad</PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
