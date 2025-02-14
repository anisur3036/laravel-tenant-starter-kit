import PrimaryButton from "@/components/PrimaryButton";
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
import { ExternalLink } from "lucide-react";

interface Props {
  tenants: {
    id: number;
    name: string;
    email: string;
    domain_name: string;
    password: string;
    domains: {
      id: number;
      domain: string;
    }[];
  }[];
}

export default function Dashboard({ tenants }: Props) {
  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Dashboard
          </h2>
          <PrimaryButton>
            <Link href={route("tenants.create")}>Create tanent</Link>
          </PrimaryButton>
        </div>
      }
    >
      <Head title="Tenant" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Domain name</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenants.map((tenant) => (
                    <TableRow key={tenant.id}>
                      <TableCell className="font-medium">
                        {tenant.name}
                      </TableCell>
                      <TableCell>{tenant.email}</TableCell>
                      <TableCell>
                        {tenant.domains.map((t) => (
                          <a
                            key={t.id}
                            className="flex items-center gap-2"
                            href={`http://${t.domain}:8000`}
                            target="_blank"
                          >
                            {`${t.domain}:8000`}
                            <ExternalLink size={12} />
                          </a>
                        ))}
                      </TableCell>
                      <TableCell className="text-right">Delete</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
