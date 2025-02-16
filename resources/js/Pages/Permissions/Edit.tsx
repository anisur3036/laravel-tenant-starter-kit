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
  permission: {
    id: number;
    name: string;
  };
}

export default function Edit({ permission }: Props) {
  const { data, setData, put, processing, errors, reset } = useForm({
    name: permission.name || "",
  });

  const notify = () => toast("Permission updated!");

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("permissions.update", permission), {
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
            Update permission
          </h2>
          <Link className={buttonVariants()} href={route("permissions.index")}>
            back
          </Link>
        </div>
      }
    >
      <Head title="Create permission" />
      <ToastContainer />
      <div className="mt-8 mb-6 mx-2 bg-gray-50 dark:bg-gray-950 rounded-md p-4">
        <form onSubmit={submit} className="max-w-xl space-y-4">
          <div>
            <InputLabel htmlFor="name" value="Your name" />

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

          <div className="mt-4 flex items-center justify-start">
            <PrimaryButton disabled={processing}>Save changes</PrimaryButton>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
