/* global data */
// Listen for 'input' events on the photoURL input. This will help update the src attribute of the photo preview when the input value changes.
var photoUrl = document.querySelector('.photo');
var imgSrc = document.querySelector('#img-placeholder');
var editPhoto = document.querySelector('#img-placeholder');
var entryForm = document.querySelector('.entry-form');
var entryLists = document.querySelector('.entry-list');
var entryFormFeature = document.querySelector('.entry-form-feature');
var entriesNavBar = document.querySelector('.entries-navbar');
var entryView = document.querySelector('.entry-view');
var noEntries = document.querySelector('.no-entries');
var viewEntries = document.querySelector('#view-entries');
var $ul = document.querySelector('ul');

// Function to change the value of the image source.
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
  var editTitle = document.querySelector('#title');
  var editPhotoUrl = document.querySelector('#photo');
  var editNotes = document.querySelector('#notes');
  var title = document.querySelector('#title').value;
  var photoURL = document.querySelector('#photo').value;
  var notes = document.querySelector('#notes').value;
  if (data.editing !== null) { // when in 'editing-mode', data.editing is = data.entries[i] :: not null.
    var elementToReplace = document.querySelectorAll('li');
    for (var i = 0; i < data.entries.length; i++) {
      // console.log(data.entries[i].id);
      // console.log(data.editing);
      if (data.entries[i].id === data.editing.id) {
        // reassigning data.entries[i];
        data.entries[i] = {
          id: data.editing.id,
          title,
          photoURL,
          notes
        };
      }
    }
    // replace <li> with data.entries[i] by seeing if their id's match and then replace the values with the values of data.entries[i].
    for (i = 0; i < elementToReplace.length; i++) {
      if (Number(elementToReplace[i].getAttribute('data-entry-id')) === Number(data.editing.id)) {
        elementToReplace[i].replaceWith(userEntry({
          id: data.editing.id,
          title,
          photoURL,
          notes
        }));
      }
    }
    // after editing, User clicks SAVE and User is out of editing mode now.
    data.editing = null;
    // ELSE, User is making a new entry
  } else {
    var entryData = {
      id: data.nextEntryId,
      title,
      photoURL,
      notes
    };
    data.entries.unshift(entryData);
    data.nextEntryId++; // incrementing
    imgSrc.setAttribute('src', './images/placeholder-image-square.jpg');
    $ul.prepend(userEntry(data.entries[0]));
  }
  editTitle.value = '';
  editPhotoUrl.value = '';
  editPhoto.src = './images/placeholder-image-square.jpg';
  editNotes.value = '';
  data.view = 'entry-form';
  changeView();
}

// change view to view entries after submitting.
function changeView() {
  if (data.view === 'entry-form') {
    entryFormFeature.classList.add('hidden');
    viewEntries.classList.remove('hidden');
  } else if (data.view === 'view-entries') {
    entryFormFeature.classList.remove('hidden');
    viewEntries.classList.add('hidden');
  }
}

// ======== change view to edit entry function =====//
var editEntryHeading = document.querySelector('.edit-entry-heading');
var newEntryHeading = document.querySelector('.new-entry-heading');
function editEntryView() {
  if (data.view === 'entry-form') {
    entryFormFeature.classList.add('hidden');
    editEntryHeading.classList.remove('hidden');
  } else if (data.view === 'view-entries') {
    entryFormFeature.classList.remove('hidden');
    viewEntries.classList.add('hidden');
    newEntryHeading.classList.add('hidden');
    editEntryHeading.classList.remove('hidden');
  }
}

// ======= ======= ======= ======= =======//

