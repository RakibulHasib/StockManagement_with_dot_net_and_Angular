using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StockManagement.Model
{
    public class Company
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CompanyId { get; set; }
        public string? CompanyName { get; set; }
        public virtual ICollection<Product> Products { get; set; } = new HashSet<Product>();
        public virtual ICollection<IglooIceCream> IglooIceCreams { get; set; } = new HashSet<IglooIceCream>();
        public virtual ICollection<KaziFarmFood> KaziFarmFoods { get; set; } = new HashSet<KaziFarmFood>();
        public virtual ICollection<LovelloIceCream> LovelloIceCreams { get; set; } = new HashSet<LovelloIceCream>();
        public virtual ICollection<SavoyIceCream> SavoyIceCreams { get; set; } = new HashSet<SavoyIceCream>();
        public virtual ICollection<ZaNZeeIceCream> ZaNZeeIceCreams { get; set; } = new HashSet<ZaNZeeIceCream>();
    }
}
