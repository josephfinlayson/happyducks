Screens.initEasySearch(['title']);

Template.searchCombo.helpers({
    'screenDetails': function() {
        return Screens.findOne(this._id)
    }
});

Template.searchCombo.events({
    'click .searchItem': function(e, template) {
        Meteor.call("connectExistingScreen", this.project_id, this._id);
    },
    'submit': function(e, template) {
        e.preventDefault();

        var title = template.find("input").value;
        var project_id = this._id; // grab the projectID from the projectPage data context

        Meteor.call("createScreen", {
            title: title,
            project_id: project_id,
            parent_screen_id: this._id
        });

        // reset the form
        var form = template.find("form");
        form.reset();
    }
});
