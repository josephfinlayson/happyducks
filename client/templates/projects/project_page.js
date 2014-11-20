Template.projectPage.helpers({
	listScreens: function () {
		var id = this._id
		return Screens.find({project_id: id})
	}
});