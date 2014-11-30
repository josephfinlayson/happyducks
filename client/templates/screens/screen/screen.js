Template.screen.helpers({
    listUserStories: function() {
        var id = this._id // grab the ID of the current screen
        return Userstories.find({
                screen_id: id
            }) // show the userstories associated to this screen
    }
});

Template.screen.events({
    'click .renameScreen': function(e, template) {
        e.preventDefault();

        // returning title on false or blank string
        var new_title = (prompt("new title please") || this.title),
            collection = $(template.find(".renameScreen")).data('collection')

        Meteor.call("rename", collection, this, new_title)
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



Template.projectPage.events({
    'click .toggleStory': function(e, template) {
        e.preventDefault();

        // check which story was clicked
        var story_id = this._id;
        var screen_id = this.screen_id;

        Meteor.call('highlightStory', story_id, screen_id);


    }
});
