# 🚀 TVS Credit – OneView Platform

A unified **loan management platform** built with **Next.js (App Router)** and **Prisma ORM**.  
TVS Credit – OneView allows **customers** and **dealers** to seamlessly apply, track, and manage loan applications in real-time.  

---

## 📖 Overview
TVS Credit – OneView provides a **single digital platform** for customers and dealers:  

- 👤 **Customers** can register, log in, apply for loans, track their application status, and manage profiles.  
- 🏪 **Dealers** can assist customers by creating applications, uploading pending documents, handling EMI payments, and offering new products.  

This ensures transparency, faster loan processing, and a better customer experience.  

---

## ✨ Features
- 🔑 **Authentication** for customers & dealers  
- 📊 **Customer Dashboard** – track loan applications, raise tickets, view performance reports  
- 🏪 **Dealer Dashboard** – customer lookup, dealer kiosk, new applications, pending applications  
- 💳 **Payments Integration** (Stripe)  
- 📄 **Application Status Tracking**  
- 🎨 **Modern UI** using TailwindCSS  
- ⚡ **Full-Stack with Next.js App Router + Prisma + PostgreSQL**  

---

## 🛠 Tech Stack
- **Frontend:** Next.js (App Router), React, TailwindCSS  
- **Backend:** Next.js API routes  
- **ORM:** Prisma  
- **Database:** PostgreSQL  
- **Payments:** Stripe  
- **Language:** TypeScript  

---

## ⚙️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/D-Atharv/TVS_CREDIT.git
cd TVS_CREDIT
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/tvs_credit"
```

> ⚠️ Replace placeholders with actual credentials.  

### 4. Run Prisma Migrations
```bash
npx prisma migrate dev
```

### 5. Start the Development Server
```bash
npm run dev
```

Server will be live at 👉 [http://localhost:3000](http://localhost:3000)  

---

## 🚀 Usage
### Customer Flow
1. Register/Login as **Customer**  
2. Apply for loan & upload documents  
3. Track application status in dashboard  
4. Raise support tickets if needed  

### Dealer Flow
1. Login as **Dealer**  
2. Lookup customers / create new applications  
3. Upload pending documents  
4. Collect EMI payments via Stripe  
5. Manage pending applications & offer new products  

--- 

1. Fork this repo  
2. Create a branch (`git checkout -b feature-branch`)  
3. Commit changes (`git commit -m 'Added feature'`)  
4. Push branch (`git push origin feature-branch`)  
5. Open a Pull Request  

---

## 📄 License
This project is licensed under the **MIT License**.  

---
