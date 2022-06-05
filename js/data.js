/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  const entries = localStorage.getItem('JavaScriptLocalStorage');
  data = { ...data, entries: JSON.parse(entries) };
  localStorage.setItem('JavaScriptLocalStorage', entries);
});

// if view = entry form then render html
