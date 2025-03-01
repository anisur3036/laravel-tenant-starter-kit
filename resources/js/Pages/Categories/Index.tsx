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
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

interface Props {
  categories: {
    data: {
      id: number;
      thumb_image: string;
      name: string;
      slug: string;
      description: string;
      user: { id: number; name: string };
      created_at: string;
    }[];
    meta: {
      links: { url: string; label: string; active: boolean }[];
    };
  };
}

export default function Index({ categories }: Props) {
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
            Category
          </h2>
          <Link
            prefetch={true}
            className={buttonVariants()}
            href={route("categories.create")}
          >
            Create category
          </Link>
        </div>
      }
    >
      <Head title="Category" />
      <ToastContainer />

      <div className="mt-8 mb-6 mx-2 rounded-md p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="size-14">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created by</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.data.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <img src={category.thumb_image} alt={category.name} />
                </TableCell>
                <TableCell>
                  <p>{category.name}</p>
                  <p>{category.slug}</p>
                </TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>{category.user.name}</TableCell>
                <TableCell>{category.created_at}</TableCell>
                <TableCell className="flex items-center justify-end gap-2">
                  <Link
                    prefetch={true}
                    className={cn(buttonVariants({ variant: "link" }))}
                    href={route("users.edit", category.id)}
                  >
                    <Pencil size={14} />
                  </Link>
                  <DeleteProduct category={category} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className=" mt-4 flex justify-end">
          <PaginationComponent links={categories.meta.links} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

interface ProductProps {
  category: { id: number; name: string };
}

function DeleteProduct({ category }: ProductProps) {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      router.delete(route("products.destroy", category.id));
    }
  };
  return (
    <Button variant="link" onClick={handleDelete}>
      <Trash2 size={14} className="text-red-500" />
    </Button>
  );
}
