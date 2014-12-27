Template.subScreenForm.events({
    'submit .subScreenForm': function(e, template) {
        e.preventDefault();
        var title = template.find("#subScreenTitle").value;

        Meteor.call("createScreen", {
            title: title,
            project_id: this.project_id,
            parent_screen_id: this._id
        });

        // reset the form
        var form = template.find(".subScreenForm");
        form.reset();
    }
});

Template.subScreenForm.helpers({
    currentProject: function() {}
});
