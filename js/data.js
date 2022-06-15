/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  var entriesArray = JSON.stringify(data.entries);
  localStorage.setItem('code-journal-entries', entriesArray);
});

var previousJournalEntries = localStorage.getItem('code-journal-entries');

if (previousJournalEntries !== null) {
  data = {
    ...data,
    entries: JSON.parse(previousJournalEntries)
  };
}
