import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";

actor {
  type Service = {
    name : Text;
    description : Text;
  };

  type ProjectType = {
    #commercial;
    #residential;
  };

  type ContactFormSubmission = {
    name : Text;
    phone : Text;
    message : Text;
    projectType : ProjectType;
  };

  type CompanyInfo = {
    name : Text;
    phone : Text;
    email : Text;
    address : Text;
    website : Text;
  };

  module ContactFormSubmission {
    public func compare(a : ContactFormSubmission, b : ContactFormSubmission) : Order.Order {
      a.name.compare(b.name);
    };
  };

  // Persistent Data Stores
  let contactFormSubmissions = List.empty<ContactFormSubmission>();

  public query ({ caller }) func getCompanyInfo() : async CompanyInfo {
    {
      name = "AZ Drywall Solution";
      phone = "+1 (480) 416-0016";
      email = "info@azdrywallsolution.com";
      address = "Arizona, USA";
      website = "https://azdrywallsolution.com";
    };
  };

  public query ({ caller }) func getServices() : async [Service] {
    [
      {
        name = "Drywall Installation";
        description = "Professional drywall installation for residential and commercial projects.";
      },
      {
        name = "Drywall Repair";
        description = "Expert repair services for damaged drywall, including holes, cracks, and water damage.";
      },
      {
        name = "Texture Matching";
        description = "Seamless texture matching for repairs and new installations.";
      },
      {
        name = "Painting";
        description = "Interior painting services to complete your project.";
      },
    ];
  };

  public shared ({ caller }) func submitContactForm(name : Text, phone : Text, message : Text, projectType : ProjectType) : async () {
    if (name.size() == 0 or phone.size() == 0 or message.size() == 0) {
      Runtime.trap("All fields are required");
    };

    let submission : ContactFormSubmission = {
      name;
      phone;
      message;
      projectType;
    };

    contactFormSubmissions.add(submission);
  };

  public query ({ caller }) func getContactFormSubmissions() : async [ContactFormSubmission] {
    contactFormSubmissions.toArray().sort();
  };
};
