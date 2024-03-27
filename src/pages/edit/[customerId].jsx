import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { CustomerEditPage } from "@/components/templates/CustomerEditPage";
import { Backdrop } from "@/components/modules/Backdrop";

function Customer() {
  const {
    query: { customerId },
    isReady,
  } = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!isReady) return;
    const fetchData = async () => {
      const res = await axios.get(`/api/customer/${customerId}`);
      setData(res.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, [isReady]);

  return (
    <>
      {isLoading ? (
        <Backdrop />
      ) : (
        <CustomerEditPage data={data} id={customerId} />
      )}
    </>
  );
}

export default Customer;
