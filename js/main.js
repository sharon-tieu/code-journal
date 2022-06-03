/* global data */

// Listen for 'input' events on the photoURL input. This will help update the src attribute of the photo preview when the input value changes.
var $photoUrl = document.querySelector('.photo');
var $imgSrc = document.querySelector('#img-placeholder');
$photoUrl.addEventListener('input', function (event) {
  // check the state of the value of the photo. if the value is empty or an '', then the attribute should be the placeholder. otherwise, it should hold the value of the photo URL
  if ($photoUrl.value === '') {
    $imgSrc.setAttribute('src', './images/placeholder-image-square.jpg');
  } else {
    $imgSrc.setAttribute('src', $photoUrl.value);
  }
});

var $entryForm = document.querySelector('.entry-form'); // must assign '.entry-form' to a new variable first
$entryForm.addEventListener('submit', newEntry); // listen for 'submit' events on the journal entry form. newEntry is made as a name for our function which will be stated in the next line.

function newEntry(event) { // function is defined and named here called function newEvent(event) { }
  event.preventDefault(); // event.preventDefault() will prevent the browser from automatically reloading the page with the form's values in the url.
  var title = document.querySelector('.title').value; // select '.title' and assign it to a new variable.
  var photoURL = document.querySelector('.photo').value; // select '.photo' and assign it to a new variable.
  var notes = document.querySelector('.textbox').value; // select '.textbox' and assign it to a new variable.
  var entryData = { // using JavaScript to gather user input from HTML forms using var entryData = { }.
    // the title, photoURL, notes (the new variables) will be assigned to a new variable as a collective. This will be called entryData
    title, // this is the variable we assigned to title.values and so on for the next lines 29 and 30.
    photoURL,
    notes
  };
  entryData.entryId = data.nextEntryId;
  data.nextEntryId++; // incrementing
  data.entries.unshift(entryData); // prepends. prepends means to put it in the beginning of something which is used as a .unshift();. With each data SAVED, it will be placed in the beginning of the object.
  // localStorage.setItem('New Data', JSON.stringify(entryData)); // storing in localstorage by using localStorage.setItem(). Must use JSON.stringify() because localStorage only accepts data as a string.
  $imgSrc.setAttribute('src', './images/placeholder-image-square.jpg');
  $entryForm.reset(); // resets the entryForm once user clicks SAVE button
}

window.addEventListener('beforeunload', function (event) {
  var stringData = JSON.stringify(data);
  localStorage.setItem('New data', stringData);
});
var previousData = localStorage.getItem('javascript-local-storage');
if (previousData !== null) {
  data.parse(previousData);
}

// create a DOM tree for our html sample journal entry
var domTree = function userEntry(entry) {
  var liElement = document.createElement('li');
  liElement.setAttribute('class', 'row');

  var divElement = document.createElement('div');
  divElement.setAttribute('class', 'column-half');
  liElement.appendChild(divElement);

  var imgElement = document.createElement('img');
  imgElement.setAttribute('src', $photoUrl.value);
  divElement.appendChild(imgElement);

  var divTwoElement = document.createElement('div');
  divTwoElement.setAttribute('class', 'column-half');

  var hThree = document.createElement('h3');
  var pContent = document.createElement('p');
  pContent.textContent = notes.value;
  hThree.appendChild(pContent);

  return liElement;
};

var ulElement = document.querySelector('ul');
for (var i = 0; i < data.length; i++) {
  var accessEntry = domTree(data[i]);
  ulElement.append(accessEntry);
}

document.addEventListener('DOMContentLoaded', entry => {
  console.log('DOM fully loaded and parsed!:', domTree);
});
