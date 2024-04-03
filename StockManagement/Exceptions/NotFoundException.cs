namespace StockManagement.Exceptions
{
    public class NotFoundException : Exception
    {
        public string Error { get; }
        public NotFoundException()
        {
            Error = "";
        }

        public NotFoundException(string error) : base()
        {
            Error = error;
        }
    }
}
