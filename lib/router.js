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
    this.render("projectList")
});

Router.route("/dashboard/:_id", function (){
    this.layout("layout", {
		data: function(){ return Projects.findOne({_id: this.params._id})}
	});

    this.render("projectPage", {})
}, {
	name: "project.show"
});