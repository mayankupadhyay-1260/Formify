import { useState, useEffect } from "react";


export default function FormPreview({
    form,
    setForm,
    selectedField,
    setSelectedField
}) {

    const [answers, setAnswers] = useState(() => {

        const saved = localStorage.getItem("form-builder-answers");

        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {

        localStorage.setItem(
            "form-builder-answers",
            JSON.stringify(answers)
        );

    }, [answers]);


    // Update field
    const updateField = (id, key, value) => {
        setForm(prev => ({
            ...prev,
            fields: prev.fields.map(field =>
                field.id === id
                    ? { ...field, [key]: value }
                    : field
            )
        }));
    };

    // Delete field
    const deleteField = (id) => {
        setForm(prev => ({
            ...prev,
            fields: prev.fields.filter(f => f.id !== id)
        }));
    };

    // Handle input
    const handleChange = (id, value) => {
        setAnswers(prev => ({
            ...prev,
            [id]: value
        }));
    };

    // Handle checkbox
    const handleCheckbox = (id, option) => {
        const prev = answers[id] || [];

        const updated = prev.includes(option)
            ? prev.filter(i => i !== option)
            : [...prev, option];

        setAnswers(a => ({
            ...a,
            [id]: updated
        }));
    };

    // Add new option
    const addOption = (fieldId, options) => {

        const newOptions = [
            ...options,
            `Option ${options.length + 1}`
        ];

        updateField(fieldId, "options", newOptions);
    };

    // Delete option
    const deleteOption = (fieldId, options, index) => {

        const newOptions = options.filter((_, i) => i !== index);

        updateField(fieldId, "options", newOptions);
    };



    return (
        <div className="flex-1 bg-gray-100 p-6 overflow-auto">

            {/* Card */}
            <div className="max-w-2xl mx-auto bg-white shadow rounded-xl p-6">

                {/* Title */}
                <input
                    className="text-2xl font-semibold mb-6 w-full border-b pb-2 outline-none"
                    placeholder="Untitled Form"
                    value={form.title}
                    onChange={(e) =>
                        setForm(prev => ({
                            ...prev,
                            title: e.target.value
                        }))
                    }
                />

                {/* Fields */}
                <div className="space-y-6">

                    {form.fields.map((field) => (

                        <div
                            key={field.id}
                            onClick={() => setSelectedField(field)}
                            className={`p-4 border rounded-lg transition
                ${selectedField?.id === field.id
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200"
                                }`}
                        >

                            {/* Header */}
                            <div className="flex items-center justify-between mb-3 gap-3">

                                {/* Editable Label */}
                                <input
                                    className="font-medium text-gray-800 bg-transparent border-b outline-none flex-1"
                                    value={field.label}
                                    onChange={(e) =>
                                        updateField(field.id, "label", e.target.value)
                                    }
                                />

                                {/* Required */}
                                <label className="flex items-center gap-1 text-sm">

                                    <input
                                        type="checkbox"
                                        checked={field.required}
                                        onChange={(e) =>
                                            updateField(
                                                field.id,
                                                "required",
                                                e.target.checked
                                            )
                                        }
                                    />

                                    Required
                                </label>

                                {/* Delete */}
                                <button
                                    onClick={() => deleteField(field.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    🗑
                                </button>

                            </div>

                            {/* TEXT */}
                            {field.type === "text" && (
                                <input
                                    className="border p-2 rounded w-full"
                                    value={answers[field.id] || ""}
                                    onChange={(e) =>
                                        handleChange(field.id, e.target.value)
                                    }
                                />
                            )}

                            {/* RADIO */}
                            {field.type === "radio" && (
                                <div className="space-y-2">

                                    {field.options.map((opt, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-2 text-sm"
                                        >

                                            <input
                                                type="radio"
                                                name={field.id}
                                                checked={answers[field.id] === opt}
                                                onChange={() =>
                                                    handleChange(field.id, opt)
                                                }
                                            />

                                            <input
                                                className="border-b outline-none bg-transparent flex-1"
                                                value={opt}
                                                onChange={(e) => {

                                                    const newOpts = [...field.options];
                                                    newOpts[i] = e.target.value;

                                                    updateField(
                                                        field.id,
                                                        "options",
                                                        newOpts
                                                    );
                                                }}
                                            />

                                            {/* Delete (except first) */}
                                            {i !== 0 && (
                                                <button
                                                    onClick={() =>
                                                        deleteOption(field.id, field.options, i)
                                                    }
                                                    className="text-red-500 hover:text-red-700 text-sm"
                                                >
                                                    ❌
                                                </button>
                                            )}

                                        </div>
                                    ))}


                                    {/* Add Option */}
                                    <button
                                        onClick={() => addOption(field.id, field.options)}
                                        className="text-blue-600 text-sm hover:underline"
                                    >
                                        + Add Option
                                    </button>

                                </div>
                            )}


                            {/* SELECT */}
                            {field.type === "select" && (
                                <div className="space-y-2">

                                    <select
                                        className="border p-2 rounded w-full"
                                        value={answers[field.id] || ""}
                                        onChange={(e) =>
                                            handleChange(field.id, e.target.value)
                                        }
                                    >
                                        <option value="">Select</option>

                                        {field.options.map((opt, i) => (
                                            <option key={i}>{opt}</option>
                                        ))}
                                    </select>

                                    {field.options.map((opt, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-2"
                                        >

                                            <input
                                                className="border-b w-full outline-none flex-1"
                                                value={opt}
                                                onChange={(e) => {

                                                    const newOpts = [...field.options];
                                                    newOpts[i] = e.target.value;

                                                    updateField(
                                                        field.id,
                                                        "options",
                                                        newOpts
                                                    );
                                                }}
                                            />

                                            {/* Delete (except first) */}
                                            {i !== 0 && (
                                                <button
                                                    onClick={() =>
                                                        deleteOption(field.id, field.options, i)
                                                    }
                                                    className="text-red-500 hover:text-red-700 text-sm"
                                                >
                                                    ❌
                                                </button>
                                            )}

                                        </div>
                                    ))}


                                    {/* Add Option */}
                                    <button
                                        onClick={() => addOption(field.id, field.options)}
                                        className="text-blue-600 text-sm hover:underline"
                                    >
                                        + Add Option
                                    </button>

                                </div>
                            )}


                            {/* CHECKBOX */}
                            {field.type === "checkbox" && (
                                <div className="space-y-2">

                                    {field.options.map((opt, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-2 text-sm"
                                        >

                                            <input
                                                type="checkbox"
                                                checked={
                                                    answers[field.id]?.includes(opt) || false
                                                }
                                                onChange={() =>
                                                    handleCheckbox(field.id, opt)
                                                }
                                            />

                                            <input
                                                className="border-b outline-none bg-transparent flex-1"
                                                value={opt}
                                                onChange={(e) => {

                                                    const newOpts = [...field.options];
                                                    newOpts[i] = e.target.value;

                                                    updateField(
                                                        field.id,
                                                        "options",
                                                        newOpts
                                                    );
                                                }}
                                            />

                                            {/* Delete (except first) */}
                                            {i !== 0 && (
                                                <button
                                                    onClick={() =>
                                                        deleteOption(field.id, field.options, i)
                                                    }
                                                    className="text-red-500 hover:text-red-700 text-sm"
                                                >
                                                    ❌
                                                </button>
                                            )}

                                        </div>
                                    ))}


                                    {/* Add Option */}
                                    <button
                                        onClick={() => addOption(field.id, field.options)}
                                        className="text-blue-600 text-sm hover:underline"
                                    >
                                        + Add Option
                                    </button>

                                </div>
                            )}


                        </div>

                    ))}

                    {/* Empty */}
                    {form.fields.length === 0 && (
                        <div className="text-center text-gray-400 py-10">
                            Add fields from left panel
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}
