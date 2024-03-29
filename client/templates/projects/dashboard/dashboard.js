Template.dashboard.events({
    'click .deleteProject': function(e, template) {
        e.preventDefault();

        var collection = template.find(".deleteProject").dataset.collection;

        if (confirm("You sure? \n1. this cannot be un-done\n2. it's permanent")) {
            Meteor.call("delete", collection, this._id);
        }
    }
});

Template.dashboard.events({
    'click .renameProject': function(e, template) {
        e.preventDefault();

        var new_title = prompt("new title please")
        var collection = template.find(".renameProject").dataset.collection;

        Meteor.call("rename", collection, this, new_title)

        }
});