// create a DOM tree for our html sample journal entry that will change/update with JavaScript.
function userEntry(entryObject) {
  var $liElement = document.createElement('li');
  $liElement.setAttribute('class', 'row');
  $liElement.setAttribute('data-entry-id', entryObject.id);

  var $divFirstColumn = document.createElement('div');
  $divFirstColumn.setAttribute('class', 'column-half');
  $liElement.appendChild($divFirstColumn);

  var $img = document.createElement('img');
  $img.setAttribute('src', entryObject.photoURL);
  $divFirstColumn.appendChild($img);

  var $divSecondColumn = document.createElement('div');
  $divSecondColumn.setAttribute('class', 'column-half');
  $liElement.appendChild($divSecondColumn);

  // ============== FEATURE 3 BEGINS HERE ==============//
  var $featureThreeRowOne = document.createElement('div');
  $featureThreeRowOne.setAttribute('class', 'row space-between vertical-align');
  $divSecondColumn.appendChild($featureThreeRowOne);

  var $featureThreeColumnOne = document.createElement('div');
  $featureThreeColumnOne.setAttribute('class', 'column-two-thirds padding');
  $featureThreeRowOne.appendChild($featureThreeColumnOne);
  // ============== END ==============//

  var $hThree = document.createElement('h3');
  $hThree.textContent = entryObject.title;
  // MIGHT HAVE TO CHANGE WHERE THIS IS APPENDING TO//
  // $divSecondColumn.appendChild($hThree);
  $featureThreeColumnOne.appendChild($hThree);

  // ============== FEATURE 3 BEGINS HERE ==============//
  var $featureThreeColumnTwo = document.createElement('div');
  $featureThreeColumnTwo.setAttribute('class', 'column-one-thirds align-right');
  $featureThreeRowOne.appendChild($featureThreeColumnTwo);

  var $pencilIcon = document.createElement('i');
  $pencilIcon.setAttribute('class', 'fas fa-pencil-alt fa-xl pencil-color');
  $pencilIcon.setAttribute('data-entry-id', entryObject.id);
  $featureThreeColumnTwo.appendChild($pencilIcon);

  // ============== EDITING FUNCTION ====================//
  $pencilIcon.addEventListener('click', function () {
    editEntryView();
    // console.log(Number(event.target.closest('li').getAttribute('data-entry-id')));
    // console.log('data.entries:', data.entries);
    // console.log('entryObject.id:', parseInt(entryObject.id));

    var editTitle = document.querySelector('#title');
    var editPhotoUrl = document.querySelector('#photo');
    var editPhoto = document.querySelector('#img-placeholder');
    var editNotes = document.querySelector('#notes');
    var objectId = Number(event.target.closest('li').getAttribute('data-entry-id'));
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].id === objectId) {
        data.editing = data.entries[i];
        editTitle.value = data.entries[i].title;
        editPhotoUrl.value = data.entries[i].photoURL;
        editPhoto.src = data.entries[i].photoURL;
        editNotes.value = data.entries[i].notes;
      }
    }
  });
  // ============== =============== ====================//

  var $featureThreeRowTwo = document.createElement('div');
  $featureThreeRowTwo.setAttribute('class', 'row');
  $divSecondColumn.appendChild($featureThreeRowTwo);
  // ============== END ==============//

  var $pContent = document.createElement('p');
  $pContent.setAttribute('class', 'padding');
  $pContent.textContent = entryObject.notes;
  // $divSecondColumn.appendChild($pContent);
  $featureThreeRowTwo.appendChild($pContent);
  return $liElement;
}

function DOMContentLoaded() {
  if (data.entries.length > 0) {
    noEntries.classList.add('hidden');
    for (var i = 0; i < data.entries.length; i++) {
      var accessEntry = userEntry(data.entries[i]);
      entryLists.append(accessEntry);
    }
  }
  changeView();
}
window.addEventListener('DOMContentLoaded', DOMContentLoaded);

// Entries tab in the navbar should change the data-view to "entries"
// make a function to swap class attributes of the data-view.
// make a queryselector for entries in navbar
// add and event listener to entries in navbar
entriesNavBar.addEventListener('click', function (event) {
  event.preventDefault();
  entryForm.reset();
  editPhoto.src = './images/placeholder-image-square.jpg';
  data.view = 'view-entries';
  entryFormFeature.classList.add('hidden');
  entryView.classList.remove('hidden');
});

var newEntryButton = document.querySelector('.new-entry-button');
newEntryButton.addEventListener('click', function (event) {
  entryView.classList.add('hidden');
  entryFormFeature.classList.remove('hidden');
  newEntryHeading.classList.remove('hidden');
  editEntryHeading.classList.add('hidden');
});

// get information from each element--
// data
// be able to search data.entries id in local-storage to give the ability to choose what to edit
