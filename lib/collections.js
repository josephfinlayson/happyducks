Projects = new Mongo.Collection('projects');
Screens = new Mongo.Collection("screens");
Userstories = new Mongo.Collection("userstories");

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