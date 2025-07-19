# 🎓 Placement Management System

A modern, full-stack Placement Management System built with **Next.js**, **Express.js**, **Prisma**, and **PostgreSQL**, designed to streamline campus recruitment. This project also integrates Data Engineering fundamentals by managing relational data pipelines and ensuring scalable student-company interaction.

---

## 🚀 Features

### 👨‍🎓 Student Module
- Student registration & login
- Resume upload
- Apply to available companies
- View application history

### 🏢 Company Module
- Add/edit company details
- List of hiring companies
- View eligible students
- Track applicants per company
  

---

## 🧰 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React.js + Tailwind CSS (via Next.js) |
| Backend | Node.js + Express.js |
| Database | PostgreSQL |
| ORM | Prisma |

---

## 🧪 Data Engineering Integration

- Normalized PostgreSQL schema with foreign keys
- Prisma for efficient query handling
- Modular APIs to track student applications (One-to-Many relationships)
- Analytics-ready data for dashboard charts

---

## 🛠️ How to Run Locally

```bash
# Clone the repo
git clone git@github.com:cheshtapruthi/Placement_System.git
cd Placement_System

# Install dependencies
npm install

# Setup PostgreSQL and .env
cp .env.example .env
# Add your DB connection URL to .env

# Run Prisma migration
npx prisma migrate dev

# Start the server and frontend
npm run dev
