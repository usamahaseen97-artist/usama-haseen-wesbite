# Security Specification for Usama Haseen Portfolio

## Data Invariants
- An order must have a valid service type, client email, and message.
- Orders are public for submission but private for viewing (only the admin).
- Admin status is managed by a secure collection that cannot be modified by users.

## The Dirty Dozen Payloads (Rejection Tests)
1. **Unauthenticated Read:** `get /orders/someId` -> DENIED
2. **Anonymous Order Submission:** `create /orders/` (if we require auth, but user wants anyone to place orders).
   - *Correction:* The user said "log apko order place kr sken", usually these are public forms. I'll allow unauthenticated create but restrict read.
3. **Ghost Field in Order:** `create /orders/` with `{ "ghost": "payload" }` -> DENIED (Strict schema)
4. **Spoofed Admin Check:** `get /orders/someId` with a user profile having `isAdmin: true` set by the user themselves -> DENIED (Rules check `admins` collection)
5. **Modification of createdAt:** `update /orders/` changing `createdAt` -> DENIED
6. **Malicious ID:** `create /orders/VERY_LONG_ID_...` -> DENIED (isValidId)
7. **Invalid Email:** `create /orders/` with `clientEmail: "not-an-email"` -> DENIED
8. **Large Message:** `create /orders/` with 2MB message -> DENIED
9. **Status Manipulation by Client:** `create /orders/` with `status: "completed"` -> DENIED (Should start as "pending")
10. **Reading other users profiles:** `get /users/someoneElse` -> DENIED
11. **Listing orders:** `list /orders` as non-admin -> DENIED
12. **Injected Budget:** `create /orders/` with `budget: "string"` where number expected -> DENIED

## Test Plan
I will use the rules logic to ensure these are blocked.
