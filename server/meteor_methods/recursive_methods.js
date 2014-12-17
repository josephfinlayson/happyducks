var methods = {

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

            if (currentObj.connectsTo && currentObj.highlighted) {
                // add a step to the funnel
                Userstories.update({
                    _id: currentObj._id
                }, {
                    $inc: {
                        funnelSteps: 1
                    }
                });

                // grab the screen_id inside the connectsTo value
                var newScreenToLookThrough = currentObj.connectsTo;

                // call yourself with the new screen ID
                stepCounter(newScreenToLookThrough)

            } else {
                return;
            }
        })
    }
}

Meteor.methods(methods);
