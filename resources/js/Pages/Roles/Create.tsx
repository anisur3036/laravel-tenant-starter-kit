import Checkbox from "@/components/Checkbox";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

interface Props {
  permissions: {
    id: number;
    name: string;
  }[];
  roles: string[];
}

export default function Create({ permissions, roles }: Props) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    permissions: [] as string[],
  });

  const handleSelectValue = (value: string) => {
    setData("name", value);
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.value;
    if (e.target.checked) {
      setData("permissions", [...data.permissions, name]);
    } else {
      setData(
        "permissions",
        data.permissions.filter((item) => {
          return item !== name;
        }),
      );
    }
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("roles.store"), {
      onSuccess: () => {
        reset("name");
      },
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Create role
          </h2>
          <Link
            prefetch={true}
            className={buttonVariants()}
            href={route("roles.index")}
          >
            back
          </Link>
        </div>
      }
    >
      <Head title="Create role" />
      <div className="mt-8 mb-6 mx-2  rounded-md p-4">
        <form onSubmit={submit} className="max-w-xl space-y-4">
          <div className="space-y-4">
            <InputLabel htmlFor="name" value="Name" />
            <Select onValueChange={handleSelectValue}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role, index) => (
                  <SelectItem key={index} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <InputError message={errors.name} className="mt-2" />
          </div>
          <div className="flex flex-wrap gap-4">
            {permissions.map((permission, index) => {
              return (
                <label className="flex items-center" key={index}>
                  <Checkbox
                    name="permissions[]"
                    id={`permissions${permission.id}`}
                    value={permission.name}
                    onChange={handleChecked}
                  />
                  <span className="ml-2 text-sm">{permission.name}</span>
                </label>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-start">
            <PrimaryButton disabled={processing}>Create</PrimaryButton>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
