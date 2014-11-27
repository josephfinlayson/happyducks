Template.screenForm.events({
    'submit .screenForm': function(e, template) {
        e.preventDefault();

        var title = template.find("#screenTitle").value;
        var project_id = this._id; // grab the projectID from the projectPage data context

        Meteor.call("createScreen", title, project_id);

        // reset the form
        var form = template.find(".screenForm");
        form.reset();
    }
});

Template.projectPage.events({
    'click #show': function (e, template) {
        e.preventDefault();

        // check which screen was clicked
        var screen_id = template.find("#show").dataset.screenid;

        // set showOnCanvas for this screen to true
        Meteor.call('showScreenOnCanvas', screen_id)
    }
});