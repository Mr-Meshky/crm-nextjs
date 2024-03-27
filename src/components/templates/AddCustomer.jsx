import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState } from "react";

import { Form } from "../modules/Form";
import { Backdrop } from "../modules/Backdrop";

export const AddCustomer = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    avatar: "/assets/defualt.png",
    phone: "",
    address: "",
    postalCode: "",
    date: "",
    products: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const cancelHandler = () => {
    router.push("/");
  };

  const saveHandler = async () => {
    if (!form.name || !form.lastName || !form.email || !form.avatar) {
      toast.error("Please fill in the mandatory fields");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("avatar", form.avatar);
    formData.append("name", form.name);
    formData.append("lastName", form.lastName);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("address", form.address);
    formData.append("postalCode", form.postalCode);
    formData.append("date", form.date);
    formData.append("products", JSON.stringify(form.products));
    try {
      const res = await axios.post("/api/customer", formData);
      setIsLoading(false);
      router.push("/");
    } catch (error) {
      setIsLoading(false);
      toast.error("Fill in the mandatory fields");
    }
  };

  return (
    <div className="mt-2 border-t-2 px-2 md:px-0">
      {isLoading && <Backdrop />}
      <h4 className="m-auto mt-8 w-fit text-2xl font-bold">Add new Customer</h4>
      <Form form={form} setForm={setForm} />
      <div className="mt-7 flex justify-between">
        <button
          className="rounded border-2 border-red-500 px-4 py-2 font-bold text-red-500 transition duration-300 hover:bg-red-500 hover:text-white"
          onClick={cancelHandler}
        >
          Cancel
        </button>
        <button
          className="rounded border-2 border-green-500 px-4 py-2 font-bold text-green-500 transition duration-300 hover:bg-green-500 hover:text-white"
          onClick={saveHandler}
        >
          Save
        </button>
      </div>
    </div>
  );
};
