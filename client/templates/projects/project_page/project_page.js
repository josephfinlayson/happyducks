Template.projectPage.helpers({
	listScreens: function () {
		var id = this._id
		return Screens.find({project_id: id, isMainScreen: true}) // this isn't secure!!! Use a subscription instead?
	},
	listUserStories: function () {
		var id = this._id // grab the ID of the current screen
		return Userstories.find({screen_id: id}) // show the userstories associated to this screen
	},
	listSubScreens: function () {
		var id = this._id
		console.log(id)
		return Screens.find({project_id: id}) // this isn't secure!!! Use a subscription instead?
	}
});

Template.projectPage.events({
    'click .toggleStory': function (e, template) {
        e.preventDefault();

        // check which story was clicked
        var story_id = this._id;
        var screen_id = this.screen_id;
        var project_id = this.project_id


        Meteor.call('highlightToggle', story_id, screen_id);


    }
});

