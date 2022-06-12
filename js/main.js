/* global data */
// Listen for 'input' events on the photoURL input. This will help update the src attribute of the photo preview when the input value changes.
var photoUrl = document.querySelector('.photo');
var imgSrc = document.querySelector('#img-placeholder');
var entryForm = document.querySelector('.entry-form');
var entryLists = document.querySelector('.entry-list');
var entryFormFeature = document.querySelector('.entry-form-feature');
var entriesNavBar = document.querySelector('.entries-navbar');
var entryView = document.querySelector('.entry-view');
var noEntries = document.querySelector('.no-entries');

photoUrl.addEventListener('input', function (event) {
  if (photoUrl.value === '') {
    imgSrc.setAttribute('src', './images/placeholder-image-square.jpg');
  } else {
    imgSrc.setAttribute('src', photoUrl.value);
  }
});

entryForm.addEventListener('submit', newEntry);
function newEntry(event) {
  event.preventDefault();
  var title = document.querySelector('.title').value;
  var photoURL = document.querySelector('.photo').value;
  var notes = document.querySelector('.textbox').value;
  var entryData = {
    title,
    photoURL,
    notes
  };
  entryLists.prepend(userEntry(entryData));
  data.nextEntryId++; // incrementing
  imgSrc.setAttribute('src', './images/placeholder-image-square.jpg');
  entryForm.reset(); // resets the entryForm once user clicks SAVE button
}

// create a DOM tree for our html sample journal entry that will change/update with JavaScript.
function userEntry(entryObject) {
  var $liElement = document.createElement('li');
  $liElement.setAttribute('class', 'row');

  var $divFirstColumn = document.createElement('div');
  $divFirstColumn.setAttribute('class', 'column-half');
  $liElement.appendChild($divFirstColumn);

  var $img = document.createElement('img');
  $img.setAttribute('src', entryObject.photoURL);
  $divFirstColumn.appendChild($img);

  var $divSecondColumn = document.createElement('class', 'column-half');
  $liElement.appendChild($divSecondColumn);

  var $hThree = document.createElement('h3');
  $hThree.textContent = entryObject.title;
  $divSecondColumn.appendChild($hThree);

  var $pContent = document.createElement('p');
  $pContent.textContent = entryObject.notes;
  $divSecondColumn.appendChild($pContent);
  return $liElement;
}

// function DOMContentLoaded() {
//   const entries = localStorage.getItem('JavaScriptLocalStorage');
//   const previousData = JSON.parse(entries);
//   if (previousData.entries.length > 0) {
//     noEntries.classList.add('hidden');
//     for (var i = 0; i < previousData.entries.length; i++) {
//       var accessEntry = userEntry(previousData.entries[i]);
//       entryLists.append(accessEntry);
//     }
//   }
//   if (previousData.view === 'entryView') {
//     entryFormFeature.classList.add('hidden');
//     entryView.classList.remove('hidden');
//   } else if (previousData.view === 'entry-form') {
//     entryView.classList.add('hidden');
//     entryFormFeature.classList.remove('hidden');
//   }
// }
// window.addEventListener('DOMContentLoaded', DOMContentLoaded);

// Entries tab in the navbar should change the data-view to "entries"
// make a function to swap class attributes of the data-view.
// make a queryselector for entries in navbar
// add and event listener to entries in navbar
entriesNavBar.addEventListener('click', function (event) {
  event.preventDefault();
  var oldData = localStorage.getItem('JavaScriptLocalStorage');
  oldData = JSON.parse(oldData);
  entryFormFeature.classList.add('hidden');
  entryView.classList.remove('hidden');
  localStorage.setItem('JavaScriptLocalStorage', JSON.stringify({ ...oldData, view: 'entryView' }));
});

var newEntryButton = document.querySelector('.new-entry-button');
newEntryButton.addEventListener('click', function (event) {
  var oldData = localStorage.getItem('JavaScriptLocalStorage');
  oldData = JSON.parse(oldData);
  entryView.classList.add('hidden');
  entryFormFeature.classList.remove('hidden');
  localStorage.setItem('JavaScriptLocalStorage', JSON.stringify({ ...oldData, view: 'entry-form' }));
});
