Template.projectForm.events({
	'submit .projectForm': function (e, template) {
		e.preventDefault();

		var title = template.find("#projectTitle").value;
		var project = {
			title: title,
			createdAt: new Date(),
			createdBy: "Dennis"
		};

		Projects.insert(project);

		var form = template.find(".projectForm");
		form.reset();
	}
});

