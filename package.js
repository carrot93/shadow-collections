Package.describe({
  name: 'mreaction:shadow-collections',
  summary: 'Create Mongo.Collections shadow objects and helpers',
  version: "0.1.0",
  git: "https://github.com/Meteor-Reaction/shadow-collection.git"
});

Package.on_use(function (api) {
   api.use([
    'underscore@1.0.0', 
    'mongo@1.0.0'
    ]);
   
   api.add_files([
    'lib/shadow-collection.js'
  ]);
   api.export('addShadow')
});