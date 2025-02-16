import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  permissions: {
    data: {
      id: number;
      name: string;
      created_at: string;
    }[];
  };
}

export default function Dashboard({ permissions }: Props) {
  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Dashboard
          </h2>
          <Link className={buttonVariants()} href={route("permissions.create")}>
            Create permission
          </Link>
        </div>
      }
    >
      <Head title="Permission" />

      <div className="mt-8 mb-6 mx-2 bg-gray-50 dark:bg-gray-950 rounded-md p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.data.map((permission) => (
              <TableRow className="" key={permission.id}>
                <TableCell className="font-medium">{permission.name}</TableCell>
                <TableCell>{permission.created_at}</TableCell>
                <TableCell className="flex items-center justify-end gap-4">
                  <Link href={route("permissions.edit", permission.id)}>
                    <Pencil size={14} />
                  </Link>
                  <Link
                    method="delete"
                    as="button"
                    href={route("permissions.destroy", permission)}
                  >
                    <Trash2 size={14} className="text-red-500" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AuthenticatedLayout>
  );
}
