/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  var entriesArray = JSON.stringify(data.entries);
  this.localStorage.setItem('code-journal-data', entriesArray);
});

var previousJournalEntries = localStorage.getItem('code-journal-data');
if (previousJournalEntries !== null) {
  data = JSON.parse;
}
