/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  var entriesArray = JSON.stringify(data.entries);
  // var dataViewString = JSON.stringify(data.view);
  localStorage.setItem('code-journal-entries', entriesArray);
  // this.localStorage.setItem('data-view', dataViewString);
});

var previousJournalEntries = localStorage.getItem('code-journal-entries');
// var previousDataView = localStorage.getItem('data-view');

if (previousJournalEntries !== null) {
  data = {
    ...data,
    entries: JSON.parse(previousJournalEntries)
    // view: JSON.parse(previousDataView)
  };
}
