using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;

namespace ChatR.Hubs
{
    public class ChatHub : Hub
    {
        public void Send(string message)
        {
            Clients.All.newMessage(
                DateTime.Now.ToString("T"),
                Context.User.Identity.Name,
                message);
        }

        public override Task OnConnected()
        {
            Clients.All.newMessage(DateTime.Now.ToString("T"), "Server", Context.User.Identity.Name + " has connected.");
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            Clients.All.newMessage(DateTime.Now.ToString("T"), "Server", Context.User.Identity.Name + " has disconnected.");
            return base.OnDisconnected(stopCalled);
        }
    }
}