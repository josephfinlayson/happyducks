Router.configure({
    layoutTemplate: "layout",
    loadingTemplate: "loading",
    notFoundTemplate: "notFound" // why is this not working?

    // waitOn: function() {
    //     return Meteor.subscribe('Projects');
    // }

});


Router.route("/", function() {
    this.render("home");
});

Router.route("/dashboard", {
    template: "dashboard",
    data: function() {
        return {
            projects: Projects.find()
        }
    }
});


Router.route("/dashboard/:_id", function() {
    // if the current ID is not found in the projects collection
    this.render("projectPage", {
        data: function() {
            var currentProject = Projects.findOne({
                _id: this.params._id
            });
            if (!currentProject)
                this.render("notFound");
            else
                return currentProject;
        }
    });
}, {

    name: "project.show"

});

// hide stuff for logged out users
var requireLogin = function() {
    if (!Meteor.user()) {
        this.render('accessDenied');
    } else {
        this.next();
    }
}

// add the requireLogin check to these routes before they trigger
Router.onBeforeAction(requireLogin, {only: 'dashboard'});
Router.onBeforeAction(requireLogin, {only: 'projectPage'});