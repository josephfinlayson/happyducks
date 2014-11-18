Router.configure({
	layoutTemplate: "layout"
})

Router.route("/", function(){
	this.render("home");
});

Router.route("/dashboard", function(){
	this.render("projectList")
})