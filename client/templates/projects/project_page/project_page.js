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
        // this id is the project._id
		var id = this._id
        // this should return all highlighted userstories 
        // i.e. those that should show something on the canvas
        // Userstories.find({project_id: id, highlighted: true}).forEach(function (object) {
        //     if(object.connectsTo){
        //         var screen_id = object.connectsTo
        //         return screen_id
        //     } else {
        //         console.log("hello else", object)
        //         return 
        //     }
        // });
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

