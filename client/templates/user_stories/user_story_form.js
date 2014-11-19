Template.userStoryForm.events({
	'submit .userStoryForm': function (e, template) {
		e.preventDefault();

		// grab the title
		var title = template.find("#userStoryTitle").value

		// create the userStory object
		var userStory = {
			title: title,
			createdAt: new Date(),
			createdBy: "Dennis", // change to set dynamically
			linksTo: [] // an array that contains the link targets
		}

		// add the current userStory to the screen object
		

		console.log(this)


		// reset the form
		var form = template.find(".userStoryForm")
		form.reset()
	}
});