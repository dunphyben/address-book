beforeEach(function() {
  Contact.all = [];
});

describe("Contact", function() {
  describe("create", function() {
    it("creates a new instance of Contact", function() {
      var testContact = Contact.create();
      Contact.isPrototypeOf(testContact).should.equal(true);
    });

    it("initializes the contact", function() {
      var testContact = Contact.create("Mary", "Jane");
      testContact.addresses.should.eql([]);
    });

    it("adds the contact to the .all property", function() {
      var testContact = Contact.create();
      Contact.all.should.eql([testContact]);
    });
  });



  describe("initialize", function() {
    it("sets the first and last name", function() {
      var testContact = Object.create(Contact);
      testContact.initialize("Mary", "Jane");
      testContact.firstName.should.equal("Mary");
      testContact.lastName.should.equal("Jane");
    });
  });

  describe("fullName", function() {
    it("combines the first and last name, separated by a space", function() {
      var testContact = Object.create(Contact);
      testContact.firstName = "Patrick";
      testContact.lastName = "McGreevy";
      testContact.fullName().should.equal("Patrick McGreevy");
    });
  });
});

describe("Address", function() {
  describe("fullAddress", function() {
    it("shows the street, city, state, and zip on the same line separated by commas", function() {
      var testAddress = Object.create(Address);
      testAddress.street = "123 Main St";
      testAddress.city = "Portland";
      testAddress.state = "OR";
      testAddress.zip = "97201";
      testAddress.fullAddress().should.equal("123 Main St<br />Portland, OR 97201");
    });
  });

  describe("valid", function() {
    it("returns false if an address is entered incorrectly", function() {
      var testAddress = Object.create(Address);
      testAddress.street = "Main St";
      testAddress.city = "Portl8";
      testAddress.state = "ORR";
      testAddress.zip = "9720";
      testAddress.valid().should.equal(false);      
    });
  });
});

describe("Phone", function() {
  describe("formatted", function() {
    it("returns a string of the 10-digit phone number in '(###) ###-####' format", function() {
      var testPhone = Object.create(Phone);
      testPhone.digits = "5035554444";
      testPhone.formatted().should.equal("(503) 555-4444");
    });
  });

  describe("valid", function() {
    it("returns false if a phone number is entered incorrectly", function() {
      var testPhone = Object.create(Phone);
      testPhone.digits = "555666777";
      testPhone.valid().should.equal(false);
    });
  });
});
