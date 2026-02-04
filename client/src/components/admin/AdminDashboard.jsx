import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function AdminDashboard() {

    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch forms
    useEffect(() => {

        fetch("http://localhost:3000/api/forms")
            .then(res => res.json())
            .then(data => {
                setForms(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });

    }, []);

    // Delete form
    const deleteForm = async (id) => {

        if (!confirm("Delete this form?")) return;

        await fetch(`http://localhost:3000/api/forms/${id}`, {
            method: "DELETE",
        });

        setForms(prev => prev.filter(f => f._id !== id));
    };

    if (loading) {
        return <div className="p-10">Loading...</div>;
    }

    return (
        <div className="p-10 bg-gray-100 min-h-screen">

            <h1 className="text-2xl font-bold mb-6">
                Admin Dashboard
            </h1>

            {forms.length === 0 && (
                <p className="text-gray-500">
                    No forms found.
                </p>
            )}

            <div className="grid gap-4">

                {forms.map(form => (

                    <div
                        key={form._id}
                        className="bg-white p-4 rounded shadow flex justify-between items-center"
                    >

                        <div>

                            <h3 className="font-semibold">
                                {form.title || "Untitled Form"}
                            </h3>

                            {form.slug && (
                                <p className="text-sm text-gray-500">
                                    /form/{form.slug}
                                </p>
                            )}

                        </div>

                        <div className="flex gap-2">

                            {/* Public Form */}
                            <Link
                                to={`/form/${form.slug}`}
                                target="_blank"
                                className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                            >
                                Open Form
                            </Link>

                            {/* Responses */}
                            <Link
                                to={`/admin/forms/${form._id}/responses`}
                                className="px-3 py-1 bg-purple-600 text-white rounded text-sm"
                            >
                                Responses
                            </Link>

                            {/* Edit */}
                            <Link
                                to="/"
                                className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                            >
                                Edit
                            </Link>

                            {/* Delete */}
                            <button
                                onClick={() => deleteForm(form._id)}
                                className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                            >
                                Delete
                            </button>

                        </div>


                    </div>

                ))}

            </div>

        </div>
    );
}
