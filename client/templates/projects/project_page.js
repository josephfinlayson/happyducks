Template.projectPage.helpers({
	listScreens: function () {
		var id = this._id
		return Screens.find({project_id: id}) // this isn't secure!!! Use a subscription instead?
	},
	screensOnCanvas: function () {
		// find all screens with this project ID where the showOnCanvas value is true
		var id = this
		console.log(this)
	}
});

