var methods = {
    /***************************************
     * DELETE STUFF
     ****************************************/
    delete: function(collection, object) {
        // TODOS!!!
        // check that the user is logged in
        // check if the user is allowed to nuke all (admin role)
        // validate that the object param is actually an _id

        switch (collection) {
            case "Projects":
                //is this an object here?
                Projects.remove(object); // remove the project
                Screens.remove({
                        project_id: object
                    }) // remove the screens
                Userstories.remove({
                        project_id: object
                    }) // remove the stories
                break;
            case "Screens":
            console.log(object);
                Screens.remove({
                        _id: object
                    }) // remove the screens
                Userstories.remove({
                        screen_id: object
                    }) // remove the stories
                break;

            case "Userstories":
                Userstories.remove({
                        _id: object
                    }) // remove the stories
                break;

            default:
                console.error("something went wrong")
        }

    }
}

Meteor.methods(methods);