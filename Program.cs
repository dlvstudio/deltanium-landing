var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseDefaultFiles();
// Without Cache-Control browsers cache pages and assets heuristically and can mix a new page with old
// CSS/JS. "no-cache" keeps them cached but makes the browser revalidate (ETag) on every use.
app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx => ctx.Context.Response.Headers.CacheControl = "no-cache"
});

app.Run();
