namespace Tracker.API.DTOs
{
    public class ExpenseDto
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string Category { get; set; } = string.Empty;
        public string? Notes { get; set; }
    }

    public class CreateExpenseDto
    {
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string Category { get; set; } = string.Empty;
        public string? Notes { get; set; }
    }

    public class UpdateExpenseDto
    {
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string Category { get; set; } = string.Empty;
        public string? Notes { get; set; }
    }
}

