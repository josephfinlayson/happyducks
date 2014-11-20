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
    this.render("dashboard")
});

Router.route("/dashboard/:_id", function (){
    this.render("projectPage", {
    	data: function(){ return Projects.findOne({_id: this.params._id})}
	});    
}, {
	name: "project.show"
});