Template.projectForm.events({
	'submit .projectForm': function (e, template) {
		e.preventDefault();

		var title = template.find("#projectTitle").value;
		var project = {
			title: title,
			createdAt: new Date(),
			createdBy: Meteor.user(), 
			collaborators: [] // where all the project collaborators live
		};
		console.log(Meteor.user())
		Projects.insert(project);

		var form = template.find(".projectForm");
		form.reset();
	}
});

