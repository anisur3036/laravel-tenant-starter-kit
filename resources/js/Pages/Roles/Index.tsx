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
  roles: {
    data: {
      id: number;
      name: string;
      permissions: string;
      created_at: string;
    }[];
  };
}

export default function Dashboard({ roles }: Props) {
  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Roles
          </h2>
          <Link className={buttonVariants()} href={route("roles.create")}>
            Create role
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
              <TableHead>Permissions</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.data.map((role) => (
              <TableRow className="" key={role.id}>
                <TableCell className="font-medium">{role.name}</TableCell>
                <TableCell>{role.permissions}</TableCell>
                <TableCell>{role.created_at}</TableCell>
                <TableCell className="flex items-center justify-end gap-4">
                  <Link href={route("roles.edit", role.id)}>
                    <Pencil size={14} />
                  </Link>
                  <Link
                    method="delete"
                    as="button"
                    href={route("roles.destroy", role)}
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
