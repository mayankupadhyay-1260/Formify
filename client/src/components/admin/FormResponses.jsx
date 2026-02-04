import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FormResponses() {

  const { id } = useParams();

  const [responses, setResponses] = useState([]);
  const [form, setForm] = useState(null);

  useEffect(() => {

    // Fetch form
    fetch(`http://localhost:3000/api/forms/${id}`)
      .then(res => res.json())
      .then(data => setForm(data));

    // Fetch responses
    fetch(`http://localhost:3000/api/responses/${id}`)
      .then(res => res.json())
      .then(data => setResponses(data));

  }, [id]);

  if (!form) {
    return <div className="p-10">Loading...</div>;
  }

  // Map fieldId → label
  const fieldMap = {};

  form.fields.forEach(f => {
    fieldMap[f.id] = f.label;
  });

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        Responses — {form.title}
      </h1>

      {responses.length === 0 && (
        <p className="text-gray-500">
          No responses yet.
        </p>
      )}

      {responses.map((res, index) => (

        <div
          key={res._id}
          className="bg-white p-4 mb-4 rounded shadow"
        >

          <h3 className="font-semibold mb-2">
            Response #{index + 1}
          </h3>

          {Object.entries(res.answers).map(
            ([fieldId, value]) => (

              <div key={fieldId} className="mb-1 text-sm">

                <span className="font-medium">
                  {fieldMap[fieldId] || fieldId}:
                </span>{" "}

                {Array.isArray(value)
                  ? value.join(", ")
                  : value}

              </div>

            )
          )}

        </div>

      ))}

    </div>
  );
}
