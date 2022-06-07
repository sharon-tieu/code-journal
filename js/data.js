/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

// upon refreshing the page:
window.addEventListener('beforeunload', function (event) {
  const entries = localStorage.getItem('JavaScriptLocalStorage');
  data = JSON.parse(entries);
  localStorage.setItem('JavaScriptLocalStorage', entries);
});
