import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { DeleteIcon } from "@/icons/DeleteIcon";
import { EditIcon } from "@/icons/EditIcon";
import { EyeIcon } from "@/icons/EyeIcon";

export const Card = ({ customer }) => {
  const router = useRouter();
  const removeHandler = async () => {
    const res = await axios.delete(`/api/customer/delete/${customer._id}`);
    const { data } = await res;
    if (data.status === "success") router.reload();
  };

  return (
    <div className="flex items-center justify-between rounded-md bg-gray-700 p-3 text-white transition duration-300 hover:shadow-xl">
      <div className="flex items-center gap-3">
        <Image
          src={customer.avatar}
          width={100}
          height={100}
          alt={customer.name}
          className="h-16 w-16 rounded-full border-2 border-black"
        />{" "}
        <span>
          <h3 className="text-lg font-semibold  md:text-xl">
            {customer.name} {customer.lastName}
          </h3>
          <p className="text-sm text-gray-300">{customer.email}</p>
        </span>
      </div>
      <div className="flex gap-3 text-lg text-gray-300">
        <button
          onClick={removeHandler}
          className="transition duration-300 hover:scale-125"
        >
          <DeleteIcon className="text-red-500" />
        </button>
        <Link
          href={`/edit/${customer._id}`}
          className="transition duration-300 hover:scale-125"
        >
          <EditIcon />
        </Link>
        <Link
          href={`/customer/${customer._id}`}
          className="transition duration-300 hover:scale-125"
        >
          <EyeIcon />
        </Link>
      </div>
    </div>
  );
};
