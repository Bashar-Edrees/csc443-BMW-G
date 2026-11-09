# Mafqoud — Campus Lost & Found

**Course:** CSC443 Web Programming (Fall 2026)  
**Team Name:** BMW-G  
**Topic:** Topic 06 — Campus Lost & Found  
**Brief Code:** `CSC443-F26 · T06 · S05 · rev A`  

## Team Members & Surface Mapping

| Member Name | Student ID | Assigned Surfaces | File Locations |
| :--- | :--- | :--- | :--- |
| **Miguel Saade** | — | 01 (Board), 02 (Browse) | `src/pages/Board.jsx`, `src/pages/Browse.jsx` |
| **George Fayyad** | — | 03 (Notice Detail), 04 (Matches) | `src/pages/ItemDetail.jsx`, `src/pages/Matches.jsx` |
| **Bashar Idris** | 202305424 | 05 (Post a notice), 06 (My notices) | `src/pages/ReportNotice.jsx`, `src/pages/MyNotices.jsx` |
| **Wassim Chalak** | — | 07 (My claims), 08 (Auth) | `src/pages/MyClaims.jsx`, `src/pages/Auth.jsx` |

## Core Entities
- **Notice:** `id`, `kind` (`lost` | `found`), `title`, `category`, `location`, `date`, `description`, `status`, `authorEmail`, `authorName`, `claimsCount`
- **Claim:** `id`, `userInitials`, `userName`, `text`, `date`, `status` (`pending` | `approved` | `rejected`)

## House Rule Implementation
An item can hold at most one approved claim[cite: 3, 5, 9]. Approving a claim automatically transitions all other pending claims for that item to `rejected`[cite: 3, 5, 9].

## How to Run Locally

```bash
# 1. Clone repository
git clone [https://github.com/your-username/mafqoud.git](https://github.com/your-username/mafqoud.git)

# 2. Enter project directory
cd mafqoud

# 3. Install dependencies
npm install

# 4. Run development server
npm run dev