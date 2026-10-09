/**
 * CampusConnect AI — Floating Campus Life Assistant
 * File: ai-assistant.js
 * 
 * Client-side rule-based knowledge engine & campus life command assistant.
 * Features a horizontally scrollable command chip bar (.ai-chips-line-wrapper)
 * displaying quick command shortcuts (/attendance, /menu, /gatepass, /repairs,
 * /fees, /notices, /counselor, /sos, /lostfound, /shuttle, /wifi, etc.).
 * 
 * Works 100% offline using live localStorage data without any external API keys.
 */

(function () {
    // Initialize floating assistant on DOM load
    document.addEventListener("DOMContentLoaded", () => {
        injectAIAssistantWidget();
    });

    function injectAIAssistantWidget() {
        if (document.getElementById("campus-ai-widget-container")) return;

        const container = document.createElement("div");
        container.id = "campus-ai-widget-container";

        container.innerHTML = `
            <!-- Floating Action Button -->
            <button class="ai-fab" id="ai-fab-toggle" title="Ask Campus AI Assistant" aria-label="Open AI Assistant">
                <span>🤖</span>
                <span>Ask Campus AI</span>
            </button>

            <!-- Chat Window Dialog -->
            <div class="ai-chat-window" id="ai-chat-window" role="dialog" aria-labelledby="ai-chat-title">
                <div class="ai-chat-header">
                    <div class="ai-header-title">
                        <span>🤖</span>
                        <div>
                            <h4 id="ai-chat-title">Campus AI Assistant</h4>
                            <span>Smart Campus Concierge · Rule-Based Engine</span>
                        </div>
                    </div>
                    <div class="ai-header-actions">
                        <button id="ai-clear-btn" title="Clear conversation" aria-label="Clear chat">🗑️</button>
                        <button id="ai-close-btn" title="Close chat" aria-label="Close chat">✖</button>
                    </div>
                </div>

                <!-- Visibly Displayed Horizontal Command Line Chips -->
                <div class="ai-chips-line-wrapper" id="ai-chips-line" title="Scroll horizontally for more commands">
                    <button type="button" class="ai-chip-pill" data-query="/attendance">📊 /attendance</button>
                    <button type="button" class="ai-chip-pill" data-query="/menu">🍲 /menu</button>
                    <button type="button" class="ai-chip-pill" data-query="/gatepass">🚪 /gatepass</button>
                    <button type="button" class="ai-chip-pill" data-query="/repairs">🔧 /repairs</button>
                    <button type="button" class="ai-chip-pill" data-query="/fees">💳 /fees</button>
                    <button type="button" class="ai-chip-pill" data-query="/notices">📢 /notices</button>
                    <button type="button" class="ai-chip-pill" data-query="/counselor">🧠 /counselor</button>
                    <button type="button" class="ai-chip-pill" data-query="/sos" style="border-color: #fca5a5; color: #b91c1c; font-weight: 700;">🚨 /sos</button>
                    <button type="button" class="ai-chip-pill" data-query="/lostfound">🔍 /lostfound</button>
                    <button type="button" class="ai-chip-pill" data-query="/shuttle">🚌 /shuttle</button>
                    <button type="button" class="ai-chip-pill" data-query="/wifi">📶 /wifi</button>
                    <button type="button" class="ai-chip-pill" data-query="/library">📚 /library</button>
                    <button type="button" class="ai-chip-pill" data-query="/clinic">🏥 /clinic</button>
                </div>

                <!-- Chat Body -->
                <div class="ai-chat-body" id="ai-chat-body">
                    <div class="chat-bubble bot">
                        Hello! 👋 I am your <strong>CampusConnect AI Assistant</strong>.
                        <br><br>
                        I can help you check your live attendance, read today's mess menu, submit hostel repairs, apply for gate passes, schedule mental health counseling, check fees, or dispatch emergency safety alerts.
                        <br><br>
                        <em>💡 Click any command chip on the bar above, or type your question or <code>/command</code> below!</em>
                    </div>
                </div>

                <!-- Chat Input Area -->
                <form class="ai-chat-input-area" id="ai-chat-form">
                    <input type="text" class="ai-chat-input" id="ai-user-input" placeholder="Type a message or /command..." autocomplete="off" required>
                    <button type="submit" class="ai-chat-send" title="Send" aria-label="Send message">➤</button>
                </form>

                <div class="ai-chat-disclaimer">
                    CampusConnect AI prototype operates client-side via local records &amp; verified rules.
                </div>
            </div>
        `;

        document.body.appendChild(container);

        // Bind events
        const fab = document.getElementById("ai-fab-toggle");
        const chatWindow = document.getElementById("ai-chat-window");
        const closeBtn = document.getElementById("ai-close-btn");
        const clearBtn = document.getElementById("ai-clear-btn");
        const form = document.getElementById("ai-chat-form");
        const input = document.getElementById("ai-user-input");
        const chipsLine = document.getElementById("ai-chips-line");

        fab.addEventListener("click", () => {
            chatWindow.classList.toggle("open");
            if (chatWindow.classList.contains("open")) {
                input.focus();
            }
        });

        closeBtn.addEventListener("click", () => {
            chatWindow.classList.remove("open");
        });

        clearBtn.addEventListener("click", () => {
            const chatBody = document.getElementById("ai-chat-body");
            chatBody.innerHTML = `
                <div class="chat-bubble bot">
                    Chat history cleared! 👋 How can I assist you with your campus life right now? Click any command above or type your question below.
                </div>
            `;
        });

        chipsLine.addEventListener("click", (e) => {
            const btn = e.target.closest(".ai-chip-pill");
            if (btn) {
                const query = btn.getAttribute("data-query");
                if (query) {
                    handleUserQuery(query);
                }
            }
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const text = input.value.trim();
            if (text) {
                handleUserQuery(text);
                input.value = "";
            }
        });
    }

    function appendMessage(text, sender = "bot", actionLink = null, actionText = null) {
        const chatBody = document.getElementById("ai-chat-body");
        if (!chatBody) return;

        const bubble = document.createElement("div");
        bubble.className = `chat-bubble ${sender}`;

        let content = text;
        if (actionLink && actionText) {
            content += `<br><a href="${actionLink}" class="action-link-btn">${actionText} →</a>`;
        }
        bubble.innerHTML = content;
        chatBody.appendChild(bubble);

        // Auto-scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    /**
     * Rule-based Query Interpreter & Command Processor
     */
    function handleUserQuery(query) {
        // Display user bubble
        appendMessage(escapeHtml(query), "user");

        // Small simulated delay for natural conversational feel
        setTimeout(() => {
            const response = generateAIResponse(query.trim().toLowerCase());
            appendMessage(response.text, "bot", response.link, response.linkText);
        }, 200);
    }

    function generateAIResponse(q) {
        const data = window.CampusData ? window.CampusData.getData() : null;

        // 1. EMERGENCY SOS COMMAND / QUERY
        if (q === "/sos" || q.includes("sos") || q.includes("emergency") || q.includes("danger") || q.includes("threat") || q.includes("harassment") || q.includes("accident")) {
            return {
                text: `🚨 <strong>CAMPUS EMERGENCY PROTOCOL ACTIVATED:</strong><br>` +
                      `• <strong>Campus Control Room:</strong> +91 11 2345 6799 (Gate 1)<br>` +
                      `• <strong>Quick Action:</strong> Click the red <strong>🚨 SOS EMERGENCY</strong> button on your dashboard to instantly dispatch your live location to campus security patrols!<br>` +
                      `• <strong>24/7 Campus Health Center:</strong> Ext. 404 / +91 98765 43210<br>` +
                      `• <strong>Women's Safety Cell:</strong> Ext. 109 / +91 98765 99881<br>` +
                      `Security personnel will arrive at your geo-location within 3 minutes.`,
                link: "index.html",
                linkText: "Open Dashboard SOS Dispatcher"
            };
        }

        // 2. MENTAL HEALTH COUNSELING COMMAND / QUERY
        if (q === "/counselor" || q.includes("counselor") || q.includes("counseling") || q.includes("mental health") || q.includes("stress") || q.includes("anxiety") || q.includes("depression") || q.includes("therapist") || q.includes("wellness")) {
            return {
                text: `🧠 <strong>Student Mental Health &amp; Wellness Support:</strong><br>` +
                      `Your emotional well-being is our top university priority. All sessions are 100% confidential and free of cost.<br>` +
                      `• <strong>Campus Psychologist:</strong> Dr. Priya Sen (M.Phil Clinical Psychology)<br>` +
                      `• <strong>Office:</strong> Student Wellness Hub, Room 208<br>` +
                      `• <strong>Hours:</strong> Mon - Fri: 10:00 AM - 05:00 PM<br>` +
                      `• <strong>24/7 Student Crisis Helpline:</strong> 1800-599-0019<br>` +
                      `You can schedule a discreet 1-on-1 counseling session with zero stigma.`,
                link: "requests.html",
                linkText: "Book Confidential Counseling Session"
            };
        }

        // 3. ATTENDANCE COMMAND / QUERY
        if (q === "/attendance" || q.includes("attendance") || q.includes("bunk") || q.includes("present") || q.includes("absent") || q.includes("shortage")) {
            if (data && data.attendance) {
                let totalAtt = 0, totalHeld = 0;
                let lowSubjects = [];
                data.attendance.forEach(s => {
                    totalAtt += s.attended;
                    totalHeld += s.total;
                    const pct = (s.attended / s.total) * 100;
                    if (pct < 75) {
                        lowSubjects.push(`${s.subject} (${pct.toFixed(1)}%)`);
                    }
                });
                const overall = ((totalAtt / totalHeld) * 100).toFixed(1);

                let msg = `Your overall campus attendance is <strong>${overall}%</strong> (${totalAtt}/${totalHeld} lectures attended).`;
                if (lowSubjects.length > 0) {
                    msg += `<br><br>⚠️ <strong>Warning:</strong> You are below the 75% mandatory threshold in: <em>${lowSubjects.join(", ")}</em>. You must attend the upcoming sessions to remain eligible for end-term examinations.`;
                } else {
                    msg += `<br><br>✅ Great job! You are above the 75% minimum threshold in all enrolled subjects.`;
                }
                return {
                    text: msg,
                    link: "attendance.html",
                    linkText: "View Detailed Attendance & Bunk Simulator"
                };
            }
            return {
                text: "The mandatory attendance threshold is 75% for all academic courses. Check your portal for exact subject numbers.",
                link: "attendance.html",
                linkText: "Go to Attendance Portal"
            };
        }

        // 4. MESS & CANTEEN MENU COMMAND / QUERY
        if (q === "/menu" || q.includes("mess") || q.includes("canteen") || q.includes("menu") || q.includes("food") || q.includes("breakfast") || q.includes("lunch") || q.includes("dinner") || q.includes("snack")) {
            if (data && data.messCanteen) {
                const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                const today = days[new Date().getDay()];
                const todayMenu = data.messCanteen.weeklyMenu[today] || data.messCanteen.weeklyMenu["Monday"];
                const timings = data.messCanteen.timings;

                return {
                    text: `🍲 <strong>Today's Mess Menu (${today}):</strong><br>` +
                          `• <strong>Breakfast (${timings.breakfast}):</strong> ${todayMenu.breakfast}<br>` +
                          `• <strong>Lunch (${timings.lunch}):</strong> ${todayMenu.lunch}<br>` +
                          `• <strong>Snacks (${timings.snacks}):</strong> ${todayMenu.snacks}<br>` +
                          `• <strong>Dinner (${timings.dinner}):</strong> ${todayMenu.dinner}`,
                    link: "mess-canteen.html",
                    linkText: "View Full Weekly Menu & Canteen Catalog"
                };
            }
            return {
                text: "The hostel mess serves breakfast (07:30 - 09:30 AM), lunch (12:30 - 02:30 PM), snacks (04:30 - 06:00 PM), and dinner (07:30 - 09:30 PM).",
                link: "mess-canteen.html",
                linkText: "Open Mess & Canteen"
            };
        }

        // 5. GATE PASS & LEAVE COMMAND / QUERY
        if (q === "/gatepass" || q.includes("gate pass") || q.includes("gatepass") || q.includes("leave") || q.includes("outstation") || q.includes("curfew") || q.includes("night out")) {
            return {
                text: `🚪 <strong>Campus Gate Pass & Leave Guidelines:</strong><br>` +
                      `1. <strong>Day Gate Pass:</strong> Valid until 09:00 PM curfew. Requires digital verification at Main Gate 1.<br>` +
                      `2. <strong>Night / Weekend Leave:</strong> Requires parental contact consent and approval from Chief Warden.<br>` +
                      `3. Digital pass reference IDs with QR stamps are scanned upon re-entering campus.`,
                link: "requests.html",
                linkText: "Apply for Gate Pass or Leave"
            };
        }

        // 6. HOSTEL REPAIRS & MAINTENANCE COMMAND / QUERY
        if (q === "/repairs" || q === "/hostel" || q.includes("hostel") || q.includes("complaint") || q.includes("plumber") || q.includes("electric") || q.includes("room") || q.includes("repair") || q.includes("cleaning")) {
            if (data && data.hostelComplaints && data.hostelComplaints.length > 0) {
                const latest = data.hostelComplaints[0];
                return {
                    text: `🔧 <strong>Hostel Maintenance Status:</strong><br>` +
                          `Your latest complaint <strong>${latest.id}</strong> (${latest.category} - Room ${latest.room}) is currently marked as: <strong>${latest.status.toUpperCase()}</strong>.<br>` +
                          `<em>Warden Remarks:</em> "${latest.adminRemarks}"`,
                    link: "hostel.html",
                    linkText: "View & Lodge Hostel Tickets"
                };
            }
            return {
                text: "You can lodge tickets for electricity, plumbing, Wi-Fi, carpentry, or cleanliness issues directly to the maintenance supervisor.",
                link: "hostel.html",
                linkText: "Lodge Maintenance Ticket"
            };
        }

        // 7. FEES & DUES COMMAND / QUERY
        if (q === "/fees" || q.includes("fee") || q.includes("due") || q.includes("receipt") || q.includes("scholarship") || q.includes("payment") || q.includes("dues")) {
            if (data && data.fees) {
                const s = data.fees.summary;
                return {
                    text: `💳 <strong>Financial Status (Semester 3):</strong><br>` +
                          `• Total Academic & Hostel Fee: ₹${s.totalAnnual.toLocaleString()}<br>` +
                          `• Total Paid: ₹${s.totalPaid.toLocaleString()}<br>` +
                          `• <strong>Pending Balance:</strong> ₹${s.pendingBalance.toLocaleString()} (${s.paymentStatus})<br>` +
                          `• <strong>Due Date:</strong> ${s.dueDate}<br>` +
                          `<em>Note: Demonstrates student ledger. Official fee receipts can be downloaded from the fees portal.</em>`,
                    link: "fees.html",
                    linkText: "View Fee Breakdown & Submit Query"
                };
            }
            return {
                text: "You can view your fee balance, download fee receipts, and submit scholarship adjustment requests on the fees desk.",
                link: "fees.html",
                linkText: "Open Fees Section"
            };
        }

        // 8. NOTICES & EVENTS COMMAND / QUERY
        if (q === "/notices" || q.includes("notice") || q.includes("exam") || q.includes("hackathon") || q.includes("event") || q.includes("announcement") || q.includes("holiday")) {
            if (data && data.notices && data.notices.length > 0) {
                const n = data.notices[0];
                return {
                    text: `📢 <strong>Latest Campus Notice:</strong><br>` +
                          `<strong>${n.title}</strong><br>` +
                          `<em>Published on ${n.date} by ${n.postedBy}</em><br>` +
                          `${n.body.substring(0, 160)}...`,
                    link: "notices.html",
                    linkText: "Browse All Campus Notices"
                };
            }
            return {
                text: "All verified circulars regarding mid-semester examinations, hackathons, and holiday schedules are updated on the notices board.",
                link: "notices.html",
                linkText: "View Campus Circulars"
            };
        }

        // 9. LOST & FOUND COMMAND / QUERY
        if (q === "/lostfound" || q.includes("lost") || q.includes("found") || q.includes("wallet") || q.includes("keys") || q.includes("id card") || q.includes("bottle") || q.includes("bag")) {
            return {
                text: `🔍 <strong>Digital Lost &amp; Found Desk:</strong><br>` +
                      `Items found across campus are logged with Campus Security Post 1.<br>` +
                      `• <strong>Recent Found:</strong> Blue Hydro Flask (LH-201), Casio FX-991CW Calculator (Library 2nd Flr), Honda Keyring (Cafeteria).<br>` +
                      `• To claim or report a lost possession, submit a request ticket with verification details.`,
                link: "requests.html",
                linkText: "Report or Claim Lost Possession"
            };
        }

        // 10. CAMPUS NIGHT SHUTTLE BUS COMMAND / QUERY
        if (q === "/shuttle" || q.includes("shuttle") || q.includes("bus") || q.includes("transport") || q.includes("metro") || q.includes("cab")) {
            return {
                text: `🚌 <strong>Campus Night Shuttle Schedule:</strong><br>` +
                      `Free electric transit runs between Academic Blocks, Hostels, and Metro Station.<br>` +
                      `• <strong>Operating Hours:</strong> 06:30 AM to 10:30 PM (every 15 minutes)<br>` +
                      `• <strong>Late Night Escort Service:</strong> 10:30 PM to 01:00 AM (Request on-call via Security Ext. 401)<br>` +
                      `• <strong>Stops:</strong> Gate 1 ⇄ Central Library ⇄ Dining Hall ⇄ Boys Hostel ⇄ Girls Hostel.`,
                link: "index.html",
                linkText: "Back to Dashboard"
            };
        }

        // 11. CAMPUS WI-FI COMMAND / QUERY
        if (q === "/wifi" || q.includes("wifi") || q.includes("wi-fi") || q.includes("internet") || q.includes("network") || q.includes("eduroam")) {
            return {
                text: `📶 <strong>Campus High-Speed Wi-Fi Setup:</strong><br>` +
                      `• <strong>SSID:</strong> CampusConnect-Secure / Eduroam<br>` +
                      `• <strong>Username:</strong> Your Student ID (e.g., 24CS042)<br>` +
                      `• <strong>Password:</strong> Your Portal Password<br>` +
                      `• <strong>Bandwidth Limit:</strong> Unlimited for academic research; fair use applies.<br>` +
                      `If you experience slow speeds or authentication issues, lodge a ticket under Hostel/IT Helpdesk.`,
                link: "hostel.html",
                linkText: "Lodge IT/Wi-Fi Support Ticket"
            };
        }

        // 12. CENTRAL LIBRARY COMMAND / QUERY
        if (q === "/library" || q.includes("library") || q.includes("book") || q.includes("journal") || q.includes("reading room")) {
            return {
                text: `📚 <strong>Rabindranath Tagore Central Library:</strong><br>` +
                      `• <strong>General Stack Section:</strong> 08:00 AM to 09:00 PM<br>` +
                      `• <strong>24/7 Digital Reading Hall:</strong> Open round-the-clock with student ID card tap.<br>` +
                      `• <strong>Book Borrowing Limit:</strong> 4 books for 14 days per student.<br>` +
                      `• <strong>Digital Portal:</strong> IEEE Xplore, ScienceDirect, and ACM Digital Library available on campus Wi-Fi.`,
                link: "index.html",
                linkText: "Back to Dashboard"
            };
        }

        // 13. CAMPUS HEALTH CLINIC COMMAND / QUERY
        if (q === "/clinic" || q.includes("clinic") || q.includes("doctor") || q.includes("medical") || q.includes("hospital") || q.includes("medicine")) {
            return {
                text: `🏥 <strong>Campus Health &amp; First Aid Center:</strong><br>` +
                      `• <strong>Location:</strong> Health Block East (Adjacent to Sports Complex)<br>` +
                      `• <strong>Physician OPD:</strong> 09:00 AM to 01:00 PM & 04:00 PM to 07:00 PM<br>` +
                      `• <strong>Emergency Nursing & Ambulance:</strong> 24 hours available on call (+91 11 2345 6744)<br>` +
                      `• Free basic medicines, fever management, and first-aid kits are supplied to all enrolled students.`,
                link: "index.html",
                linkText: "View Campus Facilities"
            };
        }

        // 14. TIMETABLE COMMAND / QUERY
        if (q === "/timetable" || q.includes("timetable") || q.includes("class") || q.includes("lecture") || q.includes("schedule")) {
            return {
                text: `📅 <strong>Academic Schedule:</strong><br>` +
                      `Regular classes run Monday through Friday from 09:00 AM to 04:00 PM. Technical seminars and project labs are scheduled on select Saturdays. Check your batch schedule for lab allocations.`,
                link: "timetable.html",
                linkText: "Open Weekly Timetable"
            };
        }

        // 15. Fallback response for unhandled questions
        return {
            text: `I'm not completely certain about that specific query. 🤔 As a campus prototype assistant, I can help you with:<br>` +
                  `• 📊 <strong>/attendance</strong> — Live attendance & bunk simulator<br>` +
                  `• 🍲 <strong>/menu</strong> — Today's mess food & meal timings<br>` +
                  `• 🚪 <strong>/gatepass</strong> — Day pass & hostel outstation leave<br>` +
                  `• 🔧 <strong>/repairs</strong> — Hostel maintenance tickets<br>` +
                  `• 💳 <strong>/fees</strong> — Ledger balances & receipts<br>` +
                  `• 📢 <strong>/notices</strong> — Campus circulars & exam updates<br>` +
                  `• 🧠 <strong>/counselor</strong> — Student mental health support<br>` +
                  `• 🚨 <strong>/sos</strong> — 24/7 Campus safety & emergency help<br>` +
                  `• 🔍 <strong>/lostfound</strong> — Lost & found recovery desk<br><br>` +
                  `Please try rephrasing or click a command chip on the bar above!`,
            link: "index.html",
            linkText: "Visit Campus Dashboard"
        };
    }

    function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }
})();
