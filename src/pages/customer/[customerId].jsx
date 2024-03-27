import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Backdrop } from "@/components/modules/Backdrop";
import { CustomerDetails } from "@/components/templates/CustomerDetails";

function Index() {
  const [data, setData] = useState(null);
  const [isLoadig, setIsLoadig] = useState(true);
  const {
    query: { customerId },
    isReady,
  } = useRouter();

  useEffect(() => {
    if (!isReady) return;
    axios
      .get(`/api/customer/${customerId}`)
      .then((res) => res.data.data)
      .then((data) => {
        setIsLoadig(false);
        setData({ ...data, products: JSON.parse(data.products) });
      });
  }, [isReady]);

  return isLoadig ? (
    <Backdrop />
  ) : (
    <CustomerDetails data={data} setIsLoadig={setIsLoadig} />
  );
}

export default Index;
