Template.screen.helpers({
	listUserStories: function () {
		var id = this._id // grab the ID of the current screen
		return Userstories.find({screen_id: id}) // show the userstories associated to this screen
	}
});

Template.screen.events({
    'click #rename': function(e, template) {
        e.preventDefault();

        var new_title = prompt("new title please");

        // PURE JS DOESN'T WORK HERE? WHY?
        var collection = $("#rename").data("collection");

        // template.find("#rename").dataset.collection;

        Meteor.call("rename", collection, this, new_title)

        }
});

Template.screen.events({
    'click #renameStory': function(e, template) {
        e.preventDefault();

        var new_title = prompt("new title please");

        // var collection = $("#renameStory").data("collection");

        //works for me!
        var collection = template.find("#renameStory").dataset.collection;

        Meteor.call("rename", collection, this, new_title)

        }
});

Template.projectPage.events({
    'click #show': function (e, template) {
        e.preventDefault();

        // check which screen was clicked
        var screen_id = $(".toggleCanvasView").data("screen_id"); // template.find("#show").dataset.screenid;

        // set showOnCanvas for this screen to true
        console.log(screen_id)
        Meteor.call('showScreenOnCanvas', screen_id)
    }
});