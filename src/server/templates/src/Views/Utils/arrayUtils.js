// Join 2 array different object id, return object with props input
export function arrayInnerJoin(array1, array2, props) {
  let result = array1
    .filter(function(o1) {
      // filter out (!) items in result2
      return !array2.some(function(o2) {
        return o1.id === o2.id; // assumes unique id
      });
    })
    .map(function(o) {
      // use reduce to make objects with only the required properties
      // and map to apply this to the filtered array as a whole
      return props.reduce(function(newo, name, description, imagePreviewUrl,imageSubUrl,imageMainUrl) {
        newo[name] = o[name];
        newo[description] = o[description];
        newo[imagePreviewUrl] = o[imagePreviewUrl];
        newo[imageSubUrl] = o[imageSubUrl];
        newo[imageMainUrl] = o[imageMainUrl];

        return newo;
      }, {});
    });

  return result;
}
