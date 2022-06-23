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
      if (data.entries[i].id === data.editing.id) {
        data.entries[i] = {
          id: data.editing.id,
          title,
          photoURL,
          notes
        };
      }
    }
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
    data.editing = null;
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

function changeView() {
  if (data.view === 'entry-form') {
    data.view = 'entry-form';
    entryFormFeature.classList.add('hidden');
    viewEntries.classList.remove('hidden');
  } else if (data.view === 'view-entries') {
    entryFormFeature.classList.remove('hidden');
    viewEntries.classList.add('hidden');
  }
}

var editEntryHeading = document.querySelector('.edit-entry-heading');
var newEntryHeading = document.querySelector('.new-entry-heading');
var deleteAnEntry = document.querySelector('.delete-entry');

function editEntryView() {
  deleteAnEntry.classList.remove('hidden');
  if (data.view === 'entry-form' && modalContainer.classList.add('hidden')) {
    entryFormFeature.classList.add('hidden');
    editEntryHeading.classList.remove('hidden');
  } else if (data.view === 'view-entries') {
    entryFormFeature.classList.remove('hidden');
    viewEntries.classList.add('hidden');
    newEntryHeading.classList.add('hidden');
    editEntryHeading.classList.remove('hidden');
  }
}

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

  var $featureThreeRowTwo = document.createElement('div');
  $featureThreeRowTwo.setAttribute('class', 'row');
  $divSecondColumn.appendChild($featureThreeRowTwo);

  var $pContent = document.createElement('p');
  $pContent.setAttribute('class', 'padding');
  $pContent.textContent = entryObject.notes;
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

entriesNavBar.addEventListener('click', function (event) {
  event.preventDefault();
  entryForm.reset();
  editPhoto.src = './images/placeholder-image-square.jpg';
  data.view = 'view-entries';
  entryFormFeature.classList.add('hidden');
  entryView.classList.remove('hidden');
});

var modalContainer = document.querySelector('#modal-container');
var newEntryButton = document.querySelector('.new-entry-button');
newEntryButton.addEventListener('click', function (event) {
  entryForm.reset();
  imgSrc.setAttribute('src', './images/placeholder-image-square.jpg');
  entryView.classList.add('hidden');
  entryFormFeature.classList.remove('hidden');
  newEntryHeading.classList.remove('hidden');
  editEntryHeading.classList.add('hidden');
  deleteAnEntry.classList.add('hidden');
  modalContainer.classList.add('hidden');
});

deleteAnEntry.addEventListener('click', function () {
  modalContainer.classList.remove('hidden');
});

var cancelButton = document.querySelector('#do-not-delete');
cancelButton.addEventListener('click', function () {
  event.preventDefault();
  modalContainer.classList.add('hidden');
});

var confirmButton = document.querySelector('.confirm-button');
confirmButton.addEventListener('click', function () {

});
