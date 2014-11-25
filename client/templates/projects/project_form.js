Template.projectForm.events({
	'submit .projectForm': function (e, template) {
		e.preventDefault();

		var title = template.find("#projectTitle").value;
		Meteor.call("createProject", title)

		var form = template.find(".projectForm");
		form.reset();
	}
});

