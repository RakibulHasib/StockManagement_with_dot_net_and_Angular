using System.ComponentModel.DataAnnotations;

namespace StockManagement.Model
{
    public class RoleAssagin
    {
        [Key]
        public int RoleAssaginId { get; set; }
        public int RoleId { get; set; }
        public int UserId { get; set; }
    }
}
