import { PaginationComponent } from "@/components/Pagination";
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
import { Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";
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

  useEffect(() => {
    if (flash.success) {
      toast(flash.success);
    }
  }, []);
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

      <div className="mt-8 mb-6 mx-2  rounded-md p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="size-14">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Purchase price</TableHead>
              <TableHead>Selling price</TableHead>
              <TableHead>Created by</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.data.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img src={product.img} alt={product.name} />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.purchase_price}</TableCell>
                <TableCell>{product.selling_price}</TableCell>
                <TableCell>{product.user.name}</TableCell>
                <TableCell>{product.created_at}</TableCell>
                <TableCell className="flex items-center justify-end gap-4">
                  <Link prefetch={true} href={route("users.edit", product.id)}>
                    <Pencil size={14} />
                  </Link>
                  <DeleteProduct product={product} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className=" mt-4 flex justify-end">
          <PaginationComponent links={products.meta.links} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

interface ProductProps {
  product: { id: number; name: string };
}

function DeleteProduct({ product }: ProductProps) {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      router.delete(route("products.destroy", product.id));
    }
  };
  return (
    <Button variant="link" onClick={handleDelete}>
      <Trash2 size={14} className="text-red-500" />
    </Button>
  );
}
