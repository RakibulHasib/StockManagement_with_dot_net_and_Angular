using System.ComponentModel.DataAnnotations;

namespace StockManagement.Model
{
    public class RoleMaster
    {
        [Key]
        public int RoleId { get; set; }
        public string RoleName { get; set; } = default!;
        
    }
}
