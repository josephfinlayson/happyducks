Template.prototypeView.helpers({
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
		var project_id = this._id

		return Screens.find({project_id: project_id}) // this isn't secure!!! Use a subscription instead?

        // console.log("outside of each: ", this)
        // Screens.find({project_id: this._id}).forEach(function (object) { // {{#each listSubScreens}}
        //     console.log("object: ", object)
        //     Userstories.find({screen_id: object._id}).forEach(function (object) { // {{#each listUserStories}}
        //         console.log("userstories object: ", object)
        //         if(object.highlighted && object.connectsTo){

        //             return object.screen_id
        //         } else if (object.highlighted) {
        //             console.log("show the template now")
        //             return Template.nextStep;
        //         } else {

        //             return
        //         }
        //     });
        // });


	}
});

Template.prototypeView.events({
    'click .toggleStory': function (e, template) {
        e.preventDefault();

        // check which story was clicked
        var story_id = this._id;
        var screen_id = this.screen_id;
        var project_id = this.project_id


        Meteor.call('highlightToggle', story_id, screen_id);


    }
});
