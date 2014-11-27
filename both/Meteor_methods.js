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
    rename: function(collection, object, newTitle) {
    	
    	// identify the current document by ID
    	var docID = {_id: object._id};
    	// MongoDB command to set the new title
    	var setTitle = {$set: { title: newTitle } };

    	// Choose which collection to change
    	switch (collection) {
    		case "Projects":
    		Projects.update( docID, setTitle)
            console.log("Ding") 
    		break;

    		case "Screens":
    		Screens.update( docID, setTitle)
            console.log("Ding") 
    		break;

    		case "Userstories":
    		Userstories.update( docID, setTitle)
            console.log("Ding") 
    		break;

    		default:
    		console.error("something went wrong")
    	}
		
    },
    showScreenOnCanvas: function (screen_id) {
        
        var screen = Screens.findOne({_id: screen_id})
        
        // WHY DOES THIS CONDITIONAL AND ITS RESULT SHOW UP IN MY TERMINAL?
        if (screen.showOnCanvas) {
            Screens.update({_id: screen_id}, {$set: {showOnCanvas: false}})
        } else {
            Screens.update({_id: screen_id}, {$set: {showOnCanvas: true}})
        }
        console.log(screen)
        // todo: error handling
    },
    createProject: function(title) {
        check(Meteor.userId(), String);
        check(title, String);
        var user = Meteor.user();
        var project = {
            title: title,
            createdAt: new Date(),
            createdBy: user.username, 
            userId: user._id, // move myself to collaboraters
            // break the collaborators into a seperate collection??
            collaborators: [] // where all the project collaborators live
        };
        
        Projects.insert(project);
    },
    createScreen: function(title, project_id) {
        check(Meteor.userId(), String);
        check(title, String);
        var user = Meteor.user();
        var screen = {
            title: title,
            createdAt: new Date(),
            createdBy: user.username,
            project_id: project_id,
            userId: user._id, // move myself to collaboraters?
            showOnCanvas: false,
            collaborators: [] 
        };
        Screens.insert(screen);
    },
    createUserstory: function(title, project_id, screen_id) {
        check(Meteor.userId(), String);
        check(title, String);
        var user = Meteor.user();
        var userStory = {
            title: title,
            createdAt: new Date(),
            createdBy: user.username, 
            userId: user._id, // move myself to collaboraters?
            project_id: project_id,
            screen_id: screen_id,
            collaborators: [] 
        };
        
        Userstories.insert(userStory);

    },
});