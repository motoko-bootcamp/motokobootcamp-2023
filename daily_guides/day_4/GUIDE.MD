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
The easiest way to explain the syntax for getting the caller of a function is to show a few examples.

Here's an example of a function that traps with an error if it's called by a canister (using the helper function defined above), but returns "Hello human!" otherwise.
```
  import Text         "mo:base/Text";
  import Helpers      "helpers";

  actor {
  
    public shared({ caller }) func helloHuman() : async Text {
      assert not _isCanister(caller);
      return "Hello human!";
    };
    
    private func _isCanister(caller : Principal) : Bool {
      return Helpers.isCanisterPrincipal(caller);
    };
  
  };
```

Here is an example of a function that returns true if the caller is the Principal who deployed the 

### Useful documentation
