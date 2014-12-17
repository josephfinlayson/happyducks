Meteor.methods({

    /***************************************
     * CREATE STUFF
     ****************************************/
    createProject: function(title) {
        check(Meteor.userId(), String);
        check(title, String);
        var user = Meteor.user();
        var project = {
            title: title,
            createdAt: new Date(),
            createdBy: user.username,
            userId: user._id
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
            userId: user._id,
            isMainScreen: true
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
            userId: user._id,
            project_id: project_id,
            screen_id: screen_id,
            connectsTo: null,
            funnelSteps: 0 // needs to be updated when screens are removed
        };
        Userstories.insert(userStory);
    },
    createSubScreen: function(title, project_id, linkFrom) {
        check(Meteor.userId(), String);
        check(title, String);
        var user = Meteor.user();
        var subScreen = {
            title: title,
            createdAt: new Date(),
            createdBy: user.username,
            project_id: project_id,
            userId: user._id, // move myself to collaboraters?
            isSubScreen: true
        };

        // create the subScreen and get its _id
        var subScreenID = Screens.insert(subScreen);
        Userstories.update({
            _id: linkFrom
        }, {
            $set: {
                connectsTo: subScreenID,
            }
        })
        Meteor.call('stepCounter', project_id);

    },
    connectExistingScreen: function(project_id, screen_id) {
        var linkFrom = Userstories.findOne({
            highlighted: true,
            connectsTo: null
        })
        console.log(linkFrom._id)
        Userstories.update({
            _id: linkFrom._id
        }, {
            $set: {
                connectsTo: screen_id,
            }
        })
        Meteor.call('stepCounter', project_id);
    },
    /***************************************
     * DELETE STUFF
     ****************************************/
    delete: function(collection, object) {
        // TODOS!!!
        // check that the user is logged in
        // check if the user is allowed to nuke all (admin role)
        // validate that the object param is actually an _id

        switch (collection) {
            case "Projects":
                Projects.remove(object); // remove the project
                Screens.remove({
                        project_id: object
                    }) // remove the screens
                Userstories.remove({
                        project_id: object
                    }) // remove the stories
                break;
            case "Screens":
                Screens.remove({
                        _id: object
                    }) // remove the screens
                Userstories.remove({
                        screen_id: object
                    }) // remove the stories
                break;

            case "Userstories":
                Userstories.remove({
                        _id: object
                    }) // remove the stories
                break;

            default:
                console.error("something went wrong")
        }

    }
})
