Template.projectForm.events({
	'submit .projectForm': function (e, template) {
		e.preventDefault();

		var title = template.find("#projectTitle").value;
		var project = {
			title: title,
			createdAt: new Date(),
			createdBy: "Dennis", // change to grab current user
			screens: [], // where all the projects screen objects will live
			collaborators: [] // where all the project collaborators live
		};

		Projects.insert(project);

		var form = template.find(".projectForm");
		form.reset();
	}
});

