actor {
    //My discord is: iri#1598
    //Feel free to DM me any question.
    type Proposal = {};// TO DEFINE;

    public shared({caller}) func submit_proposal(this_payload : Text) : async {#Ok : Proposal; #Err : Text} {
        return #Err("Not implemented yet");
    };

    public shared({caller}) func vote(proposal_id : Int, yes_or_no : Bool) : async {#Ok : (Nat, Nat); #Err : Text} {
        return #Err("Not implemented yet");
    };

    public query func get_proposal(id : Int) : async ?Proposal {
        return null
    };
    
    public query func get_all_proposals() : async [(Int, Proposal)] {
        return []
    };
};