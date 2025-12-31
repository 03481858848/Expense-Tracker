using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tracker.API.Data;
using Tracker.API.DTOs;
using Tracker.API.Models;

namespace Tracker.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ExpensesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ExpensesController> _logger;

        public ExpensesController(ApplicationDbContext context, ILogger<ExpensesController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/expenses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExpenseDto>>> GetExpenses()
        {
            try
            {
                var expenses = await _context.Expenses
                    .OrderByDescending(e => e.Date)
                    .ThenByDescending(e => e.CreatedAt)
                    .Select(e => new ExpenseDto
                    {
                        Id = e.Id,
                        Amount = e.Amount,
                        Date = e.Date,
                        Category = e.Category,
                        Notes = e.Notes
                    })
                    .ToListAsync();

                return Ok(expenses);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching expenses");
                return StatusCode(500, new { message = "An error occurred while fetching expenses" });
            }
        }

        // GET: api/expenses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExpenseDto>> GetExpense(int id)
        {
            try
            {
                var expense = await _context.Expenses.FindAsync(id);

                if (expense == null)
                {
                    return NotFound(new { message = $"Expense with id {id} not found" });
                }

                var expenseDto = new ExpenseDto
                {
                    Id = expense.Id,
                    Amount = expense.Amount,
                    Date = expense.Date,
                    Category = expense.Category,
                    Notes = expense.Notes
                };

                return Ok(expenseDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching expense {Id}", id);
                return StatusCode(500, new { message = "An error occurred while fetching the expense" });
            }
        }

        // POST: api/expenses
        [HttpPost]
        public async Task<ActionResult<ExpenseDto>> CreateExpense(CreateExpenseDto createDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var expense = new Expense
                {
                    Amount = createDto.Amount,
                    Date = createDto.Date,
                    Category = createDto.Category,
                    Notes = createDto.Notes,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Expenses.Add(expense);
                await _context.SaveChangesAsync();

                var expenseDto = new ExpenseDto
                {
                    Id = expense.Id,
                    Amount = expense.Amount,
                    Date = expense.Date,
                    Category = expense.Category,
                    Notes = expense.Notes
                };

                return CreatedAtAction(nameof(GetExpense), new { id = expense.Id }, expenseDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating expense");
                return StatusCode(500, new { message = "An error occurred while creating the expense" });
            }
        }

        // PUT: api/expenses/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExpense(int id, UpdateExpenseDto updateDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var expense = await _context.Expenses.FindAsync(id);

                if (expense == null)
                {
                    return NotFound(new { message = $"Expense with id {id} not found" });
                }

                expense.Amount = updateDto.Amount;
                expense.Date = updateDto.Date;
                expense.Category = updateDto.Category;
                expense.Notes = updateDto.Notes;
                expense.UpdatedAt = DateTime.UtcNow;

                _context.Entry(expense).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ExpenseExists(id))
                    {
                        return NotFound(new { message = $"Expense with id {id} not found" });
                    }
                    throw;
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating expense {Id}", id);
                return StatusCode(500, new { message = "An error occurred while updating the expense" });
            }
        }

        // DELETE: api/expenses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            try
            {
                var expense = await _context.Expenses.FindAsync(id);
                if (expense == null)
                {
                    return NotFound(new { message = $"Expense with id {id} not found" });
                }

                _context.Expenses.Remove(expense);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting expense {Id}", id);
                return StatusCode(500, new { message = "An error occurred while deleting the expense" });
            }
        }

        private bool ExpenseExists(int id)
        {
            return _context.Expenses.Any(e => e.Id == id);
        }
    }
}

