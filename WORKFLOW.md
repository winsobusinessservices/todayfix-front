# Todayfix Platform Workflow & Task Tracker

This document serves as the master checklist and workflow tracker for the Todayfix platform development. It tracks what has been completed and what is pending across all three core platform domains (Customer, Admin, Owner).

---

## 1. Owner Portal (Vendor Dashboard)

### ✅ Completed
- [x] **App Shell Layout (`OwnerDashboard.jsx`):** Responsive sidebar, top header, and mobile drawer setup.
- [x] **Overview Tab (`OverviewTab.jsx`):** Functional metrics and dismissible Action Alerts.
- [x] **Bookings Tab (`BookingsTab.jsx`):** Ability to Accept/Decline pending jobs, and Mark Complete accepted jobs using local state. Status filtering included.
- [x] **Services Tab (`ServicesTab.jsx`):** Add/Edit/Delete services via modal, and active/inactive toggle.
- [x] **Portfolio Tab (`PortfolioTab.jsx`):** Profile details form with saving state. Mock upload and deletion for gallery images.
- [x] **Reviews Tab (`ReviewsTab.jsx`):** Ability to draft and submit replies to customer testimonials.
- [x] **Settings Tab (`SettingsTab.jsx`):** Notification toggles (Vacation mode, SMS, Email) and functional password update form.
- [x] **Financials Tab (`FinancialsTab.jsx`):** Functional "Withdraw Funds" modal that simulates processing, deducts balance, and adds a transaction record.
- [x] **Global Styling Enforcement:** All owner components strictly follow the dark monochrome glass-shadow aesthetic (`rounded-3xl`, `shadow-2xl shadow-black/5`).

- [x] **Job Board Tab (`JobBoardTab.jsx`):** Created the marketplace board where owners view broadcasted jobs with masked details and Admin's offered price. Added simulated WebSocket pop-up.
- [x] **Verification Lock State:** Enforced a locked UI and routing isolation over the dashboard if the business's `isVerified` status is false.

### ⏳ Pending
- [ ] **Individual Provider Flow:** Modify `ListBusinessPage` and `BusinessDocumentsPage` to allow individuals (freelancers) to sign up without requiring a business name or trade license.

---

## 2. Customer Portal (Regular User)

### ✅ Completed
- [x] **Public Pages:** Initial implementation of `Home.jsx`, `AboutUs.jsx`, `Services.jsx`, `Service.jsx`, `Area.jsx`, `Vendor.jsx`.
- [x] **Authentication:** Basic UI for `Login.jsx` and `Register.jsx`.
- [x] **List Business Flow (`ListBusinessPage.jsx`):** The conversion flow page for a regular user applying to be an owner.
- [x] **Request Service Flow (`RequestService.jsx`):** Form wizard built for customers to input Service Category, Description, Budget, and Location to dispatch a request.
- [x] **Customer Dashboard (`ProfileRequests.jsx`):** Built the "My Requests" tab inside `Profile.jsx` to show the user's active requests and their status (Pending Admin, Looking for Vendors, Accepted).

### ⏳ Pending
- [ ] **Leave a Review:** A post-service modal/page to submit a 1-5 star rating and comment.

---

## 3. Admin Portal (Super Admin)

### ✅ Completed
- *(No dedicated Admin portal components built yet)*

### ⏳ Pending
- [ ] **Admin App Shell (`AdminDashboard.jsx`):** Create the base layout (similar to Owner Dashboard but distinct, using a Blue/Indigo accent color).
- [ ] **Moderation Queue (`RequestsTab.jsx`):** UI to view incoming customer requests, input the platform commission to calculate the `Vendor Offer Price`, and click "Broadcast".
- [ ] **Verification Queue (`VerificationTab.jsx`):** UI to view pending onboarding applications (both Companies and Individuals), review their uploaded documents, and approve/reject them.

---

## 4. Architecture & State Integration

### ✅ Completed
- [x] Define `README.md` outlining the 3-sided marketplace architecture and entities.

### ⏳ Pending
- [ ] **Mock Global State Engine:** Set up React Context or Zustand to manage a global `ServiceRequest` array and `Business` array. This is required to simulate a job moving from Customer -> Admin -> Owner without a backend.
- [ ] **Role-Based Routing:** Implement protected routes ensuring Customers cannot access the Admin dashboard, and unverified Owners get restricted access.
- [ ] **Backend Integration:** Replace the mock global state with actual API calls, websockets, and database architecture.
