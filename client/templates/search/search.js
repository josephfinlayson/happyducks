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
        return Template.searchDisplay;
    }
});

Template.searchDisplay.helpers({
    'screenDetails': function() {
        return Screens.findOne(this.id)
    }
});

Template.search.events({
    'click .searchItem': function (e, template) {
        e.preventDefault();
        console.log(this.doc.project_id, this.id)
        Meteor.call("connectExistingScreen", this.doc.project_id, this.id);
    }
});