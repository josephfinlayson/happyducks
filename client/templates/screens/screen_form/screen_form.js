Template.screenForm.events({
    'submit .screenForm': function(e, template) {
        e.preventDefault();

        var title = template.find("#screenTitle").value;
        var project_id = this._id; // grab the projectID from the projectPage data context

        Meteor.call("createScreen", title, project_id);
        console.log("hello from main screen form: ", this._id)

        // reset the form
        var form = template.find(".screenForm");
        form.reset();
    }
});


/*************************************
HAVE THIS EVENT LISTENER CONNECT TO A BETTER METHOD
PROBABLY SOMETHING LIKE createSubScreen()
**************************************/
Template.subScreenForm.events({
    'submit .subScreenForm': function(e, template) {
        e.preventDefault();

        var title = template.find("#subScreenTitle").value;

        Meteor.call("createSubScreen", title, this.project_id, this._id, this.screen_id);

        // reset the form
        var form = template.find(".subScreenForm");
        form.reset();
    }
});
