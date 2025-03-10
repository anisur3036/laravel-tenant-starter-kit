import Checkbox from "@/components/Checkbox";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import { buttonVariants } from "@/components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { ToastContainer, toast } from "react-toastify";

interface Props {
  role: {
    id: number;
    name: string;
  };
  hasPermissions: string[];
  permissions: {
    id: number;
    name: string;
  }[];
}

export default function Edit({ role, hasPermissions, permissions }: Props) {
  const { data, setData, put, processing, errors, reset } = useForm({
    name: role.name || "",
    permissions: hasPermissions,
  });

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

  const notify = () => toast("Role created!");

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("roles.update", role), {
      onSuccess: () => {
        notify();
        reset("name");
      },
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Update role
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
      <Head title="Update role" />
      <ToastContainer />

      <div className="mt-8 mb-6 mx-2  rounded-md p-4">
        <form onSubmit={submit} className="max-w-xl space-y-4">
          <div>
            <InputLabel htmlFor="name" value="Name" />

            <TextInput
              id="name"
              name="name"
              value={data.name}
              className="mt-1 block w-full"
              autoComplete="name"
              isFocused={true}
              onChange={(e) => setData("name", e.target.value)}
              required
            />

            <InputError message={errors.name} className="mt-2" />
          </div>
          <div className="flex flex-wrap gap-4">
            {permissions.map((permission, index) => {
              return (
                <label className="flex items-center" key={index}>
                  <Checkbox
                    checked={data.permissions.includes(permission.name)}
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
