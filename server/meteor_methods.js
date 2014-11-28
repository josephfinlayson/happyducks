Meteor.methods({
    nukeProject: function(object) {
        // check that the user is logged in
        // check if the user is allowed to nuke all (admin role)
        // validate that the object param is actually an _id
        var project = object;
        Projects.remove(project); // remove the project
        Screens.remove({
                project_id: object
            }) // remove the screens
        Userstories.remove({
                project_id: object
            }) // remove the screens    

    },
    rename: function(collection, object, newTitle) {

        // identify the current document by ID
        var docID = {
            _id: object._id
        };
        // MongoDB command to set the new title
        var setTitle = {
            $set: {
                title: newTitle
            }
        };

        // Choose which collection to change
        switch (collection) {
            case "Projects":
                Projects.update(docID, setTitle)
                break;

            case "Screens":
                Screens.update(docID, setTitle)
                break;

            case "Userstories":
                Userstories.update(docID, setTitle)
                break;

            default:
                console.error("something went wrong")
        }

    },

    highlightStory: function(story_id, screen_id) {

        var story = Userstories.findOne({
            _id: story_id
        })

        if(story.highlighted) {
            Userstories.update({_id: story_id}, {$set: {highlighted: false}} )
        } else if (Userstories.find({screen_id: screen_id, highlighted: true})) {
            // set the other userstory.highlighted to false
            Userstories.update({screen_id: screen_id, highlighted: true}, {$set: {highlighted: false}})
            // now set the clicked userstory.highlighted to true
            Userstories.update({_id: story_id}, {$set: {highlighted: true}})
        } else {
            Userstories.update({_id: story_id}, {$set: {highlighted: true}} )
        }
        
    },

    createSubScreen: function(story_id, screen_id) {
        /****************************************************
        
        The highlighted userstory will either:
        1. create a new screen and connect to it
        2. connect to an existing screen
        3. set an end-point (not sure about this one)
        
        If the highlighted story creates a new screen:
        - a new subscreen needs to be created
        - the new subScreen_id needs to be added to the
          userstory.linkTo array
        - the new subScreen needs to be placed on the canvas
        -  

        If the highlighted story connects to an existing screen:
        The screen needs to be placed on the canvas
        The screen_id needs to be as a link_to from the userstory



        *****************************************************/
    },
    createProject: function(title) {
        check(Meteor.userId(), String);
        check(title, String);
        var user = Meteor.user();
        var project = {
            title: title,
            createdAt: new Date(),
            createdBy: user.username,
            userId: user._id, // move myself to collaboraters?
            collaborators: [] 
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
            showOnCanvas: false, // THIS SWITCH MIGHT BE DEPRICATED
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
            highlighted: false,
            userId: user._id, // move myself to collaboraters?
            project_id: project_id,
            screen_id: screen_id,
            collaborators: []
        };
        Userstories.insert(userStory);
    },
});