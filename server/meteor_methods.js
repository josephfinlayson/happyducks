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
            linksTo: "", // add screen_id of the screen that is linked to
            // remove screen_id if the screen is deleted 
            collaborators: []
        };
        Userstories.insert(userStory);
    },
    createSubScreen: function(title, project_id, parent_user_story) {
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
        Screens.insert(subScreen);
        console.log(parent_user_story)

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
    * CREATE STUFF
    ****************************************/
    startFlow: function(story_id, screen_id) {

        var story = Userstories.findOne({
            _id: story_id
        })

        if (story.highlighted) {
            Userstories.update({
                _id: story_id
            }, {
                $set: {
                    highlighted: false
                }
            })
        } else if (Userstories.find({
                screen_id: screen_id,
                highlighted: true
            })) {
            // set the other userstory.highlighted to false
            Userstories.update({
                    screen_id: screen_id,
                    highlighted: true
                }, {
                    $set: {
                        highlighted: false
                    }
                })
                // now set the clicked userstory.highlighted to true
            Userstories.update({
                _id: story_id
            }, {
                $set: {
                    highlighted: true
                }
            })
        } else {
            Userstories.update({
                _id: story_id
            }, {
                $set: {
                    highlighted: true
                }
            })
        }

    }
});


/****************************************************
* NOTES
*****************************************************
NEW UI ATTEMPT: 
Highlighted stories spawn options inside the canvas
to connect to a new screen, an existing screen or an
"end point" which marks the successful completion of
the user story flow. 


mainScreen -> mainStory -> startFlow() -> form -> subScreen -> story ->
form -> subScreen -> story -> form -> subScreen -> story - form -> mainScreen


WHAT ARE THE END POINT CRITERIA?
form open
mainScreen link
empty subScreen
non-linked stories in subScreen
stories linked to stories already in the flow


WHAT WOULD THE DOCUMENT LOOK LIKE?
_id: _id,
parentStory: story_id, // 
subScreen: subScreen_id, //

WHAT IF I JUST TREAT LINKS AS ONE STEP ONLY?
story_id -> screen_id
story_id -> form

A story links to a screen that contains stories that link to a screen

if (story.screen_id.isMainScreen && linksTo) {
    set funnelStart to true
}

if (there are no stories with this screen_id
    || all stories with this screen_id have linkTo_ids that are null
    || any story with this screen_id has a linkTo_id that is a main screen) {
    set funnelEnd to true
}



WHEN CONNECTING TO A NEW SCREEN:
1. create a new sub screen 
2. place the new screen on the canvas (not in the gutter)
3. add the subScreen_id to the linksTo value of the user story

WHEN CONNECTING TO AN EXISTING SCREEN:


CLEAN UP:
Whenever a userstory is no longer highlighted all 
subScreens should be hidden (UX consideration?)

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