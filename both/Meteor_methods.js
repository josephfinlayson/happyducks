Meteor.methods({
    nukeProject: function(object) {
        // check that the user is logged in
        // check if the user is allowed to nuke all (admin role)
        // validate that the object param is actually an _id
        var project = object;
        Projects.remove(project); // remove the project
        Screens.remove({ project_id: object }) // remove the screens
        Userstories.remove({ project_id: object }) // remove the screens	

    },
    updateTitle: function(object, newTitle) {
        Projects.update(
        	{_id: object},
        	{ title: newTitle }
        	);
    }
});