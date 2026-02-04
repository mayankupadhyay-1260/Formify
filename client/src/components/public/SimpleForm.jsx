import { useState, useEffect } from "react";

export default function SimpleForm() {
    const [form, setForm] = useState(null);
    const [name, setName] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        console.log("SimpleForm: Loading form with slug: titled");
        
        fetch("http://localhost:3000/api/forms/slug/titled")
            .then(res => {
                console.log("SimpleForm: Response status:", res.status);
                return res.json();
            })
            .then(data => {
                console.log("SimpleForm: Form loaded:", data);
                setForm(data);
            })
            .catch(err => {
                console.error("SimpleForm: Error loading form:", err);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log("SimpleForm: Submit clicked");
        console.log("SimpleForm: Form:", form);
        console.log("SimpleForm: Name value:", name);
        
        if (!form) {
            alert("Form not loaded");
            return;
        }
        
        if (!name.trim()) {
            alert("Please enter a name");
            return;
        }
        
        setSubmitting(true);
        
        const payload = {
            formId: form._id,
            answers: {
                [form.fields[0].id]: name
            }
        };
        
        console.log("SimpleForm: Sending payload:", payload);
        
        try {
            const response = await fetch("http://localhost:3000/api/responses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            
            console.log("SimpleForm: Response status:", response.status);
            
            const data = await response.json();
            console.log("SimpleForm: Response data:", data);
            
            if (response.ok) {
                alert("Success! Response saved.");
                setName("");
            } else {
                alert("Error: " + data.message);
            }
            
        } catch (error) {
            console.error("SimpleForm: Submit error:", error);
            alert("Submit failed: " + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (!form) {
        return <div className="p-10">Loading form...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-6">{form.title}</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">
                            {form.fields[0].label}
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border p-2 w-full rounded"
                            placeholder="Enter your name"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={submitting}
                        className={`w-full py-2 rounded text-white ${
                            submitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {submitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
}