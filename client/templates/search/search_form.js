Screens.initEasySearch(['title']);

Template.search.created = function() {
    this.autorun(function() {
        var instance = EasySearch.getComponentInstance({
            index: 'screens',
            // id: "subScreenSearch" // just for testing purpose
        });
        instance.on('autosuggestSelected', function(values) {
            console.log("auto selected: ", values)
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
    },
    'isSearching': function() {
        return instance.get('searching')
    }
});