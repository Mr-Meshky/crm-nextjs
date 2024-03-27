import DatePicker from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import persian from "react-date-object/calendars/persian";

import { FormInput } from "../elements/FormInput";
import { ItemList } from "./ItemList";

export const Form = ({ form, setForm }) => {
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  return (
    <>
      <div className="mb-3 flex flex-col gap-3 px-2">
        <FormInput
          name="name"
          label="Name"
          value={form.name}
          required={true}
          onChange={changeHandler}
        />
        <FormInput
          name="lastName"
          label="Last name"
          value={form.lastName}
          required={true}
          onChange={changeHandler}
        />
        <FormInput
          name="email"
          label="Email"
          value={form.email}
          required={true}
          onChange={changeHandler}
        />
        <div className="flex flex-col">
          <label htmlFor="file" className="font-medium">
            Avatar <span className="ordinal text-red-500">*</span>
          </label>
          <input
            onChange={(e) => setForm({ ...form, avatar: e.target.files[0] })}
            id="file"
            className="w-full rounded-lg bg-gray-600 px-3 py-3 text-2xl text-white outline-none ring ring-gray-600 transition duration-300 focus:ring-blue-400"
            type="file"
            accept="image/png, image/jpeg"
          />
        </div>

        <FormInput
          name="phone"
          label="Phone"
          value={form.phone}
          onChange={changeHandler}
        />
        <FormInput
          name="address"
          label="Address"
          value={form.address}
          onChange={changeHandler}
        />
        <FormInput
          name="postalCode"
          label="Postal Code"
          value={form.postalCode}
          onChange={changeHandler}
        />

        <div className="flex flex-col">
          <label htmlFor="date" className="font-medium">
            Date
          </label>
          <DatePicker
            value={form.date}
            onChange={(v) => setForm({ ...form, date: v })}
            animations={[transition({ duration: 800, from: 35 })]}
            calendar={persian}
            inputClass="transition duration-300 w-full outline-none py-3 px-3 text-2xl bg-gray-600 text-white rounded-lg ring ring-gray-600 focus:ring-blue-400"
            id="date"
          />
        </div>
      </div>
      <ItemList form={form} setForm={setForm} />
    </>
  );
};
