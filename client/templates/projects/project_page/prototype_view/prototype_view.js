Template.prototypeView.helpers({
    listScreens: function() {
        var id = this._id
        return Screens.find({
                project_id: id
            }) // this isn't secure!!! Use a subscription instead?
    },
    listUserStories: function() {
        var id = this._id // grab the ID of the current screen
        return Userstories.find({
                screen_id: id
            }) // show the userstories associated to this screen
    },
    populatedProject: function() {
        var screensExist = Screens.findOne({
            project_id: this._id
        })

        if (screensExist) {
            return true
        }
    },
    showNextStepForm: function() {
        // decide whether to show the nextStep form or the nextScreen
        var highlightedStory = Userstories.findOne({
            screen_id: this._id,
            highlighted: true
        })
        if (highlightedStory && highlightedStory.connectsTo === null) {
            return highlightedStory
        } else {
            return
        }
    },
    connectedToExistingScreen: function() {
        function isEmpty(obj) {
                return Object.keys(obj).length === 0;
            }
            // decide whether to show the nextStep form or the nextScreen
        console.log(this, "connectedToExistingScreen")
            //hack! -> obviously make this better
        if (isEmpty(this)) {
            return true;
        }
    },
    conditionalScreenCursor: function() {
        // Requirements //

        /*
            Show screens that are connected to highlighted story
            Show at least one screen
                -- this screen should be the 'first screen' (a flag that is passed)
                   to Meteor methods.
         */

        // start by fetching the first screen
        var firstScreen = Screens.findOne({
            project_id: this._id,
            first_screen: true
        })

        // then figure out if any stories are highlighted
        var highlightedStories = Userstories.find({
            project_id: this._id,
            highlighted: true
        })

        var screensToShow = [];

        screensToShow.push(firstScreen)

        if (firstScreen && highlightedStories.length === 0) {
            // this project is empty, or only has one Screen
            return screensToShow
        } else {

            // iterate over the highlightedStories cursor and return the Screen with _id = connectsTo
            highlightedStories.forEach(function(story) {
                if (!!story.connectsTo) {
                    // return the screen with _id = connectsTo
                    screensToShow.push(Screens.findOne({
                        _id: story.connectsTo,
                        //generally highlighted screens are never the first screen
                        //but this can happen when user stories connect to a 'first_screen'
                        first_screen: {
                            $ne: true
                        }
                    }))
                }
            });

            return screensToShow
        }

    }
});

Template.prototypeView.events({
    'click .toggleStory': function(e, template) {
        e.preventDefault();

        // check which story was clicked
        var story_id = this._id;
        var screen_id = this.screen_id;
        var project_id = this.project_id


        Meteor.call('highlightToggle', story_id, screen_id);


    }
});

Template.prototypeView.events({
    'click .addStep': function(e, template) {
        e.preventDefault();
        // THE DATA CONTEXT IS THE HIGHLIGHTED STORY
        console.log(this)

        Meteor.call("setNewConnection", this._id, this.project_id, this.connectsTo)

    }
});
