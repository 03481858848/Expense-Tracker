# Expense Tracker API

ASP.NET Core Web API backend for the Expense Tracker application.

## Features

- Full CRUD operations for Expenses
- Full CRUD operations for Categories
- Dashboard reporting endpoints
- Entity Framework Core with SQLite
- CORS configured for React frontend
- Swagger/OpenAPI documentation

## Prerequisites

- .NET 8.0 SDK or later
- Visual Studio 2022 / VS Code / Rider (optional)

## Getting Started

### 1. Restore Dependencies

```bash
dotnet restore
```

### 2. Build the Project

```bash
dotnet build
```

### 3. Run the API

```bash
dotnet run
```

The API will be available at:
- HTTP: http://localhost:5000
- HTTPS: https://localhost:5001
- Swagger UI: http://localhost:5000/swagger

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

- `GET /api/reports/summary` - Get overall expense summary
- `GET /api/reports/category-summary` - Get category-wise expense summary

## Database

The API uses SQLite by default. The database file (`ExpenseTracker.db`) will be created automatically in the project root when you run the application.

### Initial Data

The database is seeded with default categories:
- Food
- Transport
- Shopping
- Bills
- Entertainment
- Healthcare

## Configuration

### Connection String

Edit `appsettings.json` to change the database connection:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=ExpenseTracker.db"
  }
}
```

### CORS

CORS is configured to allow requests from:
- http://localhost:5173 (Vite default)
- http://localhost:3000 (React default)
- http://localhost:5174 (Vite alternate)

To add more origins, edit `Program.cs`:

```csharp
policy.WithOrigins("http://localhost:5173", "https://yourdomain.com")
```

## Frontend Integration

Update your frontend API base URL to:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

Or for HTTPS:
```javascript
const API_BASE_URL = 'https://localhost:5001/api';
```

## Project Structure

```
Tracker-API/
├── Controllers/        # API controllers
├── Data/              # DbContext
├── DTOs/              # Data Transfer Objects
├── Models/            # Entity models
├── Properties/        # Launch settings
├── Program.cs         # Application entry point
└── appsettings.json   # Configuration
```

## Swagger Documentation

When running in Development mode, Swagger UI is available at `/swagger` endpoint for testing all API endpoints.

## License

This project is part of the Expense Tracker application.

