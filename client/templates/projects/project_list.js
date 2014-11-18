Template.projectList.helpers({
	projects: function () {
		return Projects.find()
	},
	removeProject: function (){
		this.remove();
	}
});

Template.projectList.events({
	'click #delete': function (e, template) {
		e.preventDefault();

		var project = this._id;
		Projects.remove(project);
	}
});