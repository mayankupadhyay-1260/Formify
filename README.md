# 🧩 Dynamic Form Maker (No-Code Form Builder)

A full-stack web application that allows admins to **create, customize, and manage dynamic forms without writing code**, and allows users to **fill and submit forms**, with responses stored securely in a database.

This project was built as a **job application assignment** to demonstrate real-world full-stack development skills, including frontend state management, backend APIs, database design, and debugging.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## 🎯 Core Features (As Required)

### 1. Form Creation & Customization ✅
- No-code form builder interface
- Supports multiple field types:
  - Text Input
  - Dropdown (Select)
  - Radio Buttons
  - Checkboxes
- Add / remove options dynamically
- Mark fields as **required**
- Edit field labels directly
- Real-time form preview
- Form title and slug generation

---

### 2. Form Management (Admin) ✅
- Admin dashboard to manage forms
- Create new forms
- Edit existing forms
- Delete forms
- Save forms to database
- Generate public form links using slugs

---

### 3. User Interaction ✅
- Public form access via unique URL
- Fully dynamic rendering of forms
- Client-side validation for required fields
- Seamless form submission
- Responsive and mobile-friendly UI

---

### 4. Data Storage & Retrieval ✅
- All form structures stored in MongoDB
- All user responses stored in MongoDB
- Responses linked to forms using `formId`
- Timestamped responses
- Backend APIs for retrieving forms and responses

---

## 🧠 What Has Been Accomplished

✔️ End-to-end form lifecycle (create → publish → submit → store)  
✔️ Fully working backend APIs  
✔️ Proper database schema design  
✔️ Clear separation between Admin and User flows  
✔️ Robust debugging and error handling  
✔️ Real-world architecture (not a toy project)

This project demonstrates:
- Full-stack problem solving
- API design
- State persistence
- Handling dynamic data structures
- Debugging production-level issues

---

## ⚠️ Current Limitations (Known & Intentional)

These were intentionally deprioritized to focus on **core functionality**:

- Responses UI in admin panel is basic (data exists and is stored correctly)
- No authentication (admin/user separation is logical, not secured)
- No form duplication feature
- No CSV export of responses
- No analytics or charts
- No advanced theme customization UI (colors/fonts panel)

> These limitations do **not** affect core requirements and can be extended easily.

---

## 🔮 Future Enhancements (Planned Scope)

- Authentication (Admin vs User roles)
- Better admin response viewer (tables & filters)
- CSV / Excel export of responses
- Form duplication
- Drag-and-drop field reordering
- Advanced theme customization
- Form submission limits
- Public response analytics

---

## 🛑 Don’ts / Important Notes

- This project is **not production-secured** (no auth yet)
- Admin routes are currently accessible without login
- Environment variables (dotenv) can be added later for production
- Error handling is basic but functional
- UI polish can be further improved

---

## 🛠️ How to Run Locally

### Backend
```bash
cd server
npm install
npm run dev
