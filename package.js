Package.describe({
  name: 'kestanous:shadow-collection',
  summary: '',
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

// Package.on_test(function (api) {
//   api.use('kestanous:candid');
//   api.use([
//     'accounts-base',
//     'tinytest',
//     'tracker',
//     'mongo',
//     'underscore',
//     'tinytest',
//     'iron:router'
//     ]);
  
//   api.add_files([
//     'tests/database.js',
//     'tests/router.js',
//     'tests/methods.js'
//     ]);
// });