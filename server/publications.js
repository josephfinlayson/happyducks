Meteor.publish("projects", function(){
	return Projects.find();
});

Meteor.publish("screens", function(){
	return Screens.find();
});

Meteor.publish("userstories", function(){
	return Userstories.find();
});