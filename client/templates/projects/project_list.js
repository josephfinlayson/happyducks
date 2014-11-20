Template.projectList.helpers({
    projects: function() {
        return Projects.find()
    },
    removeProject: function() {
        this.remove();
    }
});

Template.projectList.events({
    'click #delete': function(e, template) {
        e.preventDefault();

        if (confirm("You sure? \n1. this cannot be un-done\n2. it's permanent")) {
            Meteor.call("nukeProject", this._id);
            
        }
    }
});