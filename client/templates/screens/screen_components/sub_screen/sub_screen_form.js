Template.subScreenForm.events({
    'submit .subScreenForm': function(e, template) {
        e.preventDefault();

        var title = template.find("#subScreenTitle").value;
        var project_id = this.project_id
        Meteor.call("createSubScreen", title, project_id, this._id);

        // reset the form
        var form = template.find(".subScreenForm");
        form.reset();
    }
});

Template.subScreenForm.helpers({
    currentProject: function () {
    }
});