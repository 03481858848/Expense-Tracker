# Expense Tracker - Full Stack Application

A full-stack expense tracking application with a React frontend and ASP.NET Core Web API backend.

## Features

- ✅ Full CRUD operations for Expenses
- ✅ Full CRUD operations for Categories
- ✅ Dashboard with summary statistics and charts
- ✅ Reports with monthly and category-wise summaries
- ✅ Filter expenses by category and date range
- ✅ Loading states and error handling
- ✅ CORS configured for local development
- ✅ SQLite database (easy to switch to SQL Server)

## Tech Stack

### Backend
- ASP.NET Core 8.0 Web API
- Entity Framework Core
- SQLite (can be changed to SQL Server)
- Swagger/OpenAPI for API documentation

### Frontend
- React 18
- Vite
- Axios for API calls
- Bootstrap 5
- Chart.js for data visualization
- React Router for navigation

## Prerequisites

Before you begin, ensure you have the following installed:

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Project Structure

```
Expense-Tracker/
├── Tracker-API/          # ASP.NET Core Web API Backend
│   ├── Controllers/      # API Controllers
│   ├── Data/             # DbContext and Database
│   ├── DTOs/             # Data Transfer Objects
│   ├── Models/           # Entity Models
│   └── Program.cs         # Application entry point
│
└── Tracker-Client/       # React Frontend
    ├── src/
    │   ├── components/  # React components
    │   ├── pages/        # Page components
    │   ├── utils/        # Utilities (API, auth, etc.)
    │   └── styles/       # CSS styles
    └── package.json      # Frontend dependencies
```

## Quick Start (Easiest Method)

### Option 1: Using Scripts (Recommended)

**Windows:**
1. **Start Backend:** Double-click `START-BACKEND.bat` or run `.\START-BACKEND.ps1` in PowerShell
2. **Start Frontend:** Open a new terminal and double-click `START-FRONTEND.bat` or run `.\START-FRONTEND.ps1`

**Note:** Keep both terminals open - the backend must be running for the frontend to work!

### Option 2: Manual Setup

### Step 1: Backend Setup

1. **Open a terminal/command prompt and navigate to the backend directory:**
   ```bash
   cd Tracker-API
   ```

2. **Restore and build the project:**
   ```bash
   dotnet restore
   dotnet build
   ```

3. **Run the backend:**
   ```bash
   dotnet run
   ```

   The API will start on:
   - HTTP: `http://localhost:5000`
   - Swagger UI: `http://localhost:5000/swagger`

   **Important:** Keep this terminal open! The backend must stay running.

   **Note:** The database (SQLite) will be automatically created on first run in the `Tracker-API` directory as `ExpenseTracker.db`.

### Step 2: Frontend Setup

1. **Open a NEW terminal/command prompt** (keep the backend terminal running) and navigate to the frontend directory:
   ```bash
   cd Tracker-Client
   ```

2. **Install dependencies (first time only):**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173` (or another port if 5173 is busy).

   **Important:** The backend must be running on `http://localhost:5000` for the frontend to work!

### Step 3: Access the Application

1. **VERIFY BACKEND IS RUNNING FIRST:**
   - Open `http://localhost:5000/swagger` in your browser
   - You should see the Swagger API documentation
   - If you see an error, the backend is not running - go back to Step 1

2. Open your browser and navigate to `http://localhost:5173`
3. Login with:
   - **Email:** `admin@test.com`
   - **Password:** `123456`

### ⚠️ TROUBLESHOOTING: "Unable to connect to server" Error

**This error means the backend is not running!**

**Quick Fix:**
1. Open a terminal and run:
   ```bash
   cd Tracker-API
   dotnet run
   ```
2. Wait for "Now listening on: http://localhost:5000"
3. Keep that terminal open
4. Refresh your browser

**OR use the startup script:**
- Double-click `START-BACKEND.bat` in the project root
- Wait for it to start, then refresh your browser

**See `QUICK-START.md` for detailed troubleshooting steps.**

## API Endpoints

