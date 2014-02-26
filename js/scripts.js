var Contact = {
  all: [],
  
  create: function(firstName, lastName) {
    var contactInstance = Object.create(Contact);
    contactInstance.initialize(firstName, lastName);
    Contact.all.push(contactInstance);
    return contactInstance;
  },

  initialize: function(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.addresses = [];
    this.phones = [];
  },

  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
};

var Address = {
  fullAddress: function() {
    return this.street + "<br />" + this.city + ", " + this.state + " " + this.zip;
  },

  valid: function() {
    if (this.street.search(/[0-9]/) == -1)
      return false;
    if (this.city.search(/[0-9]/) != -1)
      return false;
    if (this.state.length != 2 || this.state.search(/[0-9]/) != -1)
      return false;
    if (this.zip.length != 5 || this.zip.search(/[a-z]/i) != -1)

      return false;

    return true;
  }

};

var Phone = {
  formatted: function() {
    return "(" + this.digits.slice(0,3) + ") " + this.digits.slice(3,6) + "-" + this.digits.slice(6);
  },

  valid: function() {
    if (this.digits.length !== 10) {
      return false;
    }
    return true;
  }
};



$(document).ready(function() {
  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address">' +
                                 '<div class="form-group">' +
                                   '<label for="new-street">Street</label>' +
                                   '<input type="text" class="form-control" id="new-street">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-city">City</label>' +
                                   '<input type="text" class="form-control" id="new-city">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-state">State</label>' +
                                   '<input type="text" class="form-control" id="new-state">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-zip">Zip</label>' +
                                   '<input type="text" class="form-control" id="new-zip">' +
                                 '</div>' +
                               '</div>');
  });

  $("#add-phone").click(function() {
    $("#new-phones").append('<div class="new-phone">' +
                              '<div class="form-group">' +
                                '<label for="new-phone-in">Phone</label>' +
                                '<input type="text" class="form-control" id="new-phone-in">' +
                              '</div>' +
                            '</div>');
  });

  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();


    var newContact = Contact.create(inputtedFirstName, inputtedLastName);
    
    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input#new-street").val();
      var inputtedCity = $(this).find("input#new-city").val();
      var inputtedState = $(this).find("input#new-state").val();
      var inputtedZip = $(this).find("input#new-zip").val();

      var newAddress = Object.create(Address);
      newAddress.street = inputtedStreet;
      newAddress.city = inputtedCity;
      newAddress.state = inputtedState;
      newAddress.zip = inputtedZip;

      newContact.addresses.push(newAddress);
    });

    $(".new-phone").each(function() {
      var inputtedPhone = $(this).find("input#new-phone-in").val();
      
      var newPhone = Object.create(Phone);
      newPhone.digits = inputtedPhone;

      newContact.phones.push(newPhone);
    });

    $("ul#contacts").append("<li><span class=\"contact\">" + newContact.fullName() + "</span></li>");

    

    $(".contact").last().click(function() {
      $("#show-contact").show();

      $("#show-contact h2").text(newContact.fullName());
 
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        if (address.valid())
          $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
        else
          $("ul#addresses").append("<li>Invalid Address Submitted</li>");
      });

      $("ul#phones").text("");
      newContact.phones.forEach(function(phone) {
        if (phone.valid())
          $("ul#phones").append("<li>" + phone.formatted() + "</li>");
        else
          $("ul#phones").append("<li>Invalid phone number submitted</li>");
      });
    });

    this.reset();
  });
});
