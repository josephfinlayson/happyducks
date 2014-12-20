Template.screen.helpers({
    listUserStories: function() {
        var id = this._id // grab the ID of the current screen
        return Userstories.find({
                screen_id: id
            }) // show the userstories associated to this screen
    },
    screenTitle: function(id) {
        //pass in ID directly
        var screen = Screens.findOne({
            _id: id
        })
        console.log("this", this)
        return screen.title ? screen.title : "No title"

    },
    screenDataContext: function() {
        if (this.screen_id) {
            return Screens.findOne(this.screen_id)
        } else {
            return this
        }
    }
});


Template.screen.events({
    'click .renameScreen': function(e, template) {
        e.preventDefault();

        var new_title = prompt("new title please");
        var collection = $(".renameScreen").data("collection");
        Meteor.call("rename", collection, this, new_title)
    }
});

Template.screen.events({
    'click .deleteScreen': function(e, template) {
        e.preventDefault();

        var collection = template.find(".deleteScreen").dataset.collection;
        console.log(collection, this._id)
            // UNCOMMENT FOR CONFIRM POPUP
            // if (confirm("You sure? This cannot be un-done\nALL STORIES INSIDE THIS SCREEN WILL DIE!")) {
        Meteor.call("delete", collection, this._id);
        // }
    }
});

Template.screen.events({
    'click .renameStory': function(e, template) {
        e.preventDefault();

        var new_title = (prompt("new title please") || "bad title")
        var collection = template.find(".renameStory").dataset.collection;

        Meteor.call("rename", collection, this, new_title)

    }
});

Template.screen.events({
    'click .deleteStory': function(e, template) {
        e.preventDefault();

        var collection = template.find(".deleteStory").dataset.collection;

        if (confirm("You sure? This cannot be un-done")) {
            Meteor.call("delete", collection, this._id);

        }
    }
});
