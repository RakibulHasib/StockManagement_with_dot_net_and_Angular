using System.ComponentModel.DataAnnotations.Schema;

namespace StockManagement.Model
{
    public class Product
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        [ForeignKey("Company")]
        public int CompanyId { get; set; }
        public int IsActive { get; set; }

        public virtual Company? Company { get; set; }
        public virtual ICollection<Gari1> Gari1s { get; set; } = new HashSet<Gari1>();
        public virtual ICollection<Gari2> Gari2s { get; set; } = new HashSet<Gari2>();
        public virtual ICollection<Gari3> Gari3s { get; set; } = new HashSet<Gari3>();
        public virtual ICollection<IglooIceCream> IglooIceCreams { get; set; } = new HashSet<IglooIceCream>();
        public virtual ICollection<KaziFarmFood> KaziFarmFoods { get; set; } = new HashSet<KaziFarmFood>();
        public virtual ICollection<LovelloIceCream> LovelloIceCreams { get; set; } = new HashSet<LovelloIceCream>();
        public virtual ICollection<SavoyIceCream> SavoyIceCreams { get; set; } = new HashSet<SavoyIceCream>();
        public virtual ICollection<ZaNZeeIceCream> ZaNZeeIceCreams { get; set; } = new HashSet<ZaNZeeIceCream>();
    }
}
