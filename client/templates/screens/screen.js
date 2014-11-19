Template.screen.helpers({
	listUserStories: function () {
		var id = this._id
		return Userstories.find({screen_id: id})
	}
});