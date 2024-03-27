export const FormInput = ({
  name,
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  required = false,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-medium">
        {label} {required && <span className="ordinal text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={name}
        className="rounded-lg bg-gray-600 px-3 py-3 text-2xl text-white outline-none ring ring-gray-600 transition duration-300 focus:ring-blue-400"
      />
    </div>
  );
};
