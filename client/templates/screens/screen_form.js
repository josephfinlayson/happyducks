Template.screenForm.events({
    'submit .screenForm': function(e, template) {
        e.preventDefault();

        var title = template.find("#screenTitle").value;
        var screen = {
            title: title,
            createdAt: new Date(),
            createdBy: "Dennis" // change dynamically
        }

        // WHY ISN'T THIS BEING ADDED TO THE SERVER MONGO COLLECTION?
        this.screens.push(screen) // adds the screen to the current project 
        console.log(this.screens)
        var form = template.find(".screenForm");
        form.reset();
    }
});