### Expenses
- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/{id}` - Get expense by ID
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/{id}` - Update expense
- `DELETE /api/expenses/{id}` - Delete expense

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/{id}` - Get category by ID
- `POST /api/categories` - Create new category
- `PUT /api/categories/{id}` - Update category
- `DELETE /api/categories/{id}` - Delete category

### Reports
- `GET /api/reports/summary` - Get summary statistics
- `GET /api/reports/category-summary` - Get category-wise summary

## Testing the Application

### Test CRUD Operations

1. **Create an Expense:**
   - Navigate to "Add Expense"
   - Fill in the form (Amount, Date, Category, Notes)
   - Click "Add Expense"
   - Verify the expense appears in the Expense List

2. **View Expenses:**
   - Navigate to "Expense List"
   - Verify all expenses are displayed
   - Test filtering by category and date range

3. **Edit an Expense:**
   - Click "Edit" on any expense
   - Modify the details
   - Click "Update Expense"
   - Verify changes are reflected

4. **Delete an Expense:**
   - Click "Delete" on any expense
   - Confirm deletion
   - Verify the expense is removed

5. **Manage Categories:**
   - Navigate to "Categories"
   - Add a new category
   - Edit an existing category
   - Delete a category (if not used by expenses)

### Test Dashboard Reports

1. **View Dashboard:**
   - Navigate to "Dashboard"
   - Verify:
     - Total Expenses is displayed correctly
     - Monthly Expenses shows current month total
     - Category count is accurate
     - Charts display data correctly

2. **View Reports:**
   - Navigate to "Reports"
   - Verify:
     - Monthly totals chart displays correctly
     - Category totals chart displays correctly
     - Summary cards show correct values

## Configuration

### Backend Configuration

The backend configuration is in `Tracker-API/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=ExpenseTracker.db"
  }
}
```

To use SQL Server instead of SQLite, update the connection string and change the DbContext configuration in `Program.cs`.

### Frontend Configuration

The API base URL is configured in `Tracker-Client/src/utils/api.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
```

You can override this by creating a `.env` file in `Tracker-Client`:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

### CORS Configuration

CORS is already configured in `Tracker-API/Program.cs` to allow requests from:
- `http://localhost:5173` (Vite default)
- `http://localhost:3000`
- `http://localhost:5174`

If your frontend runs on a different port, update the CORS policy in `Program.cs`.

## Troubleshooting

### Backend Issues

1. **"Unable to connect to the server" error:**
   - **Most common cause:** The backend is not running!
   - **Solution:** Start the backend first (see Setup Instructions above)
   - Verify backend is running by visiting `http://localhost:5000/swagger` in your browser
   - Check that you see "Expense Tracker API" in the Swagger page

2. **Port already in use:**
   - Change the port in `Properties/launchSettings.json`
   - Or stop the process using port 5000:
     ```powershell
     # Find process using port 5000
     netstat -ano | findstr :5000
     # Kill the process (replace PID with the number from above)
     taskkill /PID <PID> /F
     ```

3. **Database errors:**
   - Delete `ExpenseTracker.db` and restart the backend
   - The database will be recreated automatically

4. **CORS errors:**
   - Verify the frontend URL is in the CORS allowed origins
   - Check that CORS middleware is before other middleware in `Program.cs`
   - Make sure backend is running on `http://localhost:5000` (not HTTPS)

### Frontend Issues

1. **Cannot connect to API:**
   - Verify the backend is running on `http://localhost:5000`
   - Check the API base URL in `src/utils/api.js`
   - Check browser console for CORS errors

2. **Network errors:**
   - Ensure both frontend and backend are running
   - Check that the backend URL is correct
   - Verify CORS is properly configured

3. **Loading states not showing:**
   - Check browser console for JavaScript errors
   - Verify all dependencies are installed (`npm install`)

### Common Issues

1. **HTTPS/HTTP mismatch:**
   - The backend runs on HTTP in development (no HTTPS redirection)
   - The frontend should use HTTP (not HTTPS)
   - If you see certificate errors, ensure you're using `http://` not `https://`

2. **Data not persisting:**
   - Check that the database file exists
   - Verify Entity Framework migrations are applied
   - Check backend logs for errors

## Development

### Backend Development

- API documentation is available at `/swagger` when running in Development mode
- Database changes require Entity Framework migrations:
  ```bash
  dotnet ef migrations add MigrationName
  dotnet ef database update
  ```

### Frontend Development

- Hot module replacement is enabled in development
- Changes to React components will reload automatically
- Check browser console for errors and warnings

## Production Deployment

### Backend

1. Build for production:
   ```bash
   dotnet publish -c Release
   ```

2. Update `appsettings.json` for production settings
3. Configure HTTPS and update CORS for production domain
4. Set up SQL Server or PostgreSQL for production database

### Frontend

1. Build for production:
   ```bash
   npm run build
   ```

2. The `dist` folder contains the production build
3. Serve using a web server (nginx, IIS, etc.)
4. Update API base URL to production API endpoint

## License

This project is open source and available for educational purposes.

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Check that both frontend and backend are running
4. Review browser console and backend logs for errors

---

**Happy Expense Tracking! 💰**

