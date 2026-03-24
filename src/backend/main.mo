import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Array "mo:core/Array";

actor {
  type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
  };

  module ContactSubmission {
    public func compare(sub1 : ContactSubmission, sub2 : ContactSubmission) : Order.Order {
      Text.compare(sub1.name, sub2.name);
    };
  };

  var nextId = 0;
  let submissions = Map.empty<Nat, ContactSubmission>();

  var admin : ?Principal = null;

  public shared ({ caller }) func init() : async () {
    assert admin == null;
    admin := ?caller;
  };

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let submission : ContactSubmission = {
      name;
      email;
      message;
    };
    submissions.add(nextId, submission);
    nextId += 1;
  };

  public query ({ caller }) func getAllSubmissions() : async [ContactSubmission] {
    if (admin != ?caller) { Runtime.trap("Unauthorized") };
    submissions.values().toArray().sort();
  };
};
