# shadow-collection
Meteor collections shadow objects and helpers

## usage
```js
addShadow(function (doc, collection, shadow) {
  //doc: do something to the doc like you would in a transform
  //collection: the calling collection
  //shadow: a unique shadow object for this specific doc, use to store and refinance hidden data
  return doc;
});
```
