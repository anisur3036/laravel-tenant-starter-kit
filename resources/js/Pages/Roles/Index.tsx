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
  roles: {
    data: {
      id: number;
      name: string;
      permissions: string;
      created_at: string;
    }[];
  };
}

export default function Index({ roles }: Props) {
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
            Roles
          </h2>
          <Link
            prefetch={true}
            className={buttonVariants()}
            href={route("roles.create")}
          >
            Create role
          </Link>
        </div>
      }
    >
      <Head title="Roles" />
      <ToastContainer />

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
                  <DeleteRole role={role} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AuthenticatedLayout>
  );
}

interface RoleProps {
  role: { id: number; name: string };
}

function DeleteRole({ role }: RoleProps) {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this permission?")) {
      router.delete(route("roles.destroy", role.id));
    }
  };
  return (
    <Button variant="link" onClick={handleDelete}>
      <Trash2 size={14} className="text-red-500" />
    </Button>
  );
}
