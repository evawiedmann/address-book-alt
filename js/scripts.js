// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0,
  this.selectedContact = -1;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.selectContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i] && this.contacts[i].id == id) {
      this.selectedContact = i;
      return true;
    }
  }
  return false;
}

AddressBook.prototype.deleteContact = function() {
  if (this.selectedContact > -1) {
    delete this.contacts[this.selectedContact];
    this.selectedContact = -1;
    return true;
  }
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, emailAddress, address) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.emailAddress = emailAddress,
  this.address = address;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Contact.prototype.updateContact = function(name1, name2, number, email, address) {
  this.firstName = (name1 ? name1 : this.firstName);
  this.lastName = (name2 ? name2 : this.lastName);
  this.phoneNumber = (number ? number : this.phoneNumber);
  this.emailAddress = (email ? email : this.emailAddress);
  this.address = (address ? address : this.address);
}


// User Interface Logic ---------
var addressBook = new AddressBook();


function displayContactDetails(addressBookToDisplay) {
  attachContactListeners();
  var contactsList = $("ul#contacts");
  // showContact(this.id);

  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.fullName() + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    addressBook.selectContact(this.id);
    showContact();
  });

  $("#buttons").on("click", ".updateButton", function() {
    updateInfo();
  });

  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact();
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

function showContact() {
  var contact = addressBook.contacts[addressBook.selectedContact];

  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  $(".address").html(contact.address);
}

function updateInfo() {
  var getContact = addressBook.contacts[addressBook.selectedContact];
  $("input#new-first-name").attr("placeholder", getContact.firstName);
  $("input#new-last-name").attr("placeholder", getContact.lastName);
  $("input#new-phone-number").attr("placeholder", getContact.phoneNumber);
  $("input#new-email-address").attr("placeholder", getContact.emailAddress);
  $("input#new-address").attr("placeholder", getContact.address);
  $("#new-contact button").text("Done");
}

$(document).ready(function() {
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmailAddress = $("input#new-email-address").val();
    var inputtedAddress = $("input#new-address").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-address").val("");

    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress, inputtedAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})
