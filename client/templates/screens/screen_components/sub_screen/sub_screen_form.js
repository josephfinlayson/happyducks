Template.subScreenForm.events({
    'submit .subScreenForm': function(e, template) {
        e.preventDefault();

        var title = template.find("#subScreenTitle").value;
        console.log("subscreenform: ", this)
        
        Meteor.call("createSubScreen", title, this.project_id, this._id);

        // reset the form
        var form = template.find(".subScreenForm");
        form.reset();
    }
});

Template.subScreenForm.helpers({
    currentProject: function () {
    }
});