import { nanoid } from "nanoid";

export default function FieldToolbox({ form, setForm }) {

  const addField = (type) => {

    const newField = {
      id: nanoid(),
      type,
      label: "Untitled Question",
      required: false,
      options: type === "text" ? [] : ["Option 1"],
    };

    setForm(prev => ({
      ...prev,
      fields: [...prev.fields, newField]
    }));
  };

  return (
    <div className="w-1/5 border-r p-4">

      <h2 className="font-bold mb-4">
        Add Field
      </h2>

      <div className="space-y-2">

        <button
          onClick={() => addField("text")}
          className="w-full bg-gray-200 p-2 rounded"
        >
          Text
        </button>

        <button
          onClick={() => addField("radio")}
          className="w-full bg-gray-200 p-2 rounded"
        >
          Radio
        </button>

        <button
          onClick={() => addField("select")}
          className="w-full bg-gray-200 p-2 rounded"
        >
          Dropdown
        </button>

        <button
          onClick={() => addField("checkbox")}
          className="w-full bg-gray-200 p-2 rounded"
        >
          Checkbox
        </button>

      </div>
    </div>
  );
}
