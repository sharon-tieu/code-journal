/* global data */
// Listen for 'input' events on the photoURL input. This will help update the src attribute of the photo preview when the input value changes.
var $photoUrl = document.querySelector('.photo');
var $imgSrc = document.querySelector('#img-placeholder');
var $entryForm = document.querySelector('.entry-form'); // must assign '.entry-form' to a new variable first
var $saveButton = document.querySelector('.button');
var entryList = document.querySelector('.entry-list');
$entryForm.addEventListener('submit', newEntry); // listen for 'submit' events on the journal entry form. newEntry is made as a name for our function which will be stated in the next line.
var $notes = document.querySelector('.textbox').value;

// Write a function to check the state of the value of the photo. if the value is empty or an '', then the attribute should be the placeholder. otherwise, it should hold the value of the photo URL
$photoUrl.addEventListener('input', function (event) {
  if ($photoUrl.value === '') {
    $imgSrc.setAttribute('src', './images/placeholder-image-square.jpg');
  } else {
    $imgSrc.setAttribute('src', $photoUrl.value);
  }
});

function newEntry(event) {
  event.preventDefault(); // event.preventDefault() will prevent the browser from automatically reloading the page with the form's values in the url.
  var $title = document.querySelector('.title').value;
  var $photoURL = document.querySelector('.photo').value;
  var $notes = document.querySelector('.textbox').value;
  var entryData = {
    title: $title,
    photoURL: $photoURL,
    notes: $notes
  };
  entryData.entryId = data.nextEntryId; // creating a new key for entryData
  entryList.prepend(userEntry(entryData));
  data.nextEntryId++; // incrementing
  data.entries.unshift(entryData);
  localStorage.setItem('JavaScriptLocalStorage', JSON.stringify({ ...data, entries: data.entries }));
  $imgSrc.setAttribute('src', './images/placeholder-image-square.jpg');
  $entryForm.reset(); // resets the entryForm once user clicks SAVE button
}

// make a function that will save user entries after pressing the save BUTTON.
/* $saveButton.addEventListener('click', function (event) {
  var userDataEntry = {
    title: $entryForm.elements.title.value,
    photoURL: $photoUrl.value,
    notes: $entryForm.elements.notes.value
  };
  data.entries.unshift(userDataEntry);
}); */

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

function DOMContentLoaded() {
  const entries = localStorage.getItem('JavaScriptLocalStorage');
  const previousData = JSON.parse(entries);
  for (var i = 0; i < previousData.entries.length; i++) {
    var accessEntry = userEntry(previousData.entries[i]);
    entryList.append(accessEntry);
  }
}
window.addEventListener('DOMContentLoaded', DOMContentLoaded);
