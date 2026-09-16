# 🚀 PlacePro – Placement Portal

PlacePro is a full-stack Placement Portal that connects students and recruiters on a single platform. Students can browse jobs, apply using their resume link, and track application status, while recruiters can post jobs, review applicants, and shortlist or reject candidates.

 
 
## ✨ Features

### 👨‍🎓 Student
- Register & Login
- Browse available jobs
- Apply to jobs
- Submit Resume Link while applying
- Track application status
- Cannot apply twice for the same job
- Applied jobs are automatically marked as **Applied**

### 👨‍💼 Recruiter
- Register & Login
- Create new jobs
- View posted jobs
- View applicants
- Open candidate resume link
- Shortlist candidates
- Reject candidates

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📂 Project Structure

```
PlacePro
│
├── frontend
│   ├── src
│   ├── pages
│   ├── components
│   ├── services
│   └── ...
│
├── backend
│   ├── config
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── ...
```

---

## 🔐 Authentication

- JWT Authentication
- Protected Routes
- Role Based Access
- Student & Recruiter Login

---

## 📌 Main Functionalities

### Student
- Register
- Login
- View Jobs
- Apply Job
- Resume Link Submission
- View Application Status

### Recruiter
- Login
- Create Job
- Manage Jobs
- View Applicants
- Open Resume Link
- Accept / Reject Candidate

---

## 🗄 Database Collections

### User
```
Name
Email
Password
Role
```

### Job
```
Title
Company
Location
Salary
Description
CreatedBy
```

### Application
```
Student
Job
Resume Link
Status
Applied Date
```

---

 
 

## 👨‍💻 Author

**Nitika**

GitHub: https://github.com/itsNitika

 
