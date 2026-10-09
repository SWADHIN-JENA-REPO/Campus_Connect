/**
 * CampusConnect AI — Shared Application Scripts & Shell Interactivity
 * File: script.js
 * 
 * Provides:
 * - App shell layout initialization
 * - Role-based authorization & Admin Passcode prompt
 * - Toast alert notification manager
 * - Modal dialog controller
 * - Campus SOS Emergency trigger
 */

document.addEventListener("DOMContentLoaded", () => {
    initAppShell();
});

/**
 * Initializes the common App Shell (Sidebar, Navbar, User Header, Toasts)
 */
function initAppShell() {
    if (!window.CampusData) {
        console.error("CampusData engine missing. Ensure data.js is loaded prior to script.js.");
        return;
    }

    const currentUser = window.CampusData.getCurrentUser();
    const activeRole = window.CampusData.getActiveRole();

    // 1. Populate user info across elements
    const userNameEls = document.querySelectorAll(".current-user-name");
    const userRoleEls = document.querySelectorAll(".current-user-role");
    const userAvatarEls = document.querySelectorAll(".current-user-avatar");
    const userDeptEls = document.querySelectorAll(".current-user-dept");

    userNameEls.forEach(el => el.textContent = currentUser.name);
    userRoleEls.forEach(el => {
        el.textContent = activeRole === 'admin' ? "Administrator" : "Student";
    });
    userDeptEls.forEach(el => {
        el.textContent = activeRole === 'admin' ? (currentUser.designation || "Administrator") : (currentUser.program || "Student");
    });

    userAvatarEls.forEach(el => {
        const initials = currentUser.avatar || currentUser.name
            .trim()
            .split(" ")
            .map(n => n[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
        el.textContent = initials;
    });

    // 2. Highlight active navigation links
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".sidebar-nav .nav-link");
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPath || (currentPath === "" && href === "index.html")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // 3. Mobile sidebar drawer toggling
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const sidebar = document.querySelector(".app-sidebar");
    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            sidebar.classList.toggle("open");
        });

        document.addEventListener("click", (e) => {
            if (window.innerWidth <= 768 && sidebar.classList.contains("open")) {
                if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    sidebar.classList.remove("open");
                }
            }
        });
    }

    // 4. Ensure Toast container exists
    if (!document.getElementById("toast-container")) {
        const toastContainer = document.createElement("div");
        toastContainer.id = "toast-container";
        document.body.appendChild(toastContainer);
    }

    // 5. ESC key modal closer
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            const activeModal = document.querySelector(".modal-overlay.active");
            if (activeModal) {
                activeModal.classList.remove("active");
            }
        }
    });
}

/**
 * Global Toast Notification Helper
 * @param {string} message 
 * @param {'success'|'error'|'warning'|'info'} type 
 */
function showToast(message, type = "info") {
    const container = document.getElementById("toast-container") || (() => {
        const c = document.createElement("div");
        c.id = "toast-container";
        document.body.appendChild(c);
        return c;
    })();

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    let icon = "ℹ️";
    if (type === "success") icon = "✅";
    if (type === "error") icon = "⚠️";
    if (type === "warning") icon = "🔔";

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(50px)";
        toast.style.transition = "all 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

/**
 * Modal Open & Close Utilities
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add("active");
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove("active");
    }
}

/**
 * Status Pill Formatter
 */
function getStatusBadge(status) {
    const s = (status || "").toLowerCase();
    if (s === "approved" || s === "resolved" || s === "paid" || s === "good" || s === "confirmed" || s === "active") {
        return `<span class="badge badge-approved">● ${status}</span>`;
    }
    if (s === "pending" || s === "in review" || s === "warning" || s === "dispatched") {
        return `<span class="badge badge-pending">● ${status}</span>`;
    }
    if (s === "in progress") {
        return `<span class="badge badge-progress">● ${status}</span>`;
    }
    if (s === "rejected" || s === "low" || s === "urgent") {
        return `<span class="badge badge-rejected">● ${status}</span>`;
    }
    return `<span class="badge badge-neutral">${status}</span>`;
}

/**
 * Role Switcher with Master Admin Security Passcode Protection
 */
function switchUserRole(targetRole) {
    if (targetRole === 'admin') {
        const currentRole = window.CampusData.getActiveRole();
        if (currentRole !== 'admin') {
            const enteredKey = prompt("🔒 Restricted Access: Enter Institutional Admin Master Passcode to proceed:\n(Demo Key: ADMIN@CAMPUS2026)");
            if (enteredKey === null) return; // User cancelled
            
            if (!window.CampusData.verifyAdminPasscode(enteredKey)) {
                showToast("Access Denied: Invalid Admin Security Key.", "error");
                return;
            }
        }
    }

    window.CampusData.setActiveRole(targetRole);
    showToast(`Switched active profile to ${targetRole.toUpperCase()}`, "info");
    setTimeout(() => {
        if (targetRole === "admin") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "index.html";
        }
    }, 300);
}

/**
 * Global Campus Emergency SOS Trigger
 */
function triggerCampusSOS() {
    const confirmed = confirm("🚨 ACTIVATE EMERGENCY CAMPUS SOS?\n\nThis will instantly dispatch your location and emergency alert to Campus Security Control and Health Center Dispatch.");
    if (!confirmed) return;

    const loc = prompt("Confirm your current campus location or room:", "Hostel Block B, Room 204");
    if (!loc) return;

    const alert = window.CampusData.triggerEmergencySOS({
        type: "Medical / Security Urgent SOS",
        location: loc
    });

    showToast(`🚨 SOS Dispatch ${alert.id} Activated! Campus security & medical team notified.`, "error");
}

/**
 * Logout
 */
function logoutUser() {
    window.CampusData.setActiveRole("student");
    window.location.href = "login.html";
}
