import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";

export const CustomerDetails = ({ data, setIsLoadig }) => {
  const router = useRouter();

  const deleteHandler = async () => {
    setIsLoadig(true);
    const res = await axios.delete(`/api/customer/delete/${data._id}`);
    router.push("/");
  };

  return (
    <div>
      <h4 className="m-auto mt-10 w-fit text-3xl font-bold">
        Customers Details
      </h4>

      <div className="mx-7 mt-20 rounded-lg bg-slate-800 p-5 text-white shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col flex-wrap gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-blue-400">Name: </span>
              <p>{data.name}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-blue-400">Last name: </span>
              <p>{data.lastName}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-blue-400">Email: </span>
              <p>{data.email}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-blue-400">Phone: </span>
              <p>{data.phone || "---"}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-blue-400">Address: </span>
              <p>{data.address || "---"}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-blue-400">Postal Code: </span>
              <p>{data.postalcode || "---"}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-blue-400">Date: </span>
              <p>
                {data.date
                  ? moment(data.date).utc().format("YYYY-MM-DD")
                  : "---"}
              </p>
            </div>
          </div>
          {!!data.products.length && (
            <table
              className="border-collapse text-center *:border-2"
              cellPadding="6px"
            >
              <thead>
                <tr className="border-collapse text-center *:border-2">
                  <th className="w-32">Name</th>
                  <th className="w-32">Price</th>
                  <th className="w-32">Qty</th>
                </tr>
              </thead>
              <tbody className="border-collapse text-center *:border-2">
                {data.products.map((product, index) => (
                  <tr
                    key={index}
                    className="border-collapse text-center *:border-2"
                  >
                    <td>{product?.name || "---"}</td>
                    <td>{product?.price || "---"}</td>
                    <td>{product?.qty || "---"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={deleteHandler}
            className="rounded border-2 border-red-500 px-4 py-2 font-bold text-red-500 transition duration-300 hover:bg-red-500 hover:text-white"
          >
            Delete
          </button>
          <p className="text-xl font-bold text-yellow-400">Edit or Delete?</p>
          <Link
            href={`/edit/${data._id}`}
            className="rounded border-2 border-green-500 px-4 py-2 font-bold text-green-500 transition duration-300 hover:bg-green-500 hover:text-white"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};
