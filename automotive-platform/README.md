# Vehicle Diagnostics Dashboard

A fullstack Angular + Node.js (Express) diagnostics dashboard to search, filter, and view logs generated from connected vehicles.

---

## Tech Stack

- **Frontend**: Angular 17 (standalone components, CDK virtual scroll, reactive forms)
- **Backend**: Node.js + Express.js (REST API with query filters)
- **Styling**: SCSS
- **Virtualization**: Angular CDK Virtual Scroll

---

##  Project Setup

###  Frontend (Angular)

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   npm install
   ng serve
   http://localhost:4200
   ```

###  Backend (Node.js + Express)

1.  Navigate to the backend directory:

    ```bash
    cd backend
    npm run start:dev
    http://localhost:3000

    ```

    ### Architecture Overview

    [ SearchPanelComponent ] <-- Emits filters
    ↓
    [ AppComponent ]
    ↓
    [ LogTableComponent ] <-- Receives logs

        +-------------------------+
        |      Angular Frontend   |
        +-------------------------+

                 ⇅ API Calls

        +-------------------------+
        |   Express.js Backend    |
        | - GET /logs             |
        +-------------------------+

---

##  Data Flow

1. User inputs: Vehicle ID, error code, keyword, and date range (from–to).
2. Angular app builds a query string and makes a `GET /logs` request.
3. Backend filters logs based on query parameters and returns the filtered results.
4. Frontend displays logs using virtual scrolling for optimal performance.

---

##  Design Decisions & Assumptions

###  Design Decisions

- **Angular Standalone Components**: Enables faster compilation and modular code structure.
- **CDK Virtual Scroll**: Efficiently renders large datasets without performance issues.
- **Reactive Forms**: Provides robust form state tracking and validation support.
- **SCSS Utility Classes**: Simplifies styling with customizable, maintainable styles.

### Assumptions

- Diagnostic logs are currently stored in-memory or mock `.log` files (no database used yet).
- `keyword` filter is applied on both message and error code fields.
- Timestamp range filter uses ISO date strings (`YYYY-MM-DD`) and is handled on the server.
- Backend is responsible for filtering logs before sending them to the frontend.

---

## 📘 API Documentation

### Base URL
http://localhost:3000



### `GET /logs`

Fetches a filtered list of diagnostic logs.



---

##  No Data Found Page

When no logs match the selected filters, the UI displays the following message:



#### Query Parameters

| Parameter | Type     | Description                          |
|-----------|----------|--------------------------------------|
| `vehicle` | `string` | Filter logs by Vehicle ID            |
| `code`    | `string` | Filter logs by error code            |
| `from`    | `string` | Start timestamp (ISO `YYYY-MM-DD`)   |
| `to`      | `string` | End timestamp (ISO `YYYY-MM-DD`)     |
| `keyword` | `string` | Match in error code or message       |

#### Example Request





### 1. Clone the repository

```bash
git clone https://github.com/Saksham833/Vehicle-Diagnostics-Dashboard.git
cd Vehicle-Diagnostics-Dashboard
cd automotive-platform
```
