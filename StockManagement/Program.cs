using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;
using Serilog;
using StockManagement.Middlewares;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;

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
var appSettingsSection = configuration.GetSection("AppSettings");

//jwt
var appSettings = appSettingsSection.Get<AppSettings>();
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

builder.Services.Configure<AppSettings>(appSettingsSection);

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
builder.Services.AddTransient<PasswordHashingService>();


builder.Services.AddDbContext<StockDBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers();

builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));
builder.Services.AddSingleton<AppSettings>();
//builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "jwtToken_Auth_API",
        Version = "v1"
    });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Here Enter JWT Token with bearer format like bearer[space] token"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
        new OpenApiSecurityScheme
        {
            Reference=new OpenApiReference
            {
             Type=ReferenceType.SecurityScheme,
             Id="Bearer"
            }
        },
        new string[]{}
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<ExceptionHandlerMiddleware>();

app.UseCors(x =>
{
    x.WithOrigins("roshsfoodsandsweets.com", "www.roshsfoodsandsweets.com", "https://www.roshsfoodsandsweets.com", "https://roshsfoodsandsweets.com");
    x.AllowAnyHeader();
    x.AllowAnyMethod();
});

app.MapControllers();

app.MapGet("/", async context =>
{
    await context.Response.WriteAsync($"RSSM - A Roshs Sweets Stock Management Api");
});

app.Run();
