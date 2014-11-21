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

Router.route("/dashboard", function() {
    this.render("dashboard", {
        // set the data context for this route
        data: function() {
            return {
                // "projects" can be used in the {{#each}} helper
                projects: function() {
                    return Projects.find()
                }
            }
        }
    })
});

Router.route("/dashboard/:_id", function() {
    var projectID = this.params._id
    this.layout("layout", {
        // set the data context for the layout used on this route
        data: function() {
            return Projects.findOne({
                _id: this.params._id
            })
        }
    });
    this.render("projectPage", {});
}, {
    name: "project.show"
});

// if (Meteor.isClient) {
//     Template.dashboard.helpers({
//         projects: function() {
//             return Projects.find();
//         }
//     });
// }