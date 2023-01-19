import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Option "mo:base/Option";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Nat64 "mo:base/Nat64";
import Nat16 "mo:base/Nat16";
import Blob "mo:base/Blob";
import Nat8 "mo:base/Nat8";
import SimpleLedger "canister:SimpleLedger";
import Nat "mo:base/Nat";
import Bool "mo:base/Bool";

actor {
  let local_balances : HashMap.HashMap<Principal, Nat> = HashMap.fromIter(Iter.fromArray([]), 5, Principal.equal, Principal.hash);

  public shared ({caller}) func init_account(amount : Nat) : async Result.Result<{}, Text>{
    local_balances.put(caller, amount);
    #ok {}
  };

  public shared ({caller}) func get_local_balance () : async Result.Result<Text, Text>{
    let caller_balance = Option.get(local_balances.get(caller), 0);
    return #ok("Local Balance of account " # Principal.toText(caller) # " is " # Nat.toText(caller_balance));
  };

  public shared ({caller}) func get_ledger_balance () : async Result.Result<Text, Text>{
    return await SimpleLedger.get_balance(?caller);
  };

  var lock : Bool = false;
  public shared ({caller}) func refund () : async Result.Result<Text, Text> {
    if(lock){
      return #err("Refund already in progress. Please try again later.");
    };
    lock := true;
    let caller_balance = Option.get(local_balances.get(caller),0);
    let result = await SimpleLedger.deposit(caller_balance, ?caller);
    if (Result.isOk(result)) {
      local_balances.put(caller, 0);
    };
    update_statistics_after_refund(caller);  // Traps/Panics

    lock := false;

    return result;
  };

  func update_statistics_after_refund (caller: Principal) {
    assert(false);  // Traps/Panics
  };
};