export default function FieldEditor({
  form,
  setForm,
  selectedField,
  setSelectedField
}) {

  if (!selectedField) {
    return (
      <div className="w-1/4 bg-white border-l shadow-sm p-5 text-gray-500">
        Select a field to edit
      </div>
    );
  }

  // Update field helper
  const updateField = (key, value) => {
    setForm(prev => ({
      ...prev,
      fields: prev.fields.map(field =>
        field.id === selectedField.id
          ? { ...field, [key]: value }
          : field
      )
    }));

    setSelectedField(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Update option
  const updateOption = (index, value) => {
    const newOptions = [...selectedField.options];
    newOptions[index] = value;

    updateField("options", newOptions);
  };

  // Add option
  const addOption = () => {
    updateField("options", [
      ...selectedField.options,
      `Option ${selectedField.options.length + 1}`
    ]);
  };

  // Delete field
  const deleteField = () => {
    setForm(prev => ({
      ...prev,
      fields: prev.fields.filter(
        field => field.id !== selectedField.id
      )
    }));

    setSelectedField(null);
  };

  return (
    <div className="w-1/4 bg-white border-l shadow-sm p-5 flex flex-col justify-between">

      {/* Top */}
      <div className="space-y-6">

        <h2 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
          ⚙️ Field Settings
        </h2>

        {/* Label */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Label
          </label>

          <input
            className="border rounded-md p-2 w-full mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
            value={selectedField.label}
            onChange={(e) =>
              updateField("label", e.target.value)
            }
          />
        </div>

        {/* Required */}
        <div className="flex items-center justify-between">

          <span className="text-sm text-gray-700">
            Required
          </span>

          <input
            type="checkbox"
            checked={selectedField.required}
            onChange={(e) =>
              updateField("required", e.target.checked)
            }
            className="w-4 h-4"
          />
        </div>

        {/* Options */}
        {selectedField.type !== "text" && (

          <div>

            <p className="text-sm font-medium text-gray-600 mb-2">
              Options
            </p>

            <div className="bg-gray-50 p-3 rounded-lg space-y-2">

              {selectedField.options.map((opt, i) => (
                <input
                  key={i}
                  className="border rounded-md p-2 w-full"
                  value={opt}
                  onChange={(e) =>
                    updateOption(i, e.target.value)
                  }
                />
              ))}

              <button
                onClick={addOption}
                className="text-blue-600 text-sm mt-1 hover:underline"
              >
                + Add Option
              </button>

            </div>

          </div>
        )}

      </div>

      {/* Bottom */}
      <button
        onClick={deleteField}
        className="w-full bg-red-50 text-red-600 border border-red-200 py-2 rounded-md hover:bg-red-100 transition"
      >
        🗑 Delete Field
      </button>

    </div>
  );
}
