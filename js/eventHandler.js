
// Email Validation
function checkEmail() {                            // Declare function
  var elMsg = document.getElementById('feedback');    // Get feedback element
  var reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  //console.log(this.value);
  //console.log(reg.test(this.value));
  if (reg.test(this.value)) {                        // If email matches regular expression
    elMsg.textContent = '';                          // Clear message
  } else {                                           // Otherwise
    elMsg.textContent = 'Please enter an valide email address';   // Set message
  }
}

var elEmail = document.getElementById('email'); // Get username input
elEmail.onblur = checkEmail;  // When it loses focus call checkuserName()

// email validation reference: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript


// Text Counter for User Messages
// This example has been updated to fire on the keyup event instead of keypress 
// (on the last line in the event listener) as new text is not in the textarea until the key is released

var elMessage;                                                    // Declare variables

function charCount(e) {                                    // Declare function
  var textEntered, charDisplay, counter, lastkey;          // Declare variables
  textEntered = document.getElementById('message').value;  // User's text
  charDisplay = document.getElementById('charactersLeft'); // Counter element
  counter = (140 - (textEntered.length));                  // Num of chars left
  charDisplay.textContent = counter + ' characters left.';                       // Show chars left
  //lastkey = document.getElementById('lastKey');            // Get last key elem
  //lastkey.textContent = 'Last key in ASCII code: ' + e.keyCode; // Create msg 
}

elMessage = document.getElementById('message');                   // Get msg element
elMessage.addEventListener('keyup', charCount, false); // on keyup - call charCount()

