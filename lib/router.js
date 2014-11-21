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


Router.route("/dashboard/:_id", {
    name: "project.show",
    template: "projectPage",
    data: function() {
        return Projects.findOne({
            _id: this.params._id
        })
    }
});

