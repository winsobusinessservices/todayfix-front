# Todayfix Platform Architecture & Workflow

This document outlines the architecture, workflow, required pages, and data entities for the Todayfix platform. Todayfix operates as a 3-sided marketplace connecting Customers, Admins, and Service Providers (Business Owners).

---

## 1. Core Workflow

The platform handles service requests via a "Middleman" (Admin) model to manage pricing and vendor privacy.

1. **Customer Request:** A regular user (Customer) submits a service request, including the required service category, a description, their budget, and their general location. *They do not select a specific vendor.*
2. **Admin Moderation:** The Super Admin receives the request, reviews the customer's budget (e.g., ₹1000), and calculates the platform's commission. The Admin then sets a "Vendor Offer Price" (e.g., ₹900) and broadcasts the request to nearby verified businesses.
3. **Vendor Broadcast & Priority:** Verified Business Owners in the vicinity receive the broadcasted job. 
   - **Pro/Enterprise Advantage:** Businesses with active subscriptions receive high-authority privileges, meaning they get notified of new service requests earlier than free-tier businesses, giving them first dibs on lucrative jobs.
   - To protect privacy, they only see masked details (e.g., "Customer #1042", "Area: Andheri West (~3km)", "Offer: ₹900").
4. **Job Acceptance & Coordination:** A Business Owner accepts the job. Upon acceptance, the full customer details (Exact Name, Precise Address, Phone Number) are revealed, and the job moves to their active Bookings. An in-app chat opens for coordination.
5. **Completion & Reviews:** Once the job is completed, the customer can leave a rating and review (testimonial) for the service provider. The provider can view and reply to these reviews on their dashboard.
6. **Business Onboarding:** Regular users can convert to Business Owners by submitting a listing form. However, their business remains inactive and cannot receive broadcasts until they upload verification documents and the Admin manually verifies the business.
7. **Subscription Tiers:** By default, a free owner can list 1 business. Subscribing to Pro/Enterprise allows listing multiple businesses (each requiring separate admin verification) and grants priority job broadcasting.

---

## 2. Recommended Platform Features (Suggestions)

To make the platform robust and trustworthy, the following systems are recommended for future implementation:
*   **Dispute Resolution / Support Ticket System:** A flow for customers or vendors to raise an issue with the Admin if a service goes wrong or a payment is disputed.
*   **In-App Messaging:** A secure chat system that activates only *after* a vendor accepts a job, allowing the customer and vendor to communicate without sharing personal phone numbers immediately.
*   **Quality Control (Rating Thresholds):** An automated system that temporarily suspends a business if their average review rating drops below a certain threshold (e.g., 3.5 stars), requiring Admin intervention.
*   **Escrow / Wallet System:** Customers pay the platform upfront. The funds are held in escrow and released to the vendor's digital wallet only upon job completion, preventing fraud.

---

## 3. Required Pages & UI Flow

### Customer Portal
*   **`/` (Home):** Landing page explaining the platform and services.
*   **`/request-service`:** A form wizard to capture service needs, budget, and location.
*   **`/my-requests`:** Customer dashboard showing the status of their requests (Pending Admin, Looking for Vendors, Accepted, Completed).
*   **`/reviews/new`:** A post-service flow for customers to rate and review the business.
*   **`/list-business`:** CTA page to convert a regular user to a business owner. Multi-step form for Business Details, Service Categories, and Document Uploads.

### Admin Portal (Super Admin)
*   **`/admin` (Admin Dashboard):** High-level metrics on platform volume and revenue.
*   **`/admin/requests` (Job Moderation):** Queue of customer requests. Admin inputs the Vendor Offer Price and clicks "Broadcast".
*   **`/admin/verifications`:** Queue of pending business listings. Admin reviews uploaded licenses/ID proofs and clicks "Verify" or "Reject".
*   **`/admin/users` & `/admin/disputes`:** Management of all users and support tickets.

