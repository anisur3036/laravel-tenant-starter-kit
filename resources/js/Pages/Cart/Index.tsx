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
import { Minus, MinusIcon, Pencil, PlusIcon, Trash2 } from "lucide-react";
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

  const removeCartItem = (index) => {
    const updateCart = [...carts];
    updateCart.splice(index, 1);
    setCarts(updateCart);
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
          <div className="col-span-5">
            <div className="flex flex-wrap">
              {products.data.map((product) => (
                <div
                  className="m-4 w-[200px] h-[300px] bg-gray-700 rounded-md overflow-hidden"
                  key={product.id}
                >
                  <div className="w-[200px] h-[150px] overflow-hidden mx-auto">
                    <img
                      className="w-[200px] h-[150px] bg-cover"
                      src={product.img}
                      alt={product.name}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-4 p-4">
                    <h5 className="text-slate-200 text-base font-semibold">
                      {product.name}
                    </h5>
                    <h5>{product.selling_price}</h5>
                  </div>
                  <button onClick={() => handleCartAdd(product.id)}>
                    Add to cart
                  </button>
                </div>
              ))}
            </div>
            <div className=" mt-4 flex justify-end">
              <PaginationComponent links={products.meta.links} />
            </div>
          </div>

          <div className="col-span-3 flex flex-col gap-4">
            {carts.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="size-14">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {carts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img src={product.img} alt={product.name} />
                      </TableCell>
                      <TableCell className="text-ellipsis truncate">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.qty}</TableCell>
                      <TableCell>{product.selling_price}</TableCell>
                      <TableCell>
                        {product.selling_price * product.qty}
                      </TableCell>
                      <TableCell className="flex items-center justify-end gap-4"></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
