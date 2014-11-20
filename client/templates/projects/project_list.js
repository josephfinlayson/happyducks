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

		if(confirm("You sure? \n1. this cannot be un-done\n2. it's permanent")) {
			var project = this._id;
			Screens.remove({project_id: this._id}) // remove the screens
			Userstories.remove({project_id: this._id}) // remove the screens
			Projects.remove(project); // remove the project
		}
		
	}
});