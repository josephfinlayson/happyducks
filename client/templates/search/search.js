Screens.initEasySearch(['title']);

Template.search.created = function() {
    this.autorun(function() {
        var instance = EasySearch.getComponentInstance({
            index: 'screens',
        });
        instance.on("searchingDone", function(searchingIsDone) {
            searchingIsDone && console.log("Done!", searchingIsDone)
        });
        instance.on("currentValue", function(value) {
            ("currentValue: ", value)
        });
    })
}

Template.search.helpers({
    suggestionTpl: function() {
        return Template.searchDisplay;
    },
    searchPlaceholder: function(results) {
        //return 'search if searchable items, add new screen if not
        Tracker.autorun(function() {
            var instance = EasySearch.getComponentInstance({
                index: 'screens'
            });

            instance.on('total', function(total) {
                // If no values found in search, make clear to user that if
                // they submit they'll be adding a new screen
                if (total === 0) {
                    Session.set("search", "Add new screen")
                } else {
                    Session.set("search", "Add existing screen")
                }
            });
        });

        return Session.get('search')
    }
});

Template.searchDisplay.helpers({
    'screenDetails': function() {
        return Screens.findOne(this.id)
    }
});

Template.search.events({
    'click .searchItem': function(e, template) {
        e.preventDefault();
        console.log(this.doc.project_id, this.id)
        Meteor.call("connectExistingScreen", this.doc.project_id, this.id);
    },
    // 'click .searchItem': function(e, template) {
    //     e.preventDefault();
    //     console.log(this.doc.project_id, this.id)
    //     Meteor.call("connectExistingScreen", this.doc.project_id, this.id);
    // }
});
