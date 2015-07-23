using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ChatR.Startup))]
namespace ChatR
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR();
        }
    }
}
