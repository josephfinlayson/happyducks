Template.screen.helpers({
	listUserStories: function () {
		var id = this._id // grab the ID of the current screen
		return Userstories.find({screen_id: id}) // show the userstories associated to this screen
	},
    "currentScreen": function () {
        return Screens.find({_id:this._id})
    },
    "currentStories": function () {
        var currentScreen = this._id
        return Userstories.find({screen_id:currentScreen})
    },
    "highlightedStory": function () {
        var currentScreen = this._id
        return Userstories.find({screen_id:currentScreen, highlighted:true})
    }
});

Template.screen.events({
    'click .renameScreen': function(e, template) {
        e.preventDefault();

        var new_title = prompt("new title please");

        // PURE JS DOESN'T WORK HERE? WHY?
        var collection = $(".renameScreen").data("collection");

        // template.find("#rename").dataset.collection;

        Meteor.call("rename", collection, this, new_title)

        }
});

Template.screen.events({
    'click .deleteScreen': function(e, template) {
        e.preventDefault();

        var collection = template.find(".deleteScreen").dataset.collection;

        // UNCOMMENT FOR CONFIRM POPUP
        // if (confirm("You sure? This cannot be un-done\nALL STORIES INSIDE THIS SCREEN WILL DIE!")) {
            Meteor.call("delete", collection, this._id);
        // }
    }
});

Template.screen.events({
    'click .renameStory': function(e, template) {
        e.preventDefault();

        var new_title = prompt("new title please");

        // var collection = $("#renameStory").data("collection");

        //works for me!
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

Template.projectPage.events({
    'click .toggleStory': function (e, template) {
        e.preventDefault();

        // check which story was clicked
        var story_id = this._id;
        var screen_id = this.screen_id;
        
        Meteor.call('startFunnel', story_id, screen_id);
        
        
    }
});