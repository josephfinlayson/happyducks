
Screens.initEasySearch(['title']);

// Session.set('resultScreens', null);
// Template.search.created = function() {
//     this.autorun(function() {
//         var instance = EasySearch.getComponentInstance({
//             index: 'screens'
//         });
//         instance.on("autosuggestSelected", function(values) {
//           console.log(values)
//         });
//         instance.on('searchingDone', function(searchingIsDone) {
//             searchingIsDone && console.log('I am done!');
//         });

//         instance.on('currentValue', function(val) {
//             console.log('The user searches for ' + val);
//         });

//         instance.on('searchResults', function(val) {
//           console.log("what I found is: ", val);
//           Session.set('resultScreens', val);
//         })
//     })
// }


// Template.search.helpers({
//     'suggestionTpl': function() {
//         return Template.customSuggestions;
//     },
//     'resultScreens': function(){
//       return Session.get('resultScreens');
//     }
// });



Template.search.created = function() {
    this.autorun(function() {
        var instance = EasySearch.getComponentInstance({
            index: 'screens',
            id: "subScreenSearch" // just for testing purpose
        });
        instance.on("autosuggestSelected", function(values) {

        });
        instance.on('searchingDone', function(searchingIsDone) {
            searchingIsDone && console.log('I am done!');
        });

        instance.on('currentValue', function(val) {
            console.log('The user searches for ' + val);
        });

        instance.on('searchResults', function(val) {
          console.log("what I found is: ", val)
        })
    })
}


Template.search.helpers({
    'suggestionTpl': function() {
        return Template.customSuggestions;
    }
});
