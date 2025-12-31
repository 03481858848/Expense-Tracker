using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tracker.API.Data;
using Tracker.API.DTOs;

namespace Tracker.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ReportsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ReportsController> _logger;

        public ReportsController(ApplicationDbContext context, ILogger<ReportsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/reports/summary
        [HttpGet("summary")]
        public async Task<ActionResult<SummaryDto>> GetSummary()
        {
            try
            {
                // Handle null case when no expenses exist - SQLite requires double conversion
                var totalExpenses = await _context.Expenses
                    .SumAsync(e => (double?)e.Amount) ?? 0;
                var totalExpensesDecimal = (decimal)totalExpenses;

                var currentMonth = DateTime.UtcNow.Month;
                var currentYear = DateTime.UtcNow.Year;
                var monthlyExpenses = await _context.Expenses
                    .Where(e => e.Date.Month == currentMonth && e.Date.Year == currentYear)
                    .SumAsync(e => (double?)e.Amount) ?? 0;
                var monthlyExpensesDecimal = (decimal)monthlyExpenses;

                var categoryCount = await _context.Categories.CountAsync();

                var summary = new SummaryDto
                {
                    TotalExpenses = totalExpensesDecimal,
                    MonthlyExpenses = monthlyExpensesDecimal,
                    CategoryCount = categoryCount
                };

                return Ok(summary);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching summary: {Message}", ex.Message);
                return StatusCode(500, new { message = "An error occurred while fetching the summary", error = ex.Message });
            }
        }

        // GET: api/reports/category-summary
        [HttpGet("category-summary")]
        public async Task<ActionResult<IEnumerable<CategorySummaryDto>>> GetCategorySummary()
        {
            try
            {
                // Handle empty expenses case
                var hasExpenses = await _context.Expenses.AnyAsync();
                if (!hasExpenses)
                {
                    return Ok(new List<CategorySummaryDto>());
                }

                var categorySummary = await _context.Expenses
                    .GroupBy(e => e.Category)
                    .Select(g => new CategorySummaryDto
                    {
                        Category = g.Key,
                        Total = g.Sum(e => e.Amount),
                        Count = g.Count()
                    })
                    .OrderByDescending(c => c.Total)
                    .ToListAsync();

                return Ok(categorySummary);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching category summary: {Message}", ex.Message);
                return StatusCode(500, new { message = "An error occurred while fetching the category summary", error = ex.Message });
            }
        }
    }
}

