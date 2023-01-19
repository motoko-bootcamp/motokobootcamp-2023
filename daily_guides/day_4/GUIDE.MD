## Why Does The IC Use (2) IDs?
Ethereum only has accounts. On this network an account is “an entity with an ether (ETH) balance that can send transactions on Ethereum”. In this case, an account could either be a user, wallet, or smart contract.

The internet computer protocol, being a more advanced network, breaks things out into two types of types of IDs:
* **Principal IDs** (or just “*Principal*”) represent a unique (and authenticated) user or canister who interacts with a computer system. A single Principal may have control over an unlimited number of Accounts.
* **Account Identifiers** (or just “*Account*”) represent a wallet on the [ICP Ledger canister](https://internetcomputer.org/docs/current/developer-docs/integrations/ledger/), which is meant to be used for holding assets (such as tokens or NFTs). Every Account is controlled by exactly (1) Principal.

You can use a Principal to derive an Account which can be controlled by that Principal, but you cannot use an Account to derive the Principal which controls it. This means you can send assets to a controller (if you have the recipient’s account), with the controller’s Principal remaining private and unknown to you.

The distinction of Principal and Account allow for more complex (and private) interactions between users and assets.

## Principals
A Principal is a unique and authenticated actor who can call canister functions on the Internet Computer network. It can also be thought of as a public key, using the terminology of [asymmetric cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography).

### Classes of Principals
There are (5) classes of Principals, but we only need to focus on (3). If you are curious about the other classes, you can find the [full documentation here](https://internetcomputer.org/docs/current/references/ic-interface-spec#id-classes).
* **Self-authenticating ids** are external users with private key. This would be tpyically be users of your dapp who sign in using a wallet or identity service. These Principals are 29 bytes long.
* **Opaque ids** are the class of Principals used for canisters. Specifically, canister Principals are shorter than user Principals and they end with "-cai". You could write yourself a helper function to identity is a Principal is a canister Principal using something like this:
```
  import Bool         "mo:base/Bool";
  import Principal    "mo:base/Principal";
  import Text         "mo:base/Text";

  module {
  
    public func isCanisterPrincipal(p : Principal) : Bool {
      let principal_text = Principal.toText(p);
      let correct_length = Text.size(principal_text) == 27;
      let correct_last_characters = Text.endsWith(principal_text, #text "-cai");

      if (Bool.logand(correct_length, correct_last_characters)) {
        return true;
      };
      return false;
    };
    
  };
```
* **Anonymous id** is `0x04`, an this is the "default caller" encountered when an unauthenticated user calls functions. For example, if information from a canister needs to be presented on a webpage before the user logs in, you'd call functions to fetch this information and your canister would see that the caller is the Anonymous id (because we don't know the user's Principal until they log in). The [Motoko Base Library includes an `isAnonymous` function](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/base/Principal#function-isanonymous) you can use to check if the caller is authenticated or not.

## Receiving assets with a Principal (Default Subaccount)
Some of you may be wondering why certain wallets (such as Plug) give you the option of sending assets to a Principal. We will discuss subaccounts in more detail, but the only thing worth mentioning here is that it's easy to find the "Default Account" of a Principal, so what's happening in the background is that you are actually sending assets to the Default Account of the Principal that you entered into the "Send" field. 

However, not every wallet provider does this conversion from Principal to default account. To make things even more complicated, there are some types of assets that use a standard which actually associates assets to Principals instead of Accounts. Using the ICP Ledger is optional, the creator of a token or NFT canister is free to implement their own ledger. In short, be careful when transferring ICP assets to use the right type of id (Principal or Account). 

## Getting a caller’s Principal
To get the Principal that is calling a function, all you have to do is add `shared ({ caller })` when declaring your function, and then within your function you can use the `caller` variable (which will be the Principal of whatever is calling that function). This syntax is added immediately before `func` and it can even be added before `actor` (to get the Principal which deployed the canister).

Here's an example of a function that traps with an error if it's called by a canister (using the helper function defined above), but returns "Hello human!" otherwise.
```
  import Bool         "mo:base/Bool";
  import Principal    "mo:base/Principal";
  import Text         "mo:base/Text";
  
  import Helpers      "helpers";

  actor {
  
    public shared({ caller }) func helloHuman() : async Text {
      assert not _isCanister(caller);
      return "Hello human!";
    };
    
    private func _isCanister(p : Principal) : Bool {
      return Helpers.isCanisterPrincipal(p);
    };
  
  };
```

Here is an example of a function that returns `true` if the caller is the Principal who deployed the canister, or `false` otherwise.
```
  import Bool         "mo:base/Bool";
  import Principal    "mo:base/Principal";

  // Here you get the Principal which deployed the canister, and set it as a variable called 'creator'
  shared ({ caller = creator }) actor {

    // Here you define a stable variable called 'master' to save the value of 'creator' to the state of your canister.
    stable var master : Principal = creator;

    // Here you get the Principal calling this function, and then you check to see if it is equal to 'master'
    public shared ({ caller }) func isMaster() : async Bool {
      if (caller == master) {
        return true;
      };
      return false;
  };
```

## Accounts
Accounts are large integers (represented as 32-byte strings) which represent a unique wallet that can hold assets on [The Ledger canister](https://internetcomputer.org/docs/current/references/ledger#_accounts).

### Subaccounts & Default Account
To derive an account from a Principal, you need what's called a "subaccount". 

The exact algorithm for deriving an account is not important right now, all you need to know is that you need both a Principal and Subaccount to get an Account:
`func accountIdentifier(principal: Principal, subaccount: Subaccount) : AccountIdentifier'

A subaccount is also a large integer (which could also be represented as a 32-byte string), but it's easier to think of them almost as a "counter".

For any Principal, we refer to the account which corresponds to the subaccount which is equal to 0 as the default account of that principal. If you wanted to generate another account for that Principal, then you could use the subaccount which is equal to 1 to generate another Account. You could even pick any random 32-byte number, and then use it to get an account which coudl be controlled by that Principal. There are a lot of Accounts which could be generated for a Principal, because a 32-bit unsigned integer has a maximum value of 4,294,967,295.

### Principal to Account
A canister has it's own Principal, and it often needs to store and control assets (such as tokens or NFTs) on behalf of users (who also have their own Principal).

A common practice is to convert the Principal of a user into a subaccount, then to use that subaccount to derive an Account (unique to that user) which the canister can control.

Don't worry about understand this logic right now, but here is the example of a helper function which is commonly used to turn the Principal of a user into a subaccount (in this example it's representing the subaccount as a Blob).
```
  public type Subaccount = Blob;

  public func principalToSubaccount(principal: Principal) : Blob {
      let idHash = SHA224.Digest();
      idHash.write(Blob.toArray(Principal.toBlob(principal)));
      let hashSum = idHash.sum();
      let crc32Bytes = beBytes(CRC32.ofArray(hashSum));
      let buf = Buffer.Buffer<Nat8>(32);
      let blob = Blob.fromArray(Array.append(crc32Bytes, hashSum));

      return blob;
  };
```

Then another helper function could be used to combine this subaccount with a Principal (such as the canister's principal) to create an Account which is represented as a Blob (again, don't worry about understanding this logic right now).
```
  public type AccountIdentifier = Blob;
  
  public func accountIdentifier(principal: Principal, subaccount: Subaccount) : AccountIdentifier {
    let hash = SHA224.Digest();
    hash.write([0x0A]);
    hash.write(Blob.toArray(Text.encodeUtf8("account-id")));
    hash.write(Blob.toArray(Principal.toBlob(principal)));
    hash.write(Blob.toArray(subaccount));
    let hashSum = hash.sum();
    let crc32Bytes = beBytes(CRC32.ofArray(hashSum));
    Blob.fromArray(Array.append(crc32Bytes, hashSum))
  };
```

Now we could use these Helper functions to create a unique ICP deposit Address for a user (which in this case is represented as a Blob).
```
  import Principal    "mo:base/Principal";
  import Text         "mo:base/Text";

  import Helpers      "helpers";
  
  // This syntax gives you a 'this' variable which the canister can use to get it's own Principal
  shared actor class ExampleCanister() = this {
  
    // Uses the Principal 'fromActor' value from the base library to store the canister's Principal to a 'canisterPrincipal' variable
    let canisterPrincipal : Principal = Principal.fromActor(this);
  
    public type AccountIdentifier = Blob;
    public type Subaccount = Blob;
    
    public shared ({ caller }) func getAddress() : async AccountIdentifier {
      // Returns a account derived from the canister's Principal and a subaccount. The subaccount is being derived from the caller's Principal.
      return Helpers.accountIdentifier(canisterPrincipal, Helpers.principalToSubaccount(caller));
    };
    
  };
```

### Useful documentation
* Account.mo example (useful helper functions for back end)
* Account.js example (useful helper functions for front end)
* [Principal base library documentation](https://internetcomputer.org/docs/current/references/motoko-ref/Principal)
* [Principal interface documentation](https://internetcomputer.org/docs/current/references/ic-interface-spec#principal) (this information is deeper than you need to go for now, but it is good to know where it is)
