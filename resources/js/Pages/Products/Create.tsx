import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import { buttonVariants } from "@/components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ChangeEvent, FormEventHandler, useState } from "react";

export default function Create() {
  const { data, setData, post, processing, progress, errors, reset } = useForm({
    name: "",
    purchase_price: 0,
    selling_price: 0,
    stock: 1,
    barcode: "",
    img: null,
    description: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("products.store"), {
      onSuccess: () => {
        reset("name");
      },
    });
  };

  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files?.[0] || null;
    if (img) {
      // @ts-ignore
      setData("img", img);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(img);
    } else {
      setData("img", null);
      setPreview(null);
    }
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Create product
          </h2>
          <Link
            prefetch={true}
            className={buttonVariants()}
            href={route("products.index")}
          >
            back
          </Link>
        </div>
      }
    >
      <Head title="Create user" />
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

          <div>
            <InputLabel htmlFor="purchase_price" value="Purchase price" />

            <TextInput
              type="number"
              id="purchase_price"
              name="purchase_price"
              value={data.purchase_price}
              className="mt-1 block w-full"
              onChange={(e) =>
                setData("purchase_price", Number(e.target.value))
              }
              required
            />

            <InputError message={errors.purchase_price} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="selling_price" value="Sell price" />

            <TextInput
              type="number"
              id="selling_price"
              name="selling_price"
              value={data.selling_price}
              className="mt-1 block w-full"
              onChange={(e) => setData("selling_price", Number(e.target.value))}
            />

            <InputError message={errors.purchase_price} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="stock" value="Stock" />

            <TextInput
              type="number"
              id="stock"
              name="stock"
              value={data.stock}
              className="mt-1 block w-full"
              onChange={(e) => setData("stock", Number(e.target.value))}
            />

            <InputError message={errors.purchase_price} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="barcode" value="Barcode" />

            <TextInput
              id="barcode"
              name="barcode"
              value={data.barcode}
              className="mt-1 block w-full"
              onChange={(e) => setData("barcode", e.target.value)}
            />

            <InputError message={errors.purchase_price} className="mt-2" />
          </div>

          {preview && (
            <img
              className="text-center"
              src={preview}
              alt="Image Preview"
              style={{ width: "150px", height: "150px" }}
            />
          )}

          <div>
            <InputLabel htmlFor="img" value="Image" />

            <TextInput
              type="file"
              accept="image/*"
              className="w-full px-4 py-2"
              name="img"
              onChange={handleImageChange}
            />
            <InputError message={errors.purchase_price} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="description" value="Description" />

            <TextInput
              id="description"
              name="description"
              value={data.description}
              className="mt-1 block w-full"
              onChange={(e) => setData("description", e.target.value)}
            />

            <InputError message={errors.purchase_price} className="mt-2" />
          </div>

          {progress && (
            <progress value={progress.percentage} max="100">
              {progress.percentage}%
            </progress>
          )}

          <div className="mt-4 flex items-center justify-start">
            <PrimaryButton disabled={processing}>Create product</PrimaryButton>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
