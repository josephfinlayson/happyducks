Template.userStoryForm.events({
	'submit .userStoryForm': function (e, template) {
		e.preventDefault();

		var title = template.find("#userStoryTitle").value

		console.log(title)
	}
});