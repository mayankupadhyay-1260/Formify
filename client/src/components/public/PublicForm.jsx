import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PublicForm() {

    const { slug } = useParams();

    const [form, setForm] = useState(null);
    const [answers, setAnswers] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {

        console.log("PublicForm: Loading form with slug:", slug);

        fetch(`http://localhost:3000/api/forms/slug/${slug}`)
            .then(res => {
                console.log("PublicForm: Form fetch response status:", res.status);
                return res.json();
            })
            .then(data => {
                console.log("PublicForm: Form data received:", data);
                setForm(data);
            })
            .catch(err => {
                console.error("PublicForm: Form fetch error:", err);
            });

    }, [slug]);

    const handleChange = (id, value) => {
        setAnswers(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("PublicForm: Form submission started");
        console.log("PublicForm: Current form:", form);
        console.log("PublicForm: Current answers:", answers);

        if (submitting) {
            console.log("PublicForm: Already submitting, ignoring");
            return;
        }

        if (!form || !form._id) {
            console.error("PublicForm: Form not loaded");
            alert("Form not loaded");
            return;
        }

        if (Object.keys(answers).length === 0) {
            console.error("PublicForm: No answers provided");
            alert("Please fill at least one field");
            return;
        }

        const payload = {
            formId: form._id,
            answers,
        };

        console.log("FRONTEND SENDING:", payload);

        setSubmitting(true);

        try {
            const res = await fetch("http://localhost:3000/api/responses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
            });

            console.log("FRONTEND: Response status:", res.status);
            const data = await res.json();

            console.log("FRONTEND RECEIVED:", data);

            if (!res.ok) {
                throw new Error(data.message || "Failed");
            }

            alert("Submitted successfully!");
            console.log("PublicForm: Submission successful");

            // Clear answers
            setAnswers({});

        } catch (err) {

            console.error("SUBMIT ERROR:", err);
            alert(err.message || "Submit failed");

        } finally {
            setSubmitting(false);
            console.log("PublicForm: Submission process completed");
        }
    };



    if (!form) {
        return <div className="p-10">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto bg-white p-6 rounded shadow"
            >


                <h1 className="text-2xl font-bold mb-6">
                    {form.title}
                </h1>

                {form.fields.map(field => (

                    <div key={field.id} className="mb-4">

                        <label className="block font-medium mb-1">
                            {field.label}
                            {field.required && " *"}
                        </label>

                        {field.type === "text" && (
                            <input
                                required={field.required}
                                className="border p-2 w-full rounded"
                                value={answers[field.id] || ""}
                                onChange={(e) =>
                                    handleChange(field.id, e.target.value)
                                }
                            />
                        )}

                        {field.type === "select" && (
                            <select
                                required={field.required}
                                className="border p-2 w-full rounded"
                                value={answers[field.id] || ""}
                                onChange={(e) =>
                                    handleChange(field.id, e.target.value)
                                }
                            >
                                <option value="">Select</option>

                                {field.options.map((opt, i) => (
                                    <option key={i} value={opt}>{opt}</option>
                                ))}

                            </select>
                        )}

                        {field.type === "radio" && (
                            field.options.map((opt, i) => (
                                <label
                                    key={i}
                                    className="block text-sm"
                                >
                                    <input
                                        type="radio"
                                        name={field.id}
                                        value={opt}
                                        checked={answers[field.id] === opt}
                                        required={field.required}
                                        onChange={() =>
                                            handleChange(field.id, opt)
                                        }
                                    />{" "}
                                    {opt}
                                </label>
                            ))
                        )}

                        {field.type === "checkbox" && (
                            field.options.map((opt, i) => (
                                <label
                                    key={i}
                                    className="block text-sm"
                                >
                                    <input
                                        type="checkbox"
                                        checked={(answers[field.id] || []).includes(opt)}
                                        onChange={(e) => {

                                            setAnswers(prev => {

                                                const arr = prev[field.id] || [];

                                                return {
                                                    ...prev,
                                                    [field.id]: e.target.checked
                                                        ? [...arr, opt]
                                                        : arr.filter(x => x !== opt),
                                                };
                                            });

                                        }}
                                    />{" "}
                                    {opt}
                                </label>
                            ))
                        )}

                    </div>

                ))}

                <button
                    type="submit"
                    className={`w-full py-2 rounded ${submitting ? 'bg-gray-400' : 'bg-blue-600'} text-white`}
                    disabled={submitting}
                >
                    {submitting ? 'Submitting...' : 'Submit'}
                </button>


            </form>

        </div>
    );
}
