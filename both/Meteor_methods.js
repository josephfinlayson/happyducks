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
    updateTitle: function(collection, object, newTitle) {
    	
    	// identify the current document by ID
    	var docID = {_id: object._id};
    	// MongoDB command to set the new title
    	var setTitle = {$set: { title: newTitle } };

    	// Choose which collection to change
    	switch (collection) {
    		case "Projects":
    		Projects.update( docID, setTitle)
    		break;

    		case "Screens":
    		Screens.update( docID, setTitle)
    		break;

    		case "Userstories":
    		Userstories.update( docID, setTitle)
    		break;

    		default:
    		console.error("something went wrong")
    	}
		
    }
});