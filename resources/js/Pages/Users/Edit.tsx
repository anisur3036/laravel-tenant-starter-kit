import Checkbox from "@/components/Checkbox";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import { buttonVariants } from "@/components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

interface Props {
  user: { id: number; name: string; email: string };
  roles: { id: number; name: string }[];
  hasRole: string[];
}

export default function Edit({ user, roles, hasRole }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: user.name || "",
    roles: hasRole,
  });

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.value;
    if (e.target.checked) {
      setData("roles", [...data.roles, name]);
    } else {
      setData(
        "roles",
        data.roles.filter((item) => {
          return item !== name;
        }),
      );
    }
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("users.update", user));
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Update user
          </h2>
          <Link
            prefetch={true}
            className={buttonVariants()}
            href={route("users.index")}
          >
            back
          </Link>
        </div>
      }
    >
      <Head title="Update user" />
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

          <div className="flex flex-wrap gap-4 mt-4">
            {roles.map((role, index) => {
              return (
                <label className="flex items-center" key={index}>
                  <Checkbox
                    checked={data.roles.includes(role.name)}
                    name="roles[]"
                    id={`roles${role.name}`}
                    value={role.name}
                    onChange={handleChecked}
                  />
                  <span className="ml-2 text-sm">{role.name}</span>
                </label>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-start">
            <PrimaryButton disabled={processing}>Save changes</PrimaryButton>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
