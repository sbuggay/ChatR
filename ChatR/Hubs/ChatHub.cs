using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

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
    }
}