Template.dashboard.events({
    'click #delete': function(e, template) {
        e.preventDefault();

        if (confirm("You sure? \n1. this cannot be un-done\n2. it's permanent")) {
            Meteor.call("nukeProject", this._id);
            
        }
    }
});


