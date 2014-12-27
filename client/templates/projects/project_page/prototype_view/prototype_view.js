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
    conditionalScreenCursor: function() {

        // start by figuring out if there are screens
        var screensExist = Screens.findOne({
            project_id: this._id
        })

        // then figure out if any stories are highlighted
        var highlightedStories = Userstories.find({
            project_id: this._id,
            highlighted: true
        }).fetch()

        var screensToShow = [];


        if (screensExist && highlightedStories.length === 0) {
            // this project is empty, or only has one Screen
            screensToShow.push(screensExist)

            return screensToShow

        } else {
            // add the original screen to the array (is this solid? I don't think so)
            screensToShow.push(screensExist)

            // iterate over the highlightedStories array and return the Screen with _id = connectsTo
            for (var i = 0; i < highlightedStories.length; i++) {
                // if the story is highlighted && connected
                if (highlightedStories[i].connectsTo) {
                    // return the screen with _id = connectsTo
                    screensToShow.push(Screens.findOne({
                        _id: highlightedStories[i].connectsTo
                    }))
                } else {
                    screensToShow.push(Screens.findOne({
                        _id: highlightedStories[i].screen_id
                    }))
                }
            };

            // NASTY HACK CAUSE I'M DOUBLING SOMEWHERE AND I'M LAZY
            screensToShow = _.uniq(screensToShow, false, function(p) {
                return p._id;
            })

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
