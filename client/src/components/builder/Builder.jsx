import { useEffect, useState } from "react";

import FieldToolbox from "./FieldToolbox";
import FormPreview from "./FormPreview";

export default function Builder() {

    // Load from localStorage
    const [form, setForm] = useState(() => {

        const saved = localStorage.getItem("form-builder-data");

        return saved
            ? JSON.parse(saved)
            : {
                title: "",
                fields: [],
                theme: {}
            };
    });

    const [selectedField, setSelectedField] = useState(null);

    // Save to localStorage on change
    useEffect(() => {

        localStorage.setItem(
            "form-builder-data",
            JSON.stringify(form)
        );

    }, [form]);

    // Generate URL-friendly slug from title
    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-");
    };

    const saveForm = async () => {

        const slug = generateSlug(form.title || "untitled-form");

        const formToSave = {
            ...form,
            slug,
        };

        console.log("Sending:", formToSave);

        try {

            const res = await fetch("http://localhost:3000/api/forms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formToSave),
            });

            const data = await res.json();

            console.log("Response:", data);

            if (!res.ok) {
                throw new Error(data.message);
            }

            const updatedForm = {
                ...form,
                _id: data._id,
                slug: data.slug,
            };

            setForm(updatedForm);

            localStorage.setItem(
                "form-builder-data",
                JSON.stringify(updatedForm)
            );

            alert("Form Saved!");

        } catch (err) {

            console.error(err);
            alert("Save Failed");

        }
    };




    return (
        <div className="h-screen flex flex-col">
            {/* Top Bar */}
            <div className="bg-white border-b p-3 flex justify-between items-center">

                <h2 className="font-semibold">Formify</h2>

                <button
                    onClick={saveForm}
                    className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                    Save Form
                </button>

            </div>

            <div className="flex flex-1">

                <FieldToolbox
                    form={form}
                    setForm={setForm}
                />

                <FormPreview
                    form={form}
                    setForm={setForm}
                    selectedField={selectedField}
                    setSelectedField={setSelectedField}
                />

                {/* Right Panel */}
                <div className="w-1/5 bg-white border-l p-4 space-y-4">

                    <h3 className="font-semibold">Admin Panel</h3>

                    {/* New Form */}
                    <button
                        onClick={() => {
                            setForm({
                                title: "",
                                fields: [],
                                theme: {}
                            });

                            localStorage.removeItem("form-builder-data");
                        }}
                        className="w-full bg-gray-200 p-2 rounded"
                    >
                        + New Form
                    </button>

                    {/* Public Link */}
                    {form.slug && (
                        <div>

                            <p className="text-sm mb-1">Public Link</p>

                            <input
                                readOnly
                                value={`http://localhost:5173/form/${form.slug}`}
                                className="border p-1 w-full text-xs"
                            />

                        </div>
                    )}


                </div>

            </div>
        </div>
    );
}
