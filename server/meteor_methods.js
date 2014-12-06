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
            isMainScreen: true,
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
            highlighted: false,
            userId: user._id, // move myself to collaboraters?
            project_id: project_id,
            screen_id: screen_id,
            connectsTo: null,
            funnelSteps: 0, // needs to be updated when screens are removed
            collaborators: []
        };
        Userstories.insert(userStory);
    },
    createSubScreen: function(title, project_id, linkFrom, currentScreenId) {
        check(Meteor.userId(), String);
        check(title, String);
        var user = Meteor.user();
        var subScreen = {
            title: title,
            createdAt: new Date(),
            createdBy: user.username,
            project_id: project_id,
            userId: user._id, // move myself to collaboraters?
            isSubScreen: true, // nasty solution for Blaze limitation
            // {{if !isMainScreen}} doesn't seem to be
            // supported
            showOnCanvas: true,
            collaborators: []
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

    },

    /***************************************
     * RENAME STUFF
     ****************************************/
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

    /***************************************
     * FUNNEL STUFF
     ****************************************/
    highlightToggle: function(story_id, screen_id) {

        var story = Userstories.findOne({
            _id: story_id
        })
        var screen = Screens.findOne({
            _id: screen_id
        })

        if (story.highlighted) {
            Meteor.call("screenToggle", screen_id)
        } else if
        // IF ANY OTHER STORY IS HIGHLIGHTED
        (Userstories.find({
                screen_id: screen_id,
                highlighted: true
            })) {

            // let screenToggle set that story to false
            Meteor.call("screenToggle", screen_id)

            // now set the clicked story to true
            Userstories.update({
                _id: story_id
            }, {
                $set: {
                    highlighted: true
                }
            })
        } else
        // this story wasn't highlighted so go ahead and highlight it
        {
            Userstories.update({
                _id: story_id
            }, {
                $set: {
                    highlighted: true
                }
            })
        }

    },
    screenToggle: function screenToggle(screen_id) {

        // iterate over all screens with the passed screen_id
        Userstories.find({
            screen_id: screen_id
        }).forEach(function(currentObj) {


            if (currentObj.highlighted && currentObj.connectsTo) {

                // This story is highlighted & connected
                // Set its highlighted value to false
                Userstories.update({
                    _id: currentObj._id
                }, {
                    $set: {
                        highlighted: false
                    }
                })

                // grab the screen_id inside the connectsTo value
                var newScreenToLookThrough = currentObj.connectsTo;

                // call yourself with the new screen ID
                screenToggle(newScreenToLookThrough)

            } else if (currentObj.highlighted) {

                // this story is only highlighted so just set it to false

                Userstories.update({
                    _id: currentObj._id
                }, {
                    $set: {
                        highlighted: false
                    }
                })

            } else {
                return;
            }
        })

    },
    stepCounter: function stepCounter(project_id) {

        Userstories.find({
            project_id: project_id
        }).forEach(function(currentObj) {

            if (currentObj.connectsTo) {
                // add a step to the funnel
                Userstories.update({
                    _id: currentObj._id
                }, {
                    $inc: {
                        funnelSteps: 1
                    }
                });
                console.log(currentObj.funnelSteps)
                    // grab the screen_id inside the connectsTo value
                var newScreenToLookThrough = currentObj.connectsTo;

                // call yourself with the new screen ID
                stepCounter(newScreenToLookThrough)

            } else {
                return;
            }
        })
    }
});