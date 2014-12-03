Template.userStoryForm.events({
	'submit .userStoryForm': function (e, template) {
		e.preventDefault();
		var title = template.find("#userStoryTitle").value

		// grab the projectID from the screenPage data context
		var project_id = this.project_id;

		// grab the screenID that this userstory is associated with
		var screen_id = this._id;

		Meteor.call("createUserstory", title, project_id, screen_id)
		// reset the form
		var form = template.find(".userStoryForm")
		form.reset()
	}
});