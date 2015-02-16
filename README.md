# shadow-collection
Meteor collections shadow objects and helpers

This package is a utility package for other packages. It provides a reusable non-conflict way to extend Meteor JS Mongo.Collections via transform.

## usage
```js
addShadow({
  before: function (collection, args) {
    //collection: the collection before the transforms
    //args
  },
  transform: function (doc, collection, shadow) {
    //doc: do something to the doc like you would in a transform
    //collection: the calling collection (use for read only!)
    //shadow: a unique shadow object for this specific doc, use to store and reference hidden data
    return doc;
  },
  after: function (collection, args) {
    //same as before but the collection has been instantiated.
  }
});
```
## example
An arbitrary example
```js
addShadow({
  before: function (collection, args) {
    collection.setTime = true;
  },
  transform: function (doc, collection, shadow) {
    if (!collection.setTime) return doc //always return the doc!
    
    shadow.instantiationTime = new Date()
    
    doc.instantiationTime = function () {
      return shadow.instantiationTime
    }
    
    return doc; //always!
  }
});
```
