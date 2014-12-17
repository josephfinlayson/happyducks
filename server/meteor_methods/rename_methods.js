var methods = {
    /***************************************
     * RENAME STUFF
     ****************************************/
    rename: function(collection, object, newTitle) {
        // identify the current document by ID
        var docID = {
            _id: object._id
        };
        // MongoDB command to set the new title
        var setTitle = {
            $set: {
                title: newTitle
            }
        };

        // Global is the global object, equivalent to the
        // window object in the browser global['Projects'] is
        // equivalent to the Project variable
        if (global[collection]) {
            global[collection].update(docID, setTitle)
        } else {
            console.error("something went wrong")
        }
    },
}

Meteor.methods(methods);
