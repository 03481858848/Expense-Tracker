namespace Tracker.API.DTOs
{
    public class SummaryDto
    {
        public decimal TotalExpenses { get; set; }
        public decimal MonthlyExpenses { get; set; }
        public int CategoryCount { get; set; }
    }

    public class CategorySummaryDto
    {
        public string Category { get; set; } = string.Empty;
        public decimal Total { get; set; }
        public int Count { get; set; }
    }
}

