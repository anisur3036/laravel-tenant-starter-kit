import PrimaryButton from "@/components/PrimaryButton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TenantAuthenticatedLayout from "@/Layouts/TenantAuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ExternalLink } from "lucide-react";

interface Props {
  users: {
    data: {
      id: number;
      name: string;
      email: string;
      domain_name: string;
      password: string;
      role: {
        id: number;
        domain: string;
      }[];
    }[];
  };
}

export default function User({ users }: Props) {
  return (
    <TenantAuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Users
          </h2>
          <Button asChild>
            <Link href={route("users.create")}>New user</Link>
          </Button>
        </div>
      }
    >
      <Head title="Users" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.data.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell className="text-right">Edit</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </TenantAuthenticatedLayout>
  );
}
