(function () {

    var chatHub = $.connection.chatHub;
    $.connection.hub.logging = true;
    $.connection.hub.start();

    var urlPattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;

    // When client recieves message to server, pass off to model for binding
    chatHub.client.newMessage = function (date, userName, message) {
        model.addMessage(date, userName, message);
    };

    var stringToColour = function (str) {
        // str to hash
        for (var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));
        // int/hash to hex
        for (var i = 0, colour = "#"; i < 3; colour += ("00" + ((hash >> i++ * 8) & 0xFF).toString(16)).slice(-2));
        return colour;
    }

    var Model = function () {
        var self = this;
        self.message = ko.observable("");
        self.messages = ko.observableArray();

        this.sendMessage = function () {
            var self = this;
            if (self.message() != "") {
                chatHub.server.send(self.message());
                self.message("");
            }
        };

        this.addMessage = function (date, userName, message) {
            var self = this;
            // Color username
            userName = "<span class=\"userName\" style=\"color: "
                + stringToColour(userName)
                + "\">" + userName + "</span>";
            // Replace any links with proper href tagged link
            message = message.replace(urlPattern, '<a href="$1" target="_blank">$1</a>');

            self.messages.push({ "date": date, "userName": userName, "message": message });
        }
    };

    var model = new Model();

    $(function () {
        ko.applyBindings(model);
    });

    $("input").keyup(function (e) {
        if (e.keyCode == 13) {
            model.sendMessage();
        }
    });

}());