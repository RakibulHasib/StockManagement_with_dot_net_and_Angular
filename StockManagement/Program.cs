var builder = WebApplication.CreateBuilder(args);
Microsoft.Extensions.Configuration.ConfigurationManager configuration = builder.Configuration;

builder.Host.UseSerilog((_, config) =>
{
    config.ReadFrom.Configuration(builder.Configuration);
});

// Add services to the container.

builder.Services.AddControllers()
       .AddNewtonsoftJson(option =>
       {
           option.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Serialize;
           option.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.Objects;
       });

//jwt
var appSettings = configuration.GetSection(nameof(AppSettings)).Get<AppSettings>();
var key = Encoding.ASCII.GetBytes(appSettings.key);

builder.Services.AddAuthentication(au =>
{
    au.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    au.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(jwt =>
{
    jwt.RequireHttpsMetadata = false;
    jwt.SaveToken = true;
    jwt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
    };
});

builder.Services.Configure<AppSettings>(configuration.GetSection(nameof(AppSettings)));

builder.Services.AddTransient(typeof(Repository<,>));
builder.Services.AddScoped(typeof(UnitOfWork));
builder.Services.AddScoped<StockService>();
builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<SalesDistributeService>();
builder.Services.AddScoped<CompanyService>();
builder.Services.AddScoped<ConcernPersonService>();
builder.Services.AddMediatR(config => config.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
builder.Services.AddScoped<IAuthenticateService, AuthenticateService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddTransient<IPasswordHashingService, PasswordHashingService>();
builder.Services.AddScoped<AuthorizeAttribute>();
builder.Services.AddCors();

builder.Services.AddDbContext<StockDBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.UseMiddleware<ExceptionHandlerMiddleware>();

app.UseCors(x =>
{
    x.AllowAnyOrigin();
    x.AllowAnyHeader();
    x.AllowAnyMethod();
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapGet("/", async context =>
{
    await context.Response.WriteAsync($"RSSM - A Roshs Sweets Stock Management Api");
});

app.Run();
