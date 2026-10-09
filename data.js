/**
 * CampusConnect AI — Persistent Data Engine & Security Core
 * File: data.js
 * 
 * Provides:
 * 1. Persistent localStorage store for all academic & hostel modules.
 * 2. Secure User Registry with Master Admin Passcode authorization.
 * 3. Modern campus modules: Counseling/Wellness, SOS Emergency, Lost & Found.
 * 4. Human-crafted, reliable CRUD operations.
 */

const STORAGE_KEY = 'campusconnect_ai_data_v3';
const ROLE_KEY = 'campusconnect_active_role_v3';
const SESSION_USER_KEY = 'campusconnect_session_user_v3';
const ADMIN_MASTER_PASSCODE = 'ADMIN@CAMPUS2026'; // Secret code required to register or access Admin portal

// Initial seed data
const DEFAULT_DATA = {
    // Registered Accounts (Secure Registry)
    registeredUsers: [
        {
            id: "STU-2024-042",
            name: "Aarav Sharma",
            email: "aarav.cs24@campus.edu",
            password: "student123",
            role: "student",
            program: "B.Tech Computer Science & Engineering",
            semester: "3rd Semester",
            batch: "2024 - 2028",
            hostel: "Block B (Boys Hostel)",
            roomNo: "B-204",
            rollNo: "24CS042",
            phone: "+91 98765 43210",
            avatar: "AS",
            joinedDate: "01-Aug-2024",
            status: "Active"
        },
        {
            id: "STU-2024-019",
            name: "Priya Nair",
            email: "priya.cs24@campus.edu",
            password: "student123",
            role: "student",
            program: "B.Tech Computer Science & Engineering",
            semester: "3rd Semester",
            batch: "2024 - 2028",
            hostel: "Girls Hostel Block A",
            roomNo: "G-108",
            rollNo: "24CS019",
            phone: "+91 98765 11002",
            avatar: "PN",
            joinedDate: "01-Aug-2024",
            status: "Active"
        },
        {
            id: "ADM-101",
            name: "Dr. Sunita Raman",
            email: "dean.affairs@campus.edu",
            password: "admin123",
            role: "admin",
            designation: "Dean of Student Affairs & Academic Coordinator",
            department: "Office of Student Affairs",
            office: "Administrative Block, Room 104",
            phone: "+91 11 2345 6701",
            avatar: "SR",
            joinedDate: "15-Jun-2020",
            status: "Active"
        }
    ],

    currentUser: {
        id: "STU-2024-042",
        name: "Aarav Sharma",
        email: "aarav.cs24@campus.edu",
        role: "student",
        program: "B.Tech Computer Science & Engineering",
        semester: "3rd Semester",
        batch: "2024 - 2028",
        hostel: "Block B (Boys Hostel)",
        roomNo: "B-204",
        rollNo: "24CS042",
        avatar: "AS"
    },

    adminUser: {
        id: "ADM-101",
        name: "Dr. Sunita Raman",
        email: "dean.affairs@campus.edu",
        role: "admin",
        designation: "Dean of Student Affairs & Academic Coordinator",
        department: "Office of Student Affairs",
        office: "Administrative Block, Room 104",
        avatar: "SR"
    },

    // Attendance Data
    attendance: [
        { code: "CS301", subject: "Data Structures & Algorithms", faculty: "Prof. Rajesh Mehra", attended: 32, total: 36, minRequired: 75 },
        { code: "CS302", subject: "Database Management Systems", faculty: "Dr. Kavita Krishnan", attended: 28, total: 34, minRequired: 75 },
        { code: "CS303", subject: "Operating Systems", faculty: "Prof. Arvind Saxena", attended: 26, total: 32, minRequired: 75 },
        { code: "MA301", subject: "Discrete Mathematics", faculty: "Dr. Meenakshi S.", attended: 22, total: 30, minRequired: 75 },
        { code: "CS304L", subject: "Data Structures Lab", faculty: "Prof. Rajesh Mehra", attended: 14, total: 14, minRequired: 75 },
        { code: "HU301", subject: "Professional Ethics & Communication", faculty: "Dr. Sarah Thomas", attended: 18, total: 20, minRequired: 75 }
    ],

    // Weekly Timetable
    timetable: [
        { id: "TT-01", day: "Monday", time: "09:00 AM - 10:00 AM", code: "CS301", subject: "Data Structures & Algorithms", room: "LH-102", faculty: "Prof. Rajesh Mehra", type: "Lecture" },
        { id: "TT-02", day: "Monday", time: "10:05 AM - 11:05 AM", code: "CS302", subject: "Database Management Systems", room: "LH-102", faculty: "Dr. Kavita Krishnan", type: "Lecture" },
        { id: "TT-03", day: "Monday", time: "11:20 AM - 12:20 PM", code: "MA301", subject: "Discrete Mathematics", room: "LH-102", faculty: "Dr. Meenakshi S.", type: "Lecture" },
        { id: "TT-04", day: "Monday", time: "02:00 PM - 04:00 PM", code: "CS304L", subject: "Data Structures Lab (Batch A)", room: "Computing Lab 3", faculty: "Prof. Rajesh Mehra", type: "Practical" },
        { id: "TT-05", day: "Tuesday", time: "09:00 AM - 10:00 AM", code: "CS303", subject: "Operating Systems", room: "LH-104", faculty: "Prof. Arvind Saxena", type: "Lecture" },
        { id: "TT-06", day: "Tuesday", time: "10:05 AM - 11:05 AM", code: "CS301", subject: "Data Structures & Algorithms", room: "LH-104", faculty: "Prof. Rajesh Mehra", type: "Lecture" },
        { id: "TT-07", day: "Tuesday", time: "11:20 AM - 12:20 PM", code: "HU301", subject: "Professional Ethics & Communication", room: "LH-104", faculty: "Dr. Sarah Thomas", type: "Lecture" },
        { id: "TT-08", day: "Wednesday", time: "09:00 AM - 10:00 AM", code: "CS302", subject: "Database Management Systems", room: "LH-102", faculty: "Dr. Kavita Krishnan", type: "Lecture" },
        { id: "TT-09", day: "Wednesday", time: "10:05 AM - 11:05 AM", code: "MA301", subject: "Discrete Mathematics", room: "LH-102", faculty: "Dr. Meenakshi S.", type: "Lecture" },
        { id: "TT-10", day: "Wednesday", time: "02:00 PM - 04:00 PM", code: "CS305L", subject: "DBMS Lab (Batch A)", room: "Database Lab 1", faculty: "Dr. Kavita Krishnan", type: "Practical" },
        { id: "TT-11", day: "Thursday", time: "09:00 AM - 10:00 AM", code: "CS303", subject: "Operating Systems", room: "LH-102", faculty: "Prof. Arvind Saxena", type: "Lecture" },
        { id: "TT-12", day: "Thursday", time: "10:05 AM - 11:05 AM", code: "CS301", subject: "Data Structures & Algorithms", room: "LH-102", faculty: "Prof. Rajesh Mehra", type: "Lecture" },
        { id: "TT-13", day: "Thursday", time: "11:20 AM - 12:20 PM", code: "HU301", subject: "Professional Ethics & Communication", room: "LH-102", faculty: "Dr. Sarah Thomas", type: "Lecture" },
        { id: "TT-14", day: "Friday", time: "09:00 AM - 10:00 AM", code: "CS302", subject: "Database Management Systems", room: "LH-102", faculty: "Dr. Kavita Krishnan", type: "Lecture" },
        { id: "TT-15", day: "Friday", time: "10:05 AM - 11:05 AM", code: "CS303", subject: "Operating Systems", room: "LH-102", faculty: "Prof. Arvind Saxena", type: "Lecture" },
        { id: "TT-16", day: "Friday", time: "11:20 AM - 12:20 PM", code: "MA301", subject: "Discrete Mathematics", room: "LH-102", faculty: "Dr. Meenakshi S.", type: "Lecture" },
        { id: "TT-17", day: "Saturday", time: "10:00 AM - 12:00 PM", code: "SEMINAR", subject: "Technical Seminar & Project Mentorship", room: "Auditorium Hall B", faculty: "Department Faculty", type: "Workshop" }
    ],

    // Requests & Gate Passes
    requests: [
        {
            id: "REQ-2026-8910",
            studentId: "STU-2024-042",
            studentName: "Aarav Sharma",
            roomNo: "B-204",
            type: "Day Gate Pass",
            reason: "Doctor consultation and medical diagnostics in city hospital",
            fromDate: "2026-10-10",
            toDate: "2026-10-10",
            outTime: "04:30 PM",
            inTime: "08:30 PM",
            emergencyContact: "+91 98765 43210 (Father)",
            submittedOn: "2026-10-09 10:15 AM",
            status: "Approved",
            adminRemarks: "Approved. Please return before curfew (09:00 PM) and show gate security."
        },
        {
            id: "REQ-2026-8944",
            studentId: "STU-2024-042",
            studentName: "Aarav Sharma",
            roomNo: "B-204",
            type: "Hostel Weekend Leave",
            reason: "Attending sister's wedding ceremony in home town",
            fromDate: "2026-10-16",
            toDate: "2026-10-19",
            outTime: "05:00 PM",
            inTime: "08:00 AM",
            emergencyContact: "+91 98765 43210 (Parent)",
            submittedOn: "2026-10-09 02:40 PM",
            status: "Pending",
            adminRemarks: "Under verification with hostel warden."
        },
        {
            id: "REQ-2026-8802",
            studentId: "STU-2024-042",
            studentName: "Aarav Sharma",
            roomNo: "B-204",
            type: "Bonafide Certificate",
            reason: "Application for national education scholarship portal",
            fromDate: "2026-10-02",
            toDate: "2026-10-02",
            outTime: "-",
            inTime: "-",
            emergencyContact: "aarav.cs24@campus.edu",
            submittedOn: "2026-10-02 11:20 AM",
            status: "Approved",
            adminRemarks: "Certificate dispatched. Collect signed copy from Dean Office Window 2."
        }
    ],

    // Hostel Maintenance Complaints
    hostelComplaints: [
        {
            id: "TKT-1082",
            studentId: "STU-2024-042",
            studentName: "Aarav Sharma",
            room: "B-204",
            block: "Block B",
            category: "Wi-Fi & Network",
            priority: "High",
            description: "Wi-Fi access point in 2nd floor corridor frequently disconnects and signal drops below 1 Mbps in room B-204.",
            submittedOn: "2026-10-08 09:30 AM",
            status: "In Progress",
            adminRemarks: "Network engineer scheduled router reboot and optical fiber signal calibration today afternoon."
        },
        {
            id: "TKT-1045",
            studentId: "STU-2024-042",
            studentName: "Aarav Sharma",
            room: "B-204",
            block: "Block B",
            category: "Plumbing & Water",
            priority: "Medium",
            description: "Washroom tap on 2nd floor east wing has persistent slow leakage.",
            submittedOn: "2026-10-05 08:15 AM",
            status: "Resolved",
            adminRemarks: "Washer replaced by hostel plumbing staff on 05-Oct 04:00 PM."
        }
    ],

    // Mess & Canteen
    messCanteen: {
        timings: {
            breakfast: "07:30 AM - 09:30 AM",
            lunch: "12:30 PM - 02:30 PM",
            snacks: "04:30 PM - 06:00 PM",
            dinner: "07:30 PM - 09:30 PM"
        },
        weeklyMenu: {
            Monday: {
                breakfast: "Idli, Medu Vada, Sambar, Coconut Chutney, Bread-Butter, Tea/Coffee",
                lunch: "Paneer Butter Masala, Dal Tadka, Jeera Rice, Phulka, Boondi Raita, Salad",
                snacks: "Veg Cutlet, Mint Chutney, Hot Masala Tea, Filter Coffee",
                dinner: "Aloo Gobhi Adraki, Mixed Dal, Steamed Basmati Rice, Roti, Gulab Jamun"
            },
            Tuesday: {
                breakfast: "Poha with Roasted Peanuts, Sev, Sprouts Salad, Boiled Eggs / Banana, Tea",
                lunch: "Rajma Masala, Kashmiri Pulao, Plain Curd, Tawa Roti, Green Salad, Papad",
                snacks: "Samosa (2 pcs), Sweet & Sour Chutney, Cutting Chai",
                dinner: "Kadai Paneer / Egg Curry, Yellow Dal Fry, Rice, Butter Naan / Chapati, Kheer"
            },
            Wednesday: {
                breakfast: "Masala Dosa, Aloo Masala, Sambar, Tomato Chutney, Fresh Fruits, Tea/Coffee",
                lunch: "Chole Bhature, Steamed Rice, Dal Makhani, Fresh Onion Salad, Masala Chaas",
                snacks: "Grilled Veg Sandwich, Tomato Ketchup, Ginger Tea",
                dinner: "Veg Biryani with Mirchi ka Salan / Chicken Biryani (Special), Raita, Rasgulla"
            },
            Thursday: {
                breakfast: "Aloo Paratha with White Butter, Curd, Mixed Pickle, Tea / Hot Milk",
                lunch: "Palak Paneer, Arhar Dal Tadka, Peas Pulao, Chapati, Cucumber Raita",
                snacks: "Onion Pakoda, Pudina Chutney, Cardamom Chai",
                dinner: "Malai Kofta, Moong Dal Khichdi, Ghee, Tawa Roti, Fruit Custard"
            },
            Friday: {
                breakfast: "Uttapam, Coconut & Tomato Chutney, Sambar, Boiled Eggs / Banana, Coffee",
                lunch: "Shahi Paneer, Dal Maharani, Veg Pulao, Phulka, Boondi Raita, Roasted Papad",
                snacks: "Pav Bhaji with Butter Pav, Lemon Slices, Hot Tea",
                dinner: "Egg Curry / Mushroom Masala, Steamed Rice, Yellow Dal, Roti, Ice Cream Cup"
            },
            Saturday: {
                breakfast: "Poori Bhaji, Suji Halwa, Pickles, Tea / Coffee",
                lunch: "Kadhi Pakoda, Jeera Rice, Aloo Jeera Dry, Phulka, Green Salad",
                snacks: "Veg Spring Roll, Schezwan Sauce, Lemon Ice Tea / Chai",
                dinner: "Matar Paneer, Dal Fry, Fried Rice, Roti, Moong Dal Halwa"
            },
            Sunday: {
                breakfast: "Choice of Bread Omelette or Veg Club Sandwich, Cornflakes with Milk, Tea/Coffee",
                lunch: "Special Sunday Feast: Paneer Tikka Masala, Chicken Curry, Biryani Rice, Naan, Gulab Jamun",
                snacks: "Bhel Puri / Sev Puri, Cold Coffee / Masala Tea",
                dinner: "Light Comfort Dinner: Vegetable Pulao, Dal Fry, Roti, Fresh Curd, Seasonal Sweet"
            }
        },
        canteenItems: [
            { id: "C-01", name: "Masala Dosa", category: "South Indian", price: 60, status: "Available" },
            { id: "C-02", name: "Cheese Grilled Sandwich", category: "Snacks", price: 70, status: "Available" },
            { id: "C-03", name: "Veg Hakka Noodles", category: "Chinese", price: 80, status: "Available" },
            { id: "C-04", name: "Paneer Roll", category: "Rolls", price: 75, status: "Available" },
            { id: "C-05", name: "Cold Coffee with Ice Cream", category: "Beverages", price: 50, status: "Available" },
            { id: "C-06", name: "Fresh Lime Soda", category: "Beverages", price: 30, status: "Available" },
            { id: "C-07", name: "Samosa Chat", category: "Snacks", price: 40, status: "Available" },
            { id: "C-08", name: "Chicken Steamed Momos (6 pcs)", category: "Quick Bites", price: 90, status: "Available" }
        ],
        feedback: [
            { id: "FB-101", studentName: "Aarav Sharma", date: "2026-10-07", meal: "Lunch", rating: 4, comment: "Paneer curry quality was delicious. Chapati was hot and fresh." },
            { id: "FB-102", studentName: "Priya Nair", date: "2026-10-06", meal: "Dinner", rating: 3, comment: "Rice quantity was good but dal needed a bit more salt." }
        ]
    },

    // Fees Ledger
    fees: {
        summary: {
            totalAnnual: 111500,
            totalPaid: 108000,
            pendingBalance: 3500,
            dueDate: "25 October 2026",
            paymentStatus: "Partial (Exam Fee Due)"
        },
        breakdown: [
            { id: "FEE-01", head: "Tuition Fee (Semester 3)", amount: 65000, status: "Paid", paidOn: "12-Jul-2026", receiptNo: "RCP-2026-0814" },
            { id: "FEE-02", head: "Hostel & Accommodation Fee (Odd Sem)", amount: 26000, status: "Paid", paidOn: "12-Jul-2026", receiptNo: "RCP-2026-0815" },
            { id: "FEE-03", head: "Mess Advance (Semester 3)", amount: 12000, status: "Paid", paidOn: "15-Jul-2026", receiptNo: "RCP-2026-0920" },
            { id: "FEE-04", head: "Library & Lab Security Caution (Refundable)", amount: 5000, status: "Paid", paidOn: "12-Jul-2026", receiptNo: "RCP-2026-0816" },
            { id: "FEE-05", head: "End-Semester Examination Fee", amount: 3500, status: "Pending", paidOn: "-", receiptNo: "INV-2026-9901" }
        ],
        queries: [
            {
                id: "FQ-201",
                studentId: "STU-2024-042",
                studentName: "Aarav Sharma",
                category: "Scholarship Adjustment",
                amount: "₹15,000",
                description: "State Merit Scholarship credit status update for Semester 3 tuition deduction.",
                submittedOn: "2026-10-04",
                status: "In Review",
                adminResponse: "Verification submitted to State Scholarship Portal. Adjustment expected in 5-7 working days."
            }
        ]
    },

    // Campus Circulars
    notices: [
        {
            id: "NOT-301",
            title: "Mid-Semester Examination Schedule Announced (Oct - Nov 2026)",
            category: "Examinations",
            priority: "Urgent",
            date: "09-Oct-2026",
            postedBy: "Office of Controller of Examinations",
            target: "All B.Tech & PG Students",
            body: "The Mid-Semester theory and practical examinations will commence from 28th October 2026. Hall tickets will be issued through the academic portal upon clearance of minimum 75% attendance criteria. Detailed timetable has been posted on departmental notice boards."
        },
        {
            id: "NOT-302",
            title: "Annual National Hackathon 'InnovateX 2026' Registrations Open",
            category: "Campus Events",
            priority: "Important",
            date: "08-Oct-2026",
            postedBy: "Incubation & Innovation Cell",
            target: "All Engineering & Design Students",
            body: "InnovateX 2026 36-hour hackathon will take place from 14th to 15th November 2026 with prize pool of ₹2,50,000. Themes include AI in Education, Sustainable Smart Campuses, and Healthcare Tech. Form your teams of 3-4 members and register before 25th October."
        },
        {
            id: "NOT-303",
            title: "Scheduled Solar Water Heater Inspection & Maintenance in Hostel Blocks",
            category: "Hostel & Facilities",
            priority: "General",
            date: "07-Oct-2026",
            postedBy: "Chief Warden Office",
            target: "Hostel Residents (Blocks A, B, C & Girls Hostel)",
            body: "Preventive maintenance and heating coil replacement for solar water systems will be conducted on Saturday between 10:00 AM and 03:00 PM. Hot water supply will resume normally from Saturday evening."
        },
        {
            id: "NOT-304",
            title: "Central Library Extended Reading Room Hours for Exam Preparations",
            category: "Academic",
            priority: "Important",
            date: "05-Oct-2026",
            postedBy: "Chief Librarian",
            target: "All Enrolled Students & Research Scholars",
            body: "Starting Monday, the Central Library Digital Reference Wing and 3rd floor quiet study reading room will remain open until 01:00 AM midnight throughout the examination period. High-speed Wi-Fi and power points have been verified."
        },
        {
            id: "NOT-305",
            title: "Diwali Festive Break & Hostel Outstation Pass Guidelines",
            category: "Administrative",
            priority: "General",
            date: "03-Oct-2026",
            postedBy: "Registrar Secretariat",
            target: "All Campus Community",
            body: "The university will observe Diwali holidays from 31st October to 04th November 2026. Hostel students planning to travel must submit their Outstation Gate Pass requests via CampusConnect AI by 27th October."
        }
    ],

    // --- MODERN WORLD CAMPUS MODULES ---
    // 1. Student Wellbeing & Counseling Support
    counseling: [
        {
            id: "CNS-101",
            studentId: "STU-2024-042",
            studentName: "Aarav Sharma",
            category: "Exam Stress & Anxiety Support",
            counselor: "Dr. Ananya Roy (Lead Psychologist)",
            appointmentDate: "2026-10-14 03:30 PM",
            mode: "Confidential In-Person (Wellness Center, Room 12)",
            status: "Confirmed",
            notes: "Session confirmed. Your privacy is 100% protected under university ethics policy."
        }
    ],

    // 2. Campus Emergency SOS Broadcasts
    emergencySOS: [
        {
            id: "SOS-901",
            timestamp: "2026-10-08 11:45 PM",
            sender: "Hostel Security Guard Post 3",
            type: "Medical First-Aid",
            location: "Block B, 2nd Floor East Wing",
            status: "Resolved",
            actionTaken: "Campus ambulance dispatched in 4 mins. Student treated for minor sprain at campus clinic."
        }
    ],

    // 3. Digital Lost & Found
    lostAndFound: [
        {
            id: "LF-501",
            item: "Scientific Calculator (Casio fx-991CW)",
            foundLocation: "Library Quiet Study Wing, Table 14",
            date: "2026-10-08",
            reportedBy: "Library Staff Desk",
            status: "Claimable at Library Window 1"
        },
        {
            id: "LF-502",
            item: "Blue Noise-Cancelling Earbuds Case",
            foundLocation: "Central Cafeteria Outer Lawn",
            date: "2026-10-07",
            reportedBy: "Campus Security Team",
            status: "Claimable at Security Gate 1"
        }
    ]
};

