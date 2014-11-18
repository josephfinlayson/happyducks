Router.configure({
	layoutTemplate: "layout"
})

Router.route("/", function(){
	this.render("projectList");
});

Router.route("/projects", function(){
	this.render("projectList")
})