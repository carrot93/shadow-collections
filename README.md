# shadow-collection
Meteor collections shadow objects and helpers

This package is a utility package for other packages. It provides a reusable non-conflict way to extend Meteor JS Mongo.Collections via transform.

## usage
```js
addShadow(function (doc, collection, shadow) {
  //doc: do something to the doc like you would in a transform
  //collection: the calling collection
  //shadow: a unique shadow object for this specific doc, use to store and reference hidden data
  return doc;
});
```
## example
An arbitrary example
```js
addShadow(function (doc, collection, shadow) {
  shadow.instantiationTime = new Date()
  doc.instantiationTime = function () {
    return shadow.instantiationTime
  }
  return doc;
});
```
