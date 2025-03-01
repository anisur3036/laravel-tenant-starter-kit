import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ChangeEvent, FormEventHandler, useState } from "react";

export default function Create({ parent_categoris }) {
  const { data, setData, post, processing, progress, errors, reset } = useForm({
    name: "",
    slug: "",
    description: "",
    serial: 0,
    photo: null,
    status: 0,
    parent_id: 0,
  });

  console.log(parent_categoris);

  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files?.[0] || null;
    if (img) {
      // @ts-ignore
      setData("photo", img);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(img);
    } else {
      setData("photo", null);
      setPreview(null);
    }
  };

  const handleCategorySelectedValue = (value: string) => {
    setData("parent_id", Number(value));
  };

  const handleSelectValue = (value: string) => {
    setData("status", Number(value));
  };

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;
    setData("name", newValue);
    newValue = newValue.toLowerCase();
    newValue = newValue.replaceAll(" ", "-");

    setData("slug", newValue); // Copy immediately
  };

  const handleSlugInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData("slug", event.target.value);
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("categories.store"), {
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
            Create category
          </h2>
          <Link
            prefetch={true}
            className={buttonVariants()}
            href={route("categories.index")}
          >
            back
          </Link>
        </div>
      }
    >
      <Head title="Create user" />
      <div className="mt-8 mb-6 mx-2 rounded-md p-4">
        <form onSubmit={submit}>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Create category</CardTitle>
              <CardDescription>
                Create a category for your products.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                  <div className="mb-4">
                    <InputLabel htmlFor="parent_id" value="Parent category" />
                    <Select onValueChange={handleCategorySelectedValue}>
                      <SelectTrigger id="parent_id" className="mt-1 w-full">
                        <SelectValue placeholder="Select parent category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Parent category</SelectLabel>
                          {parent_categoris.data.map((item, index) => (
                            <SelectItem value={String(item.id)} key={index}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <InputError message={errors.parent_id} className="mt-2" />
                  </div>

                  <div className="mb-4">
                    <InputLabel htmlFor="name" value="Name" />

                    <Input
                      id="name"
                      name="name"
                      value={data.name}
                      className="mt-1 block w-full"
                      autoComplete="name"
                      onChange={handleNameInput}
                      required
                    />

                    <InputError message={errors.name} className="mt-2" />
                  </div>

                  <div className="mb-4">
                    <InputLabel htmlFor="slug" value="Slug" />

                    <Input
                      id="slug"
                      name="slug"
                      value={data.slug}
                      className="mt-1 block w-full"
                      onChange={handleSlugInput}
                      required
                    />

                    <InputError message={errors.slug} className="mt-2" />
                  </div>

                  <div className="mb-4">
                    <InputLabel htmlFor="description" value="Description" />

                    <Input
                      id="description"
                      name="description"
                      value={data.description}
                      className="mt-1 block w-full"
                      onChange={(e) => setData("description", e.target.value)}
                      required
                    />

                    <InputError message={errors.description} className="mt-2" />
                  </div>
                </div>

                <div className="col-span-1">
                  <div className="mb-4">
                    <InputLabel htmlFor="serial" value="Serial" />

                    <Input
                      id="serial"
                      name="serial"
                      value={data.serial}
                      type="number"
                      className="mt-1 block w-full"
                      onChange={(e) =>
                        setData("serial", Number(e.target.value))
                      }
                      required
                    />

                    <InputError message={errors.serial} className="mt-2" />
                  </div>
                  {preview && (
                    <img
                      className="text-center"
                      src={preview}
                      alt="Image Preview"
                      style={{ width: "150px", height: "150px" }}
                    />
                  )}
                  <div className="mb-4">
                    <InputLabel htmlFor="photo" value="Photo" />

                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      className="mt-1 w-full px-4 py-2"
                      name="photo"
                      onChange={handleImageChange}
                    />
                    <InputError message={errors.photo} className="mt-2" />
                  </div>

                  <div className="mb-4 md:mb-0">
                    <InputLabel htmlFor="status" value="Status" />
                    <Select onValueChange={handleSelectValue}>
                      <SelectTrigger id="status" className="mt-1 w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select status</SelectLabel>
                          <SelectItem value="1">Active</SelectItem>
                          <SelectItem value="0">Inactive</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <InputError message={errors.status} className="mt-2" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Create</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
