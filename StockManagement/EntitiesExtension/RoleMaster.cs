namespace StockManagement.Entities
{
    public partial class RoleMaster
    {
        public virtual ICollection<User> Users { get; set; }
    }
}
