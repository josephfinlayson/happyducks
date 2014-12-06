
Screens.initEasySearch(['title']);

Template.search.created = function() {
    this.autorun(function() {
        var instance = EasySearch.getComponentInstance({
            index: 'screens',
            id: "subScreenSearch" // just for testing purpose
        });
        instance.on("autosuggestSelected", function(values) {

        });
    })
}


Template.search.helpers({
    'suggestionTpl': function() {
        return Template.customSuggestions;
    }
});
