# CampusConnect AI — Smart Campus Life Management System

> **Hackathon Problem Statement:** *"How Can Technology Simplify Everyday Campus Life for Students and Administrators?"*

CampusConnect AI is a unified, responsive web application designed to simplify daily campus activities for college students, wardens, and university administrators. By integrating academic attendance tracking, digital gate passes, hostel maintenance ticketing, mess menus, fee breakdowns, mental health counseling, emergency safety SOS, and campus announcements under one roof—guided by an embedded, client-side **AI Campus Assistant with horizontal quick-command chips**—it eliminates paper forms, long queues, and fragmented portals.

Built with **100% vanilla HTML5, CSS3, and JavaScript** (zero external dependencies, zero build tools, zero server requirements), this prototype runs effortlessly in any web browser and operates offline via browser `localStorage`.

---

## 🚀 How to Open and Run the Website Locally

Because this prototype is completely self-contained, there are **NO installations, NO Node.js requirements, and NO database setup needed**.

### Method 1: Immediate Browser Launch (Easiest & Instant)
1. Open File Explorer and navigate to your desktop project folder:  
   `C:\Users\guddy\OneDrive\Desktop\Campus_connect_AI`
2. **Double-click [`login.html`](file:///C:/Users/guddy/OneDrive/Desktop/Campus_connect_AI/login.html)** or **[`index.html`](file:///C:/Users/guddy/OneDrive/Desktop/Campus_connect_AI/index.html)**.
3. The application opens immediately in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

### Method 2: Local HTTP Server (Optional)
If you prefer running through a local web server (e.g., in VS Code or PowerShell):
```powershell
cd C:\Users\guddy\OneDrive\Desktop\Campus_connect_AI
python -m http.server 8000
```
Then visit `http://localhost:8000/login.html` in your browser.

---

## 🔐 Security, Roles & Account Registration System

The application features a secure, client-side **Role-Based Authentication & User Registry System** stored in `localStorage` (`campus_connect_registered_users`).

### 1. Institutional Admin Master Passcode
To prevent unauthorized students from accessing administrative powers or registering as administrators, the system enforces a strict Institutional Master Security Passcode:
```
Institutional Admin Master Passcode: ADMIN@CAMPUS2026
```
This passcode is strictly required:
1. **When Registering as an Administrator**: On [`login.html`](file:///C:/Users/guddy/OneDrive/Desktop/Campus_connect_AI/login.html), selecting "Staff / Admin" reveals a mandatory Institutional Passcode verification box.
2. **When Unlocking the Admin Portal**: Navigating to [`admin.html`](file:///C:/Users/guddy/OneDrive/Desktop/Campus_connect_AI/admin.html) or switching roles triggers an administrator authorization gate requiring `ADMIN@CAMPUS2026`.
3. **Protected User Registry**: Regular students cannot access or view user credentials stored in `localStorage`.

### 2. Default Demo Credentials

| Role | Demo Name | Email / Login ID | Password | Master Passcode | Landing Page |
|---|---|---|---|---|---|
| **Student** | Aarav Sharma | `aarav@campus.edu` | `student123` | *Not Required* | [`index.html`](file:///C:/Users/guddy/OneDrive/Desktop/Campus_connect_AI/index.html) |
| **Administrator** | Dr. Sunita Raman (Dean) | `admin@campus.edu` | `admin123` | `ADMIN@CAMPUS2026` | [`admin.html`](file:///C:/Users/guddy/OneDrive/Desktop/Campus_connect_AI/admin.html) |

*💡 Tip: On [`login.html`](file:///C:/Users/guddy/OneDrive/Desktop/Campus_connect_AI/login.html), clicking either the **Student** or **Administrator** card automatically fills these demo credentials for instant 1-click access during presentations!*

### 3. Creating a New Account (Register Tab)
You can register new student and staff profiles on [`login.html`](file:///C:/Users/guddy/OneDrive/Desktop/Campus_connect_AI/login.html):
1. Click the **"✨ Create Account"** tab.
2. Select your role: **Student** or **Staff / Administrator**.
   - If **Staff / Admin** is chosen, enter the Institutional Security Passcode (`ADMIN@CAMPUS2026`).
3. Fill in Full Name, University Email, Roll No / Staff ID, Department, Hostel / Office, and Password (with 👁️ Show/Hide toggle).
4. Click **"✨ Create Account & Log In"**.
5. The account is permanently stored in browser `localStorage` and automatically launches your personalized dashboard session!

---

## 🌟 Modern Campus Life Features

This prototype specifically addresses real-world college life challenges that traditional university portals ignore:

1. **🧠 Student Mental Health & Confidential Counseling Desk:**
   - 1-click appointment booking with campus psychologists (`Dr. Priya Sen`, `Dr. M. K. Nair`).
   - 100% confidential, private, and free consultation for academic stress, burnout, and anxiety.
2. **🚨 24/7 Campus Emergency SOS Dispatch:**
   - Red flashing **🚨 SOS EMERGENCY** button in top navigation.
   - Instantly records student emergency location, room number, and time to the campus security post with 3-minute rapid response.
3. **🔍 Digital Lost & Found Registry:**
   - Browse recently recovered campus possessions (calculators, water bottles, keys).
   - Submit new lost/found reports directly to Security Post 1.
4. **📊 Interactive Attendance Bunk Simulator:**
   - Subject-by-subject attendance percentages with visual shortage badges (< 75%).
   - Interactive calculator: dynamically calculates how many classes you must attend or can safely miss while maintaining 75% eligibility.
5. **🍲 Smart Mess Menus & Canteen:**
   - 7-day weekly menu across breakfast, lunch, snacks, and dinner.
   - Clock-aware active meal highlighting based on current system time.
   - Live food hygiene feedback form for mess supervisor reviews.
6. **🚪 Digital Gate Pass with QR/Barcode:**
   - Online approval workflow for Day Gate Passes and Weekend Hostel Leaves.
   - Generates digital security outpost pass slips with printable barcodes for gate scanning.
7. **🔧 Hostel Maintenance Ticketing:**
   - Submit repair tickets for plumbing, electricity, Wi-Fi, carpentry, and cleanliness.
   - Real-time ticket tracking (`Pending`, `In Progress`, `Resolved`) with technician remarks.
8. **💳 Fee Ledger & Printable E-Receipts:**
   - Clear financial breakdown of tuition, hostel, and mess dues.
   - One-click printable PDF e-receipts and accounts dispute resolution desk.
9. **🔒 Admin LocalStorage User Registry:**
   - Inside `admin.html`, an encrypted user table displays all registered accounts with masked passwords, role badges, status toggles (Active/Suspend), and JSON export.

---

## 🤖 AI Campus Assistant with Horizontal Command Bar

The floating AI Assistant widget (`🤖 Ask Campus AI`) is accessible across all 15 pages and runs **100% offline without API keys**.

### Visibly Displayed Horizontal Command Line Chips
Right under the chat header, the assistant displays a horizontally scrollable row of quick action chips (`.ai-chips-line-wrapper`):
- `📊 /attendance` — Real-time attendance percentage and shortage alerts.
- `🍲 /menu` — Today's mess breakfast, lunch, snacks, and dinner menu.
- `🚪 /gatepass` — Day pass rules, night leaves, and gate curfew guidelines.
- `🔧 /repairs` — Hostel maintenance ticket status and technician notes.
- `💳 /fees` — Pending semester fee balances and due dates.
- `📢 /notices` — Official campus circulars, exam dates, and hackathons.
- `🧠 /counselor` — Student wellness center hours and psychologist booking.
- `🚨 /sos` — Emergency security dispatch protocol and phone extensions.
- `🔍 /lostfound` — Recently recovered campus items and recovery desk.
- `🚌 /shuttle` — Night campus shuttle bus schedule, routes, and escort services.
- `📶 /wifi` — Campus Eduroam/Wi-Fi connection guide and credentials.
- `📚 /library` — Central library stack timings and 24/7 reading hall rules.
- `🏥 /clinic` — Campus health center doctor OPD hours and ambulance contacts.

---

## 📁 Exactly 15 Files Architecture Breakdown

All 15 required files are located in the project root:

| # | File Name | Role & Purpose |
|---|---|---|
| 1 | [`index.html`](file:///C:/Users/guddy/OneDrive/Desktop/Campus_connect_AI/index.html) | **Student Dashboard:** Personalized student banner, attendance gauge, today's schedule, pending gate passes, active complaints, SOS trigger, and counseling booking. |
| 2 | [`style.css`](file:///C:/Users/guddy/OneDrive/Desktop/Campus_connect_AI/style.css) | **Shared University Stylesheet:** Professional Oxford navy & electric blue theme, responsive sidebar drawer, stats cards, tables, badges, password toggles, and AI chip lines. |
| 3 | [`script.js`](file:///C:/Users/guddy/OneDrive/Desktop/Campus_connect_AI/script.js) | **App Controller:** Navigation state, role switching with admin password verification, emergency SOS dispatcher (`triggerCampusSOS()`), toast notification system, and modal handlers. |
| 4 | [`data.js`](file:///C:/Users/guddy/OneDrive/Desktop/Campus_connect_AI/data.js) | **Persistent Data Store:** Browser `localStorage` engine containing sample data, Master Admin Passcode (`ADMIN@CAMPUS2026`), user registry, attendance, timetable, requests, complaints, menus, fees, notices, SOS alerts, and counseling bookings. |
| 5 | [`login.html`](file:///C:/Users/guddy/OneDrive/Desktop/Campus_connect_AI/login.html) | **Authentication & Registration:** Dual-tab interface (Sign In vs Create Account), 1-click demo role switcher, password eye toggle, and Institutional Admin Passcode security gate. |
| 6 | [`attendance.html`](file:///C:/Users/guddy/OneDrive/Desktop/Campus_connect_AI/attendance.html) | **Attendance Ledger & Bunk Simulator:** Subject-by-subject attendance percentages, shortage alerts (< 75%), interactive attendance projector/simulator, and admin editor. |
| 7 | [`timetable.html`](file:///C:/Users/guddy/OneDrive/Desktop/Campus_connect_AI/timetable.html) | **Weekly Academic Schedule:** Day-wise schedule tabs (Monday–Saturday), course code and faculty search filtering, lab vs lecture tags, and admin slot adder. |
| 8 | [`requests.html`](file:///C:/Users/guddy/OneDrive/Desktop/Campus_connect_AI/requests.html) | **Gate Pass & Leave Portal:** Form for Day Gate Passes, Overnight Hostel Leaves, Medical/Mental Health Leaves, and Certificates with automated Reference ID and printable digital passes. |
| 9 | [`hostel.html`](file:///C:/Users/guddy/OneDrive/Desktop/Campus_connect_AI/hostel.html) | **Hostel Maintenance Desk:** Lodges complaints for Wi-Fi, plumbing, electrical, and carpentry issues with Ticket IDs (`TKT-XXXX`), live status badges, and technician remarks. |
| 10 | [`mess-canteen.html`](file:///C:/Users/guddy/OneDrive/Desktop/Campus_connect_AI/mess-canteen.html) | **Mess Menus & Canteen Catalog:** 7-day breakfast, lunch, snacks, and dinner menus with clock-aware active meal highlighting, canteen price catalog, and student food hygiene feedback. |
| 11 | [`fees.html`](file:///C:/Users/guddy/OneDrive/Desktop/Campus_connect_AI/fees.html) | **Fee Ledger & E-Receipt:** Semester fee ledger (tuition, hostel, mess, exam fee), pending balance alert, printable fee receipt modal, and accounts query desk. |
| 12 | [`notices.html`](file:///C:/Users/guddy/OneDrive/Desktop/Campus_connect_AI/notices.html) | **Campus Circulars Board:** Categorized circulars (Academic, Exams, Events, Hostel, Emergency) with real-time text searching and admin notice broadcast publisher. |
| 13 | [`admin.html`](file:///C:/Users/guddy/OneDrive/Desktop/Campus_connect_AI/admin.html) | **Administrator Command Center:** Master passcode lock gate, one-click leave approvals/rejections, hostel maintenance dispatch, Protected User Registry tab (`localStorage`), Emergency SOS desk, and attendance editor. |
| 14 | [`ai-assistant.js`](file:///C:/Users/guddy/OneDrive/Desktop/Campus_connect_AI/ai-assistant.js) | **AI Campus Life Assistant:** Embedded floating widget across all pages featuring the visible horizontal command chips bar and rule-based query engine for instant answers and deep-links. |
| 15 | [`README.md`](file:///C:/Users/guddy/OneDrive/Desktop/Campus_connect_AI/README.md) | **Documentation:** Comprehensive guide, security passcodes, presentation walkthrough, file breakdown, and Netlify deployment instructions. |

---

## 🎯 Hackathon Judge Walkthrough (3-Minute Presentation Script)

1. **Step 1: Sign in as Student (`login.html` → `index.html`)**
   - Open `login.html` and click the **Student** card. It automatically fills `aarav@campus.edu` and logs in.
   - Show the dashboard: Overall attendance is **84.5%**, today's schedule has 4 classes, and hostel room is **B-204**.
2. **Step 2: Demonstrate the Attendance Simulator (`attendance.html`)**
   - Point out *Discrete Mathematics* (73.3% - below 75%).
   - In the interactive simulator, show: *"If I attend the next 3 classes, my projected attendance jumps to 76.5% (Safe)!"*
3. **Step 3: Submit a Gate Pass Request (`requests.html`)**
   - Submit a "Day Gate Pass" for a medical consultation with return curfew 08:30 PM.
   - Show the newly generated reference ID (`REQ-2026-XXXX`) marked as **Pending**.
4. **Step 4: Switch to Admin Portal & Passcode Verification (`admin.html`)**
   - Click "Switch to Admin" in the top bar. Enter Master Admin Passcode: `ADMIN@CAMPUS2026`.
   - In the **Leave & Gate Passes** tab, locate the newly submitted request and click **✓ Approve**.
5. **Step 5: Verify Live Synchronization & Digital Pass**
   - Return to `requests.html`. The status is immediately updated to **Approved**.
   - Click **"📱 View Pass"** to display the official digital campus gate pass with QR/Barcode.
6. **Step 6: Show Protected User Registry & Storage (`admin.html`)**
   - In `admin.html`, switch to the **"🔒 User Registry & LocalStorage"** tab.
   - Show how administrators can view all registered accounts, toggle passwords with the 👁️ audit button, and suspend or activate accounts. Regular students cannot see this!
7. **Step 7: Test Modern Campus Features (SOS & Counseling)**
   - Click the red **🚨 SOS EMERGENCY** button to show instant security dispatch.
   - Open the **🧠 Mental Health & Counselor** modal on `index.html` to book a confidential consultation with Dr. Priya Sen.
8. **Step 8: Interact with the AI Campus Assistant (`ai-assistant.js`)**
   - Open the floating assistant. Click the command chips on the horizontal line:
     - Click **`🍲 /menu`** → Displays today's meal schedule.
     - Click **`🧠 /counselor`** → Shows psychologist contacts and booking link.
     - Click **`🚨 /sos`** → Shows emergency protocol and control room numbers.

---

## ⚠️ Prototype Scope & Production Considerations

For complete transparency during hackathon evaluation:
1. **Client-Side Storage vs Cloud Database:** Data is persisted in browser `localStorage`. Changes persist across refreshes on the same device. In a production rollout, this integrates with PostgreSQL/Firebase.
2. **Client-Side Security Gate:** Role switching and admin creation enforce the Master Passcode (`ADMIN@CAMPUS2026`) via frontend logic for demonstration simplicity.
3. **Financial Payments:** Real banking payment gateways (Razorpay, Stripe) are deliberately simulated; students view itemized ledgers and generate digital receipts.
4. **Rule-Based AI Assistant:** The assistant uses an offline keyword and rule interpreter matching against live local records, guaranteeing zero API costs, zero network lag, and 100% offline availability.

---

## 🌐 Steps to Deploy on Netlify

Deploying this prototype to Netlify takes under 1 minute with zero configuration.

### Option A: Netlify Drop (Fastest — 30 Seconds, No CLI)
1. Open [https://app.netlify.com/drop](https://app.netlify.com/drop) in your web browser.
2. Log in or create a free Netlify account.
3. Drag and drop the folder **`C:\Users\guddy\OneDrive\Desktop\Campus_connect_AI`** into the upload area on Netlify.
4. Netlify will immediately publish the site and provide a live production URL (e.g., `https://campusconnect-ai.netlify.app`).

### Option B: Netlify CLI
1. Open PowerShell in the project directory:
   ```powershell
   cd C:\Users\guddy\OneDrive\Desktop\Campus_connect_AI
   npm install -g netlify-cli
   netlify deploy --prod --dir=.
   ```
2. Follow the one-time browser login prompt; Netlify will deploy the site and print your live URL.
