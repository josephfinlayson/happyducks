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
    'suggestionTpl': function() {
        return Template.customSuggestions;
    }
});

Template.search.events({
    'click .panel-primary': function (e, template) {
        e.preventDefault();

        Meteor.call("connectExistingScreen", template.data.project_id, this);

    }
});