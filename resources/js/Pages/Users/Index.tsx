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
  users: {
    data: {
      id: number;
      name: string;
      email: string;
      created_at: string;
    }[];
  };
}

export default function Dashboard({ users }: Props) {
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
            Users
          </h2>
          <Link className={buttonVariants()} href={route("users.create")}>
            Create user
          </Link>
        </div>
      }
    >
      <Head title="Permission" />
      <ToastContainer />

      <div className="mt-8 mb-6 mx-2 bg-gray-50 dark:bg-gray-950 rounded-md p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.data.map((user) => (
              <TableRow className="" key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.created_at}</TableCell>
                <TableCell className="flex items-center justify-end gap-4">
                  <Link href={route("users.edit", user.id)}>
                    <Pencil size={14} />
                  </Link>
                  <DeleteUser user={user} />
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
  user: { id: number; name: string; email: string };
}

function DeleteUser({ user }: RoleProps) {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this user?")) {
      router.delete(route("roles.destroy", user.id));
    }
  };
  return (
    <Button variant="link" onClick={handleDelete}>
      <Trash2 size={14} className="text-red-500" />
    </Button>
  );
}
