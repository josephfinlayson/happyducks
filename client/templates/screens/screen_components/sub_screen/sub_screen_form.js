Template.subScreenForm.events({
    'submit .subScreenForm': function(e, template) {
        e.preventDefault();
        var title = template.find("#subScreenTitle");

        console.log("submit SubScreen", this, title);

        console.log("calling")
        Meteor.call("createSubScreen", title.value, this.project_id, this._id);
        console.log("finished call")

        // reset the form
        template.find(".subScreenForm").reset()
    }
});

Template.subScreenForm.helpers({
    userStoryTitle: function () {
        var story = Userstories.findOne({
            screen_id: 'gZjNWL2n2kQNZTgiR',
            highlighted: true
        })

        return story.title ? story.title : 'No title'
    }
});