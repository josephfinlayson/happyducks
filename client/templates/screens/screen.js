Template.screen.helpers({
	listUserStories: function () {
		var id = this._id // grab the ID of the current screen
		return Userstories.find({screen_id: id}) // show the userstories associated to this screen
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

        if (confirm("You sure? This cannot be un-done\nALL STORIES INSIDE THIS SCREEN WILL DIE!")) {
            Meteor.call("deleteScreen", this._id);
        }
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

        if (confirm("You sure? This cannot be un-done")) {
            Meteor.call("deleteStory", this._id);
            
        }
    }
});

Template.projectPage.events({
    'click .toggleStory': function (e, template) {
        e.preventDefault();

        // check which story was clicked
        var story_id = this._id;
        var screen_id = this.screen_id;
        
        Meteor.call('highlightStory', story_id, screen_id);
        
        
    }
});