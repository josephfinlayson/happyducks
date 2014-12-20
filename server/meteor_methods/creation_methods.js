
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

        console.log(subScreen);
        //  create the subScreen and get its _id
        var subScreenID = Screens.insert(subScreen);
        Userstories.update({
            _id: linkFrom
        }, {
            $set: {
                connectsTo: subScreenID,
            }
        })
        // Meteor.call('stepCounter', project_id);

    },

    //called in search with the following parameters
    // Meteor.call("connectExistingScreen", template.data.project_id, this);
    connectExistingScreen: function(project_id, screen_id) {

        //This is surely wrong, right? there are multiple userStories that can be
        //highlighted without a linkFrom value?
        var linkFrom = Userstories.findOne({
            highlighted: true,
            connectsTo: null
        });

        console.log("proj",project_id, "scree", screen_id);

        Userstories.update({
            _id: linkFrom._id
        }, {
            $set: {
                connectsTo: screen_id
            }
        })

        Meteor.call('stepCounter', project_id);
    }
}

Meteor.methods(methods);
