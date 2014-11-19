Template.userStoryForm.events({
	'submit .userStoryForm': function (e, template) {
		e.preventDefault();

		var self = this;

		// grab the title
		var title = template.find("#userStoryTitle").value

		// create the userStory object
		var userStory = {
			title: title,
			screen_id: this._id,
			createdAt: new Date(),
			createdBy: "Dennis", // change to set dynamically
			linksTo: [] // an array that contains the link targets
		}

		// add the current userStory to the screen object
		
		Userstories.insert(userStory)
		console.log(self)


		// reset the form
		var form = template.find(".userStoryForm")
		form.reset()
	}
});