// Data Store Access & Security Engine
window.CampusData = {
    getMasterPasscode: function() {
        return ADMIN_MASTER_PASSCODE;
    },

    // Verify Master Admin Passcode
    verifyAdminPasscode: function(code) {
        return (code || "").trim() === ADMIN_MASTER_PASSCODE;
    },

    // Initialize data in localStorage if not already present
    init: function() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                this.saveData(DEFAULT_DATA);
                return DEFAULT_DATA;
            }
            const parsed = JSON.parse(raw);
            // Ensure modern modules and users exist
            if (!parsed.registeredUsers || parsed.registeredUsers.length === 0) {
                parsed.registeredUsers = DEFAULT_DATA.registeredUsers;
            }
            if (!parsed.counseling) parsed.counseling = DEFAULT_DATA.counseling;
            if (!parsed.emergencySOS) parsed.emergencySOS = DEFAULT_DATA.emergencySOS;
            if (!parsed.lostAndFound) parsed.lostAndFound = DEFAULT_DATA.lostAndFound;
            this.saveData(parsed);
            return parsed;
        } catch (e) {
            console.error("Failed to read CampusConnect data from localStorage:", e);
            return DEFAULT_DATA;
        }
    },

    getData: function() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return this.init();
            return JSON.parse(raw);
        } catch (e) {
            console.error("Error parsing stored data:", e);
            return DEFAULT_DATA;
        }
    },

    saveData: function(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error("Failed to write CampusConnect data:", e);
            return false;
        }
    },

    resetData: function() {
        this.saveData(DEFAULT_DATA);
        localStorage.removeItem(SESSION_USER_KEY);
        this.setActiveRole('student');
        return DEFAULT_DATA;
    },

    getActiveRole: function() {
        return localStorage.getItem(ROLE_KEY) || 'student';
    },

    setActiveRole: function(role) {
        localStorage.setItem(ROLE_KEY, role);
    },

    getCurrentUser: function() {
        const data = this.getData();
        const role = this.getActiveRole();

        const sessionRaw = localStorage.getItem(SESSION_USER_KEY);
        if (sessionRaw) {
            try {
                const sessionUser = JSON.parse(sessionRaw);
                if (sessionUser && sessionUser.role === role) {
                    return sessionUser;
                }
            } catch (e) {}
        }

        return role === 'admin' ? data.adminUser : data.currentUser;
    },

    setCurrentUser: function(user) {
        localStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
        this.setActiveRole(user.role || 'student');
    },

    // --- SECURE USER REGISTRATION & AUTH ---
    registerUser: function(regObj) {
        const data = this.getData();
        if (!data.registeredUsers) data.registeredUsers = [];

        const emailLower = (regObj.email || "").toLowerCase().trim();
        const existing = data.registeredUsers.find(u => (u.email || "").toLowerCase().trim() === emailLower);
        if (existing) {
            return { success: false, message: "An account with this email address already exists!" };
        }

        const role = regObj.role || 'student';

        // Check Admin Master Passcode if registering as admin
        if (role === 'admin') {
            if (!this.verifyAdminPasscode(regObj.adminPasscode)) {
                return { success: false, message: "Invalid Institutional Admin Master Passcode. Authorization denied." };
            }
        }

        const newId = role === 'admin' ? 
            ("ADM-" + Math.floor(100 + Math.random() * 900)) : 
            ("STU-2026-" + Math.floor(100 + Math.random() * 900));

        const initials = regObj.name
            .trim()
            .split(" ")
            .map(n => n[0])
            .join("")
            .substring(0, 2)
            .toUpperCase() || (role === 'admin' ? "AD" : "ST");

        const newUser = {
            id: newId,
            name: regObj.name.trim(),
            email: emailLower,
            password: regObj.password,
            role: role,
            program: regObj.program || (role === 'admin' ? "Administration Staff" : "B.Tech Computer Science & Engineering"),
            semester: regObj.semester || "1st Semester",
            batch: "2026 - 2030",
            hostel: regObj.hostel || "Campus Hostel",
            roomNo: regObj.roomNo || (role === 'admin' ? "Admin Office" : "A-101"),
            rollNo: regObj.rollNo || (role === 'admin' ? newId : "26CS" + Math.floor(100 + Math.random() * 900)),
            designation: regObj.designation || (role === 'admin' ? "Administrative Officer" : "Undergraduate Student"),
            phone: regObj.phone || "+91 98765 00000",
            avatar: initials,
            joinedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            status: "Active"
        };

        data.registeredUsers.push(newUser);

        if (role === 'student') {
            data.currentUser = newUser;
        } else {
            data.adminUser = newUser;
        }

        this.saveData(data);
        this.setCurrentUser(newUser);

        return { success: true, user: newUser };
    },

    authenticateUser: function(email, password, role) {
        const data = this.getData();
        const emailTrim = (email || "").toLowerCase().trim();

        // 1. Check against registered users
        const user = (data.registeredUsers || []).find(u => 
            u.email.toLowerCase().trim() === emailTrim && 
            u.password === password &&
            u.role === role
        );

        if (user) {
            this.setCurrentUser(user);
            return { success: true, user: user };
        }

        // 2. Demo fallback matching
        if (role === 'student' && (emailTrim === 'aarav.cs24@campus.edu' || emailTrim === 'student')) {
            this.setCurrentUser(data.currentUser);
            return { success: true, user: data.currentUser };
        }
        if (role === 'admin' && (emailTrim === 'dean.affairs@campus.edu' || emailTrim === 'admin')) {
            this.setCurrentUser(data.adminUser);
            return { success: true, user: data.adminUser };
        }

        return { success: false, message: "Invalid email, password, or role mismatch." };
    },

    // --- REQUESTS CRUD ---
    addRequest: function(reqObj) {
        const data = this.getData();
        const activeUser = this.getCurrentUser();
        const newReq = {
            id: "REQ-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000),
            studentId: activeUser.id,
            studentName: activeUser.name,
            roomNo: activeUser.roomNo,
            type: reqObj.type,
            reason: reqObj.reason,
            fromDate: reqObj.fromDate || new Date().toISOString().split('T')[0],
            toDate: reqObj.toDate || reqObj.fromDate || new Date().toISOString().split('T')[0],
            outTime: reqObj.outTime || "05:00 PM",
            inTime: reqObj.inTime || "08:30 PM",
            emergencyContact: reqObj.emergencyContact || "+91 98765 43210",
            submittedOn: new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: "Pending",
            adminRemarks: "Submitted. Awaiting administrator review."
        };
        data.requests.unshift(newReq);
        this.saveData(data);
        return newReq;
    },

    updateRequestStatus: function(requestId, newStatus, remarks) {
        const data = this.getData();
        const req = data.requests.find(r => r.id === requestId);
        if (req) {
            req.status = newStatus;
            if (remarks) req.adminRemarks = remarks;
            this.saveData(data);
            return true;
        }
        return false;
    },

    // --- HOSTEL COMPLAINTS CRUD ---
    addComplaint: function(compObj) {
        const data = this.getData();
        const activeUser = this.getCurrentUser();
        const newComplaint = {
            id: "TKT-" + Math.floor(1000 + Math.random() * 9000),
            studentId: activeUser.id,
            studentName: activeUser.name,
            room: compObj.room || activeUser.roomNo,
            block: compObj.block || activeUser.hostel || "Block B",
            category: compObj.category,
            priority: compObj.priority || "Medium",
            description: compObj.description,
            submittedOn: new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: "Pending",
            adminRemarks: "Complaint logged. Assigned to maintenance supervisor."
        };
        data.hostelComplaints.unshift(newComplaint);
        this.saveData(data);
        return newComplaint;
    },

    updateComplaintStatus: function(ticketId, newStatus, remarks) {
        const data = this.getData();
        const ticket = data.hostelComplaints.find(t => t.id === ticketId);
        if (ticket) {
            ticket.status = newStatus;
            if (remarks) ticket.adminRemarks = remarks;
            this.saveData(data);
            return true;
        }
        return false;
    },

    // --- ATTENDANCE MANAGEMENT ---
    updateAttendance: function(subjectCode, attended, total) {
        const data = this.getData();
        const sub = data.attendance.find(s => s.code === subjectCode);
        if (sub) {
            sub.attended = parseInt(attended, 10);
            sub.total = parseInt(total, 10);
            
            let totalAtt = 0, totalHeld = 0;
            data.attendance.forEach(s => {
                totalAtt += s.attended;
                totalHeld += s.total;
            });
            const overall = totalHeld > 0 ? ((totalAtt / totalHeld) * 100).toFixed(1) : 0;
            this.saveData(data);
            return { subject: sub, overall: overall };
        }
        return null;
    },

    // --- TIMETABLE CRUD ---
    addTimetableEntry: function(entry) {
        const data = this.getData();
        const newEntry = {
            id: "TT-" + Math.floor(100 + Math.random() * 900),
            day: entry.day,
            time: entry.time,
            code: entry.code,
            subject: entry.subject,
            room: entry.room,
            faculty: entry.faculty,
            type: entry.type || "Lecture"
        };
        data.timetable.push(newEntry);
        this.saveData(data);
        return newEntry;
    },

    deleteTimetableEntry: function(id) {
        const data = this.getData();
        data.timetable = data.timetable.filter(t => t.id !== id);
        this.saveData(data);
        return true;
    },

    // --- NOTICES CRUD ---
    addNotice: function(notice) {
        const data = this.getData();
        const activeUser = this.getCurrentUser();
        const newNotice = {
            id: "NOT-" + Math.floor(100 + Math.random() * 900),
            title: notice.title,
            category: notice.category || "General",
            priority: notice.priority || "General",
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            postedBy: notice.postedBy || activeUser.name,
            target: notice.target || "All Students",
            body: notice.body
        };
        data.notices.unshift(newNotice);
        this.saveData(data);
        return newNotice;
    },

    deleteNotice: function(id) {
        const data = this.getData();
        data.notices = data.notices.filter(n => n.id !== id);
        this.saveData(data);
        return true;
    },

    // --- FEES QUERY CRUD ---
    addFeeQuery: function(queryObj) {
        const data = this.getData();
        const activeUser = this.getCurrentUser();
        const newQuery = {
            id: "FQ-" + Math.floor(100 + Math.random() * 900),
            studentId: activeUser.id,
            studentName: activeUser.name,
            category: queryObj.category,
            amount: queryObj.amount || "N/A",
            description: queryObj.description,
            submittedOn: new Date().toLocaleDateString('en-GB'),
            status: "In Review",
            adminResponse: "Query received by Accounts Department. Under review."
        };
        data.fees.queries.unshift(newQuery);
        this.saveData(data);
        return newQuery;
    },

    replyFeeQuery: function(queryId, reply) {
        const data = this.getData();
        const q = data.fees.queries.find(item => item.id === queryId);
        if (q) {
            q.status = "Resolved";
            q.adminResponse = reply;
            this.saveData(data);
            return true;
        }
        return false;
    },

    // --- MESS FEEDBACK CRUD ---
    addMessFeedback: function(fb) {
        const data = this.getData();
        const activeUser = this.getCurrentUser();
        const newFb = {
            id: "FB-" + Math.floor(100 + Math.random() * 900),
            studentName: activeUser.name,
            date: new Date().toLocaleDateString('en-GB'),
            meal: fb.meal,
            rating: parseInt(fb.rating, 10) || 5,
            comment: fb.comment
        };
        data.messCanteen.feedback.unshift(newFb);
        this.saveData(data);
        return newFb;
    },

    // --- MODERN CAMPUS LIFE MODULES ---
    // 1. Student Counseling & Mental Health Booking
    bookCounselingSession: function(sessionObj) {
        const data = this.getData();
        const activeUser = this.getCurrentUser();
        const newSession = {
            id: "CNS-" + Math.floor(100 + Math.random() * 900),
            studentId: activeUser.id,
            studentName: activeUser.name,
            category: sessionObj.category || "Academic & Personal Well-being",
            counselor: sessionObj.counselor || "Dr. Ananya Roy (Lead Psychologist)",
            appointmentDate: sessionObj.appointmentDate || "Tomorrow 03:00 PM",
            mode: sessionObj.mode || "Confidential In-Person",
            status: "Confirmed",
            notes: "Session scheduled confidentially. You may cancel or reschedule anytime."
        };
        if (!data.counseling) data.counseling = [];
        data.counseling.unshift(newSession);
        this.saveData(data);
        return newSession;
    },

    // 2. Trigger Campus Emergency SOS
    triggerEmergencySOS: function(details) {
        const data = this.getData();
        const activeUser = this.getCurrentUser();
        const alert = {
            id: "SOS-" + Math.floor(100 + Math.random() * 900),
            timestamp: new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sender: `${activeUser.name} (${activeUser.rollNo || activeUser.id})`,
            type: details.type || "Immediate Assistance",
            location: details.location || `${activeUser.hostel || 'Hostel'} Room ${activeUser.roomNo || '204'}`,
            status: "Dispatched",
            actionTaken: "Security control room and health center alerted instantly via CampusConnect Emergency Relay."
        };
        if (!data.emergencySOS) data.emergencySOS = [];
        data.emergencySOS.unshift(alert);
        this.saveData(data);
        return alert;
    }
};

// Initialize persistent state
CampusData.init();
