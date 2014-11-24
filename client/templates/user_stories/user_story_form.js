Template.userStoryForm.events({
	'submit .userStoryForm': function (e, template) {
		e.preventDefault();

		var self = this;

		// grab the title
		var title = template.find("#userStoryTitle").value

		// create the userStory object
		var userStory = {
			title: title,
			project_id: this.project_id,
			screen_id: this._id,
			createdAt: new Date(),
			createdBy: Meteor.user(),
			linksTo: [] // an array that contains the link targets
		}

		// add the current userStory to the screen object
		
		Userstories.insert(userStory)


		// reset the form
		var form = template.find(".userStoryForm")
		form.reset()
	}
});