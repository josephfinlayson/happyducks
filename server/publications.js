Meteor.publish("projects", function(){
	var user = Meteor.users.findOne({_id: this.userId});
	if (!user){
		return;
	} else {
			var data = Projects.find({userId: this.userId});
			return data;
		}
});

Meteor.publish("screens", function(){
	var user = Meteor.users.findOne({_id: this.userId});
	if (!user){
		return;
	} else {
			var data = Screens.find({userId: this.userId});
			return data;
		}
});

Meteor.publish("userstories", function(){
	var user = Meteor.users.findOne({_id: this.userId});
	if (!user){
		return;
	} else {
			var data = Userstories.find({userId: this.userId});
			return data;
		}
});
