Template.registerHelper("helpThis", function(value) {
    return '<pre>' + JSON.stringify(this) + '</pre>';
});
