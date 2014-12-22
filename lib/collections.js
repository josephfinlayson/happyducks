Projects = new Meteor.Collection('projects');
Screens = new Meteor.Collection("screens");
Userstories = new Meteor.Collection("userstories");
Collaborators = new Meteor.Collection("collaborators");


Projects.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }
});

Screens.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }
});

Userstories.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }
});

Collaborators.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }
});


Screens.initEasySearch(['title']);

