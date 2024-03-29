Template.screenForm.events({
    'submit .screenForm': function(e, template) {
        e.preventDefault();

        var title = template.find("#screenTitle").value;
        var project_id = this._id; // grab the projectID from the projectPage data context

        Meteor.call("createScreen", {
            title: title,
            project_id: project_id,
            first_screen: true
        });

        // reset the form
        var form = template.find(".screenForm");
        form.reset();
    }
});
