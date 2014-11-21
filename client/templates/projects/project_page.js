Template.projectPage.helpers({
	listScreens: function () {
		var id = this._id
		console.log(this)
		return Screens.find({project_id: id})
	}
});