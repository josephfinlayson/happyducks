Template.projectPage.helpers({
	listScreens: function () {
		var id = this._id
		return Screens.find({project_id: id}) // this isn't secure!!! Use a subscription instead?
	},
	listStories: function () {
		var id = this._id
		return Userstories.find({project_id: id})
	}
});

