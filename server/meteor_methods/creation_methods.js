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
    createScreen: function(params) {
        check(Meteor.userId(), String);
        check(params.title, String);
        var user = Meteor.user();

        var updateConnectsTo = Userstories.findOne({
            screen_id: params.parent_screen_id,
            highlighted: true
        })

        var screen = {
            createdAt: new Date(),
            createdBy: user.username,
            userId: user._id,
        };

        //extend the screen object
        for (prop in params) {
            if (params.hasOwnProperty(prop)) {
                screen[prop] = params[prop]
            }
        }

        if (updateConnectsTo) {
            // create the subScreen and get its _id
            var screenID = Screens.insert(screen);

            Userstories.update({
                _id: updateConnectsTo._id
            }, {
                $set: {
                    connectsTo: screenID,
                }
            })

            Meteor.call('stepCounter', params.project_id);

        } else {
            // else create a new screen
            Screens.insert(screen);
        }
    },
    connectExistingScreen: function(project_id, screen_id) {
        var linkFrom = Userstories.findOne({
            highlighted: true,
            connectsTo: null
        })
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

    }
}

Meteor.methods(methods);