### Owner (Vendor) Portal
*   **`/owner-dashboard`:** Shell layout with sidebar navigation.
*   **`/owner-dashboard/overview`:** Summary metrics. If unverified, shows a massive locked banner blocking access to jobs.
*   **`/owner-dashboard/job-board`:** Shows broadcasted requests. *Subscribed users see these immediately, free users see them with a delay.*
*   **`/owner-dashboard/bookings`:** Active and past jobs. Full customer details are visible here.
*   **`/owner-dashboard/services`:** Manage offered services and base pricing.
*   **`/owner-dashboard/portfolio`:** Manage business public profile, logo, and work gallery.
*   **`/owner-dashboard/reviews`:** View and reply to customer feedback/testimonials.
*   **`/owner-dashboard/financials`:** Track earnings from completed jobs and request payouts.

---

## 4. Core Data Entities

### User (`User`)
*   `id`: String (UUID)
*   `role`: Enum (`CUSTOMER`, `OWNER`, `ADMIN`)
*   `name`: String
*   `email`: String
*   `phone`: String
*   `subscriptionTier`: Enum (`FREE`, `PRO`, `ENTERPRISE`)

### Business (`Business`)
*   `id`: String (UUID)
*   `ownerId`: String (FK to User)
*   `name`: String
*   `about`: String
*   `location`: Object (lat, lng, address, pincode)
*   `documents`: Array of Strings (URLs to uploaded verification docs)
*   `isVerified`: Boolean (Default: false)
*   `status`: Enum (`PENDING`, `ACTIVE`, `REJECTED`, `SUSPENDED`)
*   `servicesOffered`: Array of Strings (Categories)
*   `averageRating`: Number
*   `totalReviews`: Number

### Service Request (`ServiceRequest`)
*   `id`: String (UUID)
*   `customerId`: String (FK to User)
*   `serviceCategory`: String
*   `description`: String
*   `customerBudget`: Number (e.g., 1000)
*   `generalLocation`: String (e.g., "Andheri West, Mumbai")
*   `preciseLocation`: String (Full address, hidden from broadcast)
*   `adminOfferPrice`: Number (e.g., 900, set by admin)
*   `status`: Enum (`PENDING_ADMIN`, `BROADCASTED`, `ACCEPTED`, `COMPLETED`, `CANCELLED`, `DISPUTED`)
*   `acceptedByBusinessId`: String (FK to Business, null until accepted)
*   `createdAt`: Timestamp

### Review (`Review`)
*   `id`: String (UUID)
*   `serviceRequestId`: String (FK to ServiceRequest)
*   `businessId`: String (FK to Business)
*   `customerId`: String (FK to User)
*   `rating`: Number (1-5)
*   `comment`: String
*   `vendorReply`: String (Nullable)
*   `createdAt`: Timestamp

---

## 5. Implementation Plan

This outlines the frontend-first development strategy to mock these flows before backend integration.

### Phase 1: Authentication & Routing Setup
*   Implement role-based routing (Customer vs. Admin vs. Owner).
*   Create a mock authentication context that allows switching between the 3 roles for testing purposes.

### Phase 2: Business Onboarding & Admin Verification
*   Build the `/list-business` multi-step form with mock file uploads.
*   Build the Admin `/admin/verifications` UI to display the pending business and allow the Admin to toggle `isVerified`.
*   Update the Owner Dashboard to strictly enforce the "Unverified Locked State".

### Phase 3: The Request Engine (Customer -> Admin -> Owner)
*   **Customer:** Build the Service Request form and the Review submission modal.
*   **Admin:** Build the Moderation queue where the Admin sets the `adminOfferPrice` and broadcasts.
*   **Owner:** Build the `JobBoardTab` where verified owners see masked broadcasted jobs (with priority logic mocked) and can accept them.
*   Wire these three together using a global mock state (e.g., React Context or Zustand) to demonstrate the real-time flow of a request passing through the marketplace.

### Phase 4: Backend Integration (Future)
*   Replace the global mock state with actual API calls to the database.
*   Implement real WebSocket or polling subscriptions for job broadcasts and status updates.
