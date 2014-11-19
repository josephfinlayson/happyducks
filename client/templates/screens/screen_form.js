Template.screenForm.events({
    'submit .screenForm': function(e, template) {
        e.preventDefault();

        var title = template.find("#screenTitle").value;
        var screen = {
            title: title,
            createdAt: new Date(),
            createdBy: "Dennis", // change dynamically
            userStories: [] // is this the smartest place for userStories??
        }

        // adds the screen to the current project 
        Projects.update({
            _id: this._id
        }, {
            $push: {
                screens: screen
            }
        })


        console.log(this)

        // reset the form
        var form = template.find(".screenForm");
        form.reset();
    }
});