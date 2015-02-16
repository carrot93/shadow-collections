//resolves: https://github.com/rclai/meteor-document-methods/pull/4

if (typeof Object.create !== 'function') {
  Object.create = (function () {
    var Temp = function () {};
    return function (prototype) {
      if (arguments.length > 1) {
        throw Error('Second argument not supported');
      }
      if (typeof prototype != 'object') {
        throw TypeError('Argument must be an object');
      }
      Temp.prototype = prototype;
      var result = new Temp();
      Temp.prototype = null;
      return result;
    };
  })();
}

var constructor = Mongo.Collection;

Mongo.Collection = function() {
  var self = this

  runBeforeCollection(this, arguments)
  var ret = constructor.apply(this, arguments);

  if (_.isFunction(this._transform)) {
    transform = _.wrap(this._transform, function () {
      var func = arguments[0], doc = arguments[1]
      doc = runShadows(doc, self)
      return func(doc)
    });
  } else {
    // console.log('transform does not exists')
    transform = function (doc) {
      return runShadows(doc, self)
    }
  }

  this._transform = transform;

  runAfterCollection(this, arguments)

  return ret;
};

Mongo.Collection.prototype = Object.create(constructor.prototype);
Mongo.Collection.prototype.constructor = Mongo.Collection;

_.extend(Mongo.Collection, constructor);

// Meteor.Collection will lack ownProperties that are added back to Mongo.Collection
Meteor.Collection = Mongo.Collection;

var beforeCollection = [], shadows = [], afterCollection = [];

var runBeforeCollection = function (collection, args) {
  beforeCollection.forEach(function (before) {
    before(collection, args)
  });
}

var runAfterCollection = function (collection, args) {
  afterCollection.forEach(function (after) {
    after(collection, args)
  });
}


var runShadows = function (doc, self) {
  var shadowObj = {}
  shadows.forEach(function (shadow) {
    doc = shadow(doc, self, shadowObj)
  });
  return doc;
}

addShadow = function (obj) {
  if (obj.before) beforeCollection.push(obj.before)
  if (obj.transform) shadows.push(obj.transform)
  if (obj.after) afterCollection.push(obj.after)
}


/*

wrapMongoConstructor = function (customFunctions) {
  var constructor = Mongo.Collection;

  Mongo.Collection = function() {
    var args = _.toArray(arguments);
    _.isFunction(customFunctions.before) && customFunctions.before.apply(this, args);
    var ret = constructor.apply(this, args);
    _.isFunction(customFunctions.after) && customFunctions.after.apply(this, args);
    return ret;
  };

  Mongo.Collection.prototype = Object.create(constructor.prototype);
  Mongo.Collection.prototype.constructor = Mongo.Collection;

  _.extend(Mongo.Collection, constructor);

  Meteor.Collection = Mongo.Collection;
};

wrapMongoConstructor({
   before: function () {
       ...
   },
   after: function () {
       if (_.isFunction(this._transform)) {
           transform = _.wrap(this._transform, function () {
            var func = arguments[0], doc = arguments[1]
            doc = runShadows(doc, self)
            return func(doc)
          });
        } else {
             // console.log('transform does not exists')
              transform = function (doc) {
                 return runShadows(doc, self)
               }
         }
     }
})

*/

