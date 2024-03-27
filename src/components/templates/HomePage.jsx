import { Card } from "../modules/Card";

export const HomePage = ({ customers }) => {
  return (
    <div className="mt-8 flex flex-col gap-3 px-6 md:px-0">
      {customers.map((customer) => (
        <Card key={customer._id} customer={customer} />
      ))}
    </div>
  );
};
