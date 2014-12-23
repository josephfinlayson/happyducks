var methods = {
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
            // isMainScreen: true
        };
        Screens.insert(screen);
    },
    createSubScreen: function(title, project_id, parentScreen_id) {
        check(Meteor.userId(), String);
        check(title, String);
        var user = Meteor.user();
        var subScreen = {
            title: title,
            createdAt: new Date(),
            createdBy: user.username,
            project_id: project_id,
            userId: user._id, // move myself to collaboraters?
            // isSubScreen: true
        };

        // if a userStory in the parent screen is highlighted
        // then set the connectsTo of that userStory to the target screen
        var updateConnectsTo = Userstories.findOne({
            screen_id: parentScreen_id,
            highlighted: true
        })

        if (updateConnectsTo) {
            // create the subScreen and get its _id
            var subScreenID = Screens.insert(subScreen);
            console.log(this)
            Userstories.update({
                _id: updateConnectsTo._id
            }, {
                $set: {
                    connectsTo: subScreenID,
                }
            })
            Meteor.call('stepCounter', project_id);

        } else {
            // else create a new screen    
            Screens.insert(subScreen);
        }

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
    setNewConnection: function(story_id, project_id, existing_screen_id, new_screen_id) {
        // change the connectsTo value to a new or existing screen value


        // If the originally connected screen has no userStories linking to it
        // highlight it in some way

        // Are there any userstories pointing to the original screen?
        var isOrphan = Userstories.findOne({
            project_id: project_id,
            connectsTo: existing_screen_id
        })
        console.log(isOrphan)



    }
}

Meteor.methods(methods);