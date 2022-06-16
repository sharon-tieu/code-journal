/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousJournalEntries = localStorage.getItem('code-journal-entries');
if (previousJournalEntries !== null) {
  data = JSON.parse(previousJournalEntries);
}

window.addEventListener('beforeunload', function (event) {
  var entriesArray = JSON.stringify(data);
  localStorage.setItem('code-journal-entries', entriesArray);
});
