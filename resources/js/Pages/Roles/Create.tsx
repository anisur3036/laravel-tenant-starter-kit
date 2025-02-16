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
  permissions: {
    name: string;
  }[];
}

export default function Create({ permissions }: Props) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    permissions: [] as string[],
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

    post(route("roles.store"), {
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
            Create role
          </h2>
          <Link className={buttonVariants()} href={route("roles.index")}>
            back
          </Link>
        </div>
      }
    >
      <Head title="Create role" />
      <ToastContainer />

      <div className="mt-8 mb-6 mx-2 bg-gray-50 dark:bg-gray-950 rounded-md p-4">
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
