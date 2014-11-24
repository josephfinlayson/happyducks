Template.screenForm.events({
    'submit .screenForm': function(e, template) {
        e.preventDefault();
        var self = this; // grab the current project object
        var title = template.find("#screenTitle").value;
        var screen = {
            title: title,
            project_id: self._id, // insert the project ID
            createdAt: new Date(),
            createdBy: Meteor.user(), 
        }

        // adds the screen to the current project 
        Screens.insert(screen);

        // reset the form
        var form = template.find(".screenForm");
        form.reset();
    }
});