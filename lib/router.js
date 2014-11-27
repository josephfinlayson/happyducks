Router.configure({
    layoutTemplate: "layout",
    loadingTemplate: "loading",
    notFoundTemplate: "notFound"

});


Router.route("/", function() {
    this.render("home");
});

Router.route("/dashboard", {
    waitOn: function() {
        return Meteor.subscribe("projects")
    },
    action: function() {
        this.render("dashboard")
    },
    data: function() { // how come I still need this, the subscription is set in waitOn?
        return {
            projects: Projects.find()
        }
    }

});


Router.route("/dashboard/:_id", {
    subscriptions: function() {
        return Meteor.subscribe("projects")
    },
    action: function() {
        if (this.ready()) {
            this.render("projectPage");
        } else {
            this.render("loading")
        }
    },
    data: function() {
        Projects.findOne({
            _id: this.params._id
        }, function callback(currentProject) {
            if (!currentProject)
                this.render("notFound"); // Why does this flash for a second?
            else
                return currentProject;
        });
    },
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
Router.onBeforeAction(requireLogin, {
    only: 'dashboard'
});
Router.onBeforeAction(requireLogin, {
    only: 'projectPage'
});
