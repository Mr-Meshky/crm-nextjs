import { FormInput } from "../elements/FormInput";

export const ItemList = ({ form, setForm }) => {
  const { products } = form;

  const addHandler = () => {
    setForm({
      ...form,
      products: [...products, { name: "", price: "", qty: "" }],
    });
  };

  const onChange = (e, index) => {
    const { id, value } = e.target;
    const newProduct = [...products];
    newProduct[index][id] = value;
    setForm({ ...form, product: newProduct });
  };

  const removeHandler = (index) => {
    products.splice(index + 1, 1);
    setForm({ ...form, products });
  };

  return (
    <div className="rounded border-2 p-3">
      <p className="mb-4 text-xl font-bold">Purchased products</p>

      {products.map((item, index) => (
        <ProductItem
          key={index}
          product={item}
          onChange={(e) => onChange(e, index)}
          removeHandler={() => removeHandler(item)}
        />
      ))}
      <button
        onClick={addHandler}
        className="mt-6 w-full rounded-lg border-2 border-green-500 py-3 text-xl font-semibold text-green-500 transition duration-300 hover:bg-green-500 hover:text-white"
      >
        Add product
      </button>
    </div>
  );
};

function ProductItem({ product, onChange, removeHandler }) {
  return (
    <div className="mb-4 rounded border-2 p-3">
      <FormInput
        name="name"
        label="Product name"
        value={product.name}
        onChange={onChange}
      />
      <div className="mt-2 flex flex-col flex-wrap gap-2 md:flex-row md:justify-between">
        <FormInput
          name="price"
          label="Price"
          value={product.price}
          onChange={onChange}
        />
        <FormInput
          name="qty"
          label="Qty"
          type="number"
          value={product.qty}
          onChange={onChange}
        />
      </div>
      <button
        onClick={removeHandler}
        className="mt-6 w-full rounded-lg border-2 border-red-500 py-3 text-xl font-semibold text-red-500 transition duration-300 hover:bg-red-500 hover:text-white"
      >
        Remove
      </button>
    </div>
  );
}
