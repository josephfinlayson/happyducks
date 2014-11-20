Template.screen.helpers({
	listUserStories: function () {
		var id = this._id // grab the ID of the current screen
		return Userstories.find({screen_id: id}) // show the userstories associated to this screen
	}
});