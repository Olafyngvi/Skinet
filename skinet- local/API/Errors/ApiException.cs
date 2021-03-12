namespace API.Errors
{
    public class ApiException : ApiResponse
    {
        public ApiException(int statusCode, string poruka = null, string details = null) : base(statusCode, poruka)
        {
            Details = details;
        }

        public string Details { get; set; }
    }
}