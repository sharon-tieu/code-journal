/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  var stringData = JSON.stringify(data);
  localStorage.setItem('New data', stringData);
});
var previousData = localStorage.getItem('javascript-local-storage');
if (previousData !== null) {
  data.parse(previousData);
}
