import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicForm from "./components/public/PublicForm";
import SimpleForm from "./components/public/SimpleForm";
import FormResponses from "./components/admin/FormResponses";



import Builder from "./components/builder/Builder";
import AdminDashboard from "./components/admin/AdminDashboard";

import "./index.css";

function App() {
  return (

    <BrowserRouter>

      <Routes>

        {/* Form Builder */}
        <Route path="/" element={<Builder />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin/forms"
          element={<AdminDashboard />}
        />

        <Route
          path="/form/:slug"
          element={<PublicForm />}
        />

        <Route
          path="/simple-form"
          element={<SimpleForm />}
        />

        <Route
          path="/admin/forms/:id/responses"
          element={<FormResponses />}
        />



      </Routes>

    </BrowserRouter>

  );
}

export default App;
