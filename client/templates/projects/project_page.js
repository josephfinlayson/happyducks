Template.projectPage.helpers({
	listScreens: function () {
		var id = this._id
		return Screens.find({project_id: id}) // this isn't secure!!! Use a subscription instead?
	},
	screenOnCanvas: function (screen_id) {
		// take the current screen div and place the exact same copy on the canvas div
		console.log(screen_id)
	}
});

