# Day 4 🐔
Welcome to Day 4 of the Motoko Bootcamp! If you've been that far you're already an hero 🦸
<br/> We hope you are all making progress, learning new skills and not suffering too much. 
In the next few days you should spend more & more time into the core project - that's why the coding challenges & questions will be less important in this guide and the followings. <br/>

Today, we'll be diving deeper into more advanced topics in Motoko such as working with Buffers, using HashMap/TrieMap for data storage, understanding Principals & Account Identifiers, and discussing the issues when upgrading a canister.

## 🧩 Motoko: a few more datastructures: List, Buffer & TrieMap.
We have manipulated a lot of **Array** during the past few days. Since arrays have fixed sizes in Motoko they are not very efficient data structures when it comes to adding elements. 
In that case the recommended data structures are: **List** or **Buffer** and a more advanced structure would be an **HashMap** or a **TrieMap**. Today, we will see 3 of them!

## List
List in Motoko are defined as purely-functional, singly-linked lists. 

```motoko
public type List<T> = ?(T, List<T>);
```
A **List** of is an (optional) couple of two elements:
- The 1st element is a value of type T.
- The 2nd element is a List of type T.

A linked list has a dynamic size and it is really easy and efficient to add elements to it using the following syntax:
```motoko
import List "mo:base/List";
actor {
  var list : List.List<Nat> = List.nil<Nat>();
  list := List.push<Nat>(8, list);
}
```

Unfortunately, it's not as efficient to access elements in the list as you'll probably have to traverse a lot of them. The cost of looking for an element will increase linearly with the size of your list - contrary to arrays where we could just refer to array[i] when we needed the element at index i.
## ➕ Buffer
After having suffered for the past few days using **Array** in Motoko you'll love to learn that **Buffer** are actually more interesting and generally used in production code. 

> Buffer are implemented with an underlying array that will grow/reduce as needed to accomodate for the number of elements added in the buffer. More information in the [Buffer](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/base/Buffer) documentation.  

To define a new buffer - you have to specify an initial size and the type of elements in the buffer:
```motoko
import Buffer "mo:base/Buffer";
actor {

  let my_buffer = Buffer.Buffer<Nat>(1);
};
```

Since **Buffer** are defined as classes - they have a nice interface to work with you can call methods on it such as:
- .add(): will add an element to the end of the buffer.
```motoko
my_buffer.add(4);
```
- .size(): returns the number of elements in the buffer.
```motoko
let s = my_buffer.size(); //1
```
- .clear(): will remove all values from the buffer.
```motoko
my_buffer.clear(); //1
```

> One drawback of having defined Buffer as a class is that contrary to Array they can't be defined as stable structure by default. Which requires some additional work when upgrading your canister - more on that later.

## HashMap & TrieMap
In Motoko, **HashMap** and **TrieMap** have a similar interface: the only difference is that TrieMap is represented internaly by a Trie 
They both represent a key/value store:
- **K** will be the type of the key (Nat, Text, Principal...)
- **V** will be the type of the value (User data, Token balance...)

This is how you would instantiate your first HashMap, with **Keys** of type **Principal** and value of type **Name**. 
In the following code you can also see a method to add elements & another one that returns an array that contains all the values of the HashMap.

```motoko
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
actor {

    let usernames = HashMap.HashMap<Principal, Text>(0, Principal.equal, Principal.hash);

    public shared ({ caller }) func add_username(name : Text) : async () {
      usernames.put(caller, name);
    };
    
};
```

> HashMap & TrieMap are super used in Motoko. Unfortunately they are not stable by default (being defined as classes) but the community is working on [fixes](https://github.com/ZhenyaUsenko/motoko-hash-map).

## Why does The IC Use (2) IDs?
Ethereum only has accounts. On this network an account is “an entity with an ether (ETH) balance that can send transactions on Ethereum”. In this case, an account could either be a user, wallet, or smart contract.

The Internet Computer Protocol, being a more advanced network, breaks things out into two types of types of IDs:
* **Principal IDs** (or just “*Principal*”) represent a unique (and authenticated) user or canister who interacts with a computer system. 
* **Account Identifiers** (or just “*Account*”) represent a wallet on the [ICP Ledger canister](https://internetcomputer.org/docs/current/developer-docs/integrations/ledger/), which is meant to be used for holding assets (such as tokens or NFTs). Every Account is controlled by exactly (1) Principal.

> A single Principal may have control over an (almost) unlimited number of Accounts.

You can use a Principal to derive an Account which can be controlled by that Principal, but you cannot use an Account to derive the Principal which controls it. This means you can send assets to a controller (if you have the recipient’s account), with the controller’s Principal remaining private and unknown to you.

The distinction of Principal and Account allow for more complex (and private) interactions between users and assets.

## Principals
A Principal is a unique and authenticated actor who can call canister functions on the Internet Computer network. It can also be thought of as a public key, using the terminology of [asymmetric cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography).

### Classes of Principals
There are (5) classes of Principals, but we only need to focus on (3). If you are curious about the other classes, you can find the [full documentation here](https://internetcomputer.org/docs/current/references/ic-interface-spec#id-classes).
* **Self-authenticating ids** are external users with private key. This would be tpyically be users of your dapp who sign in using a wallet or identity service. These Principals are 29 bytes long.
* **Opaque ids** are the class of Principals used for canisters. Specifically, canister Principals are shorter than user Principals and they end with "-cai". You could write yourself a helper function to identity is a Principal is a canister Principal using something like this:
```motoko
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
```motoko
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
```motoko
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
```motoko
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
```motoko
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

> You'll find more links for manipulating Account & Principals at the end of this guide in the #useful-links section.

## ♻️ Upgrades
Upgrading a canister is a common task, when code is updated and deployed, the canister is upgraded. There are a few things to consider before upgrading a canister:
- Could the upgrade cause data loss?
- Could the upgrade break the dapp due to interface changes?

### Preserving state (data)
When a canister is upgraded, the state is lost by default. This means all data application data will be lost, unless it's handled to persist when the canister is upgraded. This can be achieved by storing the data in stable variables, which will persist upgrades, but stable variables does not support all data types.

### Stable types
Simple data types like Nat, Int and Text can be made stable variables, which mean their state will persist a canister upgrade, just by adding _stable_ to the declaration of the variable:

```motoko
actor MyActor {

  stable var state : Int = 0;

  public func inc() : async Int {
    state += 1;
    return state;
  };
}
```
The value of the variable `state` will persist an upgrade, and not be lost.

### Non-stable types
More complex data types like Hashmap are not stable types. This doesn't mean their values can't persist after an upgrade, it just means their persistance must be handled manually. Fortunately the functions `` and `` 

```motoko
actor MyActor {

  stable var entries : [(Text, Nat)] = [];

  let map = HashMap.fromIter<Text,Nat>(
    entries.vals(), 10, Text.equal, Text.hash);

  public func register(name : Text) : async () {
    switch (map.get(name)) {
      case null  {
        map.put(name, map.size());
      };
      case (?id) { };
    }
  };

  system func preupgrade() {
    entries := Iter.toArray(map.entries());
  };

  system func postupgrade() {
    entries := [];
  };
}
```
This code snippet shows how the state of a HashMap can persist an upgrade, by serializing the state data before the upgrade (`preupgrade()`). On the initialization of the `map` variable after the upgrade, the serialized state is loaded. This way the HashMap data is made pesistent after a canister upgrade. 


### Candid changes
Changes to a Motoko function may change the Candid interface, and that could potentially break the application. So when upgrading the canister, consider how the changes can impact the Candid interface. Even small changes to the Motoko code can have great impact on the Candid interface, and potentially break the dapp. Consider this example:

```motoko
actor {
  stable var state : Int
};
```
In this example the variable `state` is an Int, but let's say in an update the type is changed to Nat, which is not a big change. 
```motoko
actor {
  stable var state : Nat
};
```
This would be a breaking change for e.g. the client application if it expects an Integer. With this small change, the Candid interface will change.

### Data structure changes
Another example of how data can be lost, is by changing the data types. 

```motoko
actor {
  stable var state : Int
};
```
In this example the variable `state` is an Int, but let's say in an update the type is changed to Text: 
```motoko
actor {
  stable var state : Text
};
```
In this case the the current Int value will be lost. One way to avoid the data loss when changing the data types is to keep the original variable, and create a new variable for the new data type. This way the original data will not be lost due to canister upgrades.

### Upgrade vs. Reinstall
In some cases, especially for development, it may not be necessary to do a complete deploy of the code to test it. The DFX Reintall command will replace the code in the canister and delete all state data. Read more about Reinstalling canisters in the [documentation](https://internetcomputer.org/docs/current/developer-docs/build/project-setup/manage-canisters#reinstall-a-canister).

# 🧹 Task
For today you'll have to implement the datastructures for storing proposals & votes inside the DAO canister. This task is fairly vague because they are a lot of different ways to go about that but basically at the end of today you should be able to performs CRUD operations on your DAO canister and being able to upgrade your canister without loosing the data!

# Questions 🙋
1. Is the heap memory saved when upgrading a canister? How much heap memory does a canister has?
2. How much accounts can a unique Principal own?
3. Can we safely upgrade a canister from interface A to interface B?

Interface A
```motoko
actor {
  public func greet(surname : Text, firstname : Text) : async Text {
    return "Hello" # firstname # surname # " !";
  };
}
```motoko
Interface B
```motoko
actor {
  public func greet(firstname : Text) : async Text {
    return "Hello" # firstname # " !";
  };
}
```

# Coding challenges 🧑‍💻
1. Write a function `unique` that takes a list l of type List<T> and returns a new list with all duplicate elements removed.
```motoko
unique<T> : (l : List<T>) -> List<T> 
```
2. Write a function `reverse` that takes l of type List<T> and returns the reversed list.
```motoko
reverse<T> : (l : List<T>) -> List<T>;
```
3. Write a function `is_anonymous` that takes no arguments but returns a Boolean indicating if the caller is anonymous or not.
```motoko
is_anynomous : () -> async Bool; 
```
4. Write a function `find_in_buffer` that takes two arguments, buf of type **Buffer** and val of type **T**, and returns the index of the first occurrence of "val" in "buf".
```motoko
find_in_buffer<T> :  (buf: Buffer.Buffer<T>, val: T) -> Nat
```
5. Take a look at the code we've seen before in this guide:

```motoko
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
actor {

    let usernames = HashMap.HashMap<Principal, Text>(0, Principal.equal, Principal.hash);

    public shared ({ caller }) func add_username(name : Text) : async () {
      usernames.put(caller, name);
    };


};
```
Add a function called `get_usernames` that will return an array of tuples (Principal, Text) which contains all the entries in usernames.
```motoko
get_usernames : () -> async [(Principal, Text)];
```


# Useful resources & links 🔗
- Account.mo [TODO]
- Account.js [TODO]
- [Principal base library documentation](https://internetcomputer.org/docs/current/references/motoko-ref/Principal)
- [Principal interface documentation](https://internetcomputer.org/docs/current/references/ic-interface-spec#principal) 
- [Verifying upgrade compatibility](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/compatibility)
- [Managing Canisters](https://internetcomputer.org/docs/current/developer-docs/build/project-setup/manage-canisters#upgrade-a-canister)
- [Stable variables and upgrade methods](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/upgrades)
- [Reinstall canisters](https://internetcomputer.org/docs/current/developer-docs/build/project-setup/manage-canisters#reinstall-a-canister)
- [Verifying upgrade compatibility](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/compatibility)
- [Managing Canisters](https://internetcomputer.org/docs/current/developer-docs/build/project-setup/manage-canisters#upgrade-a-canister)
- [Stable variables and upgrade methods](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/upgrades)
- [Reinstall canisters](https://internetcomputer.org/docs/current/developer-docs/build/project-setup/manage-canisters#reinstall-a-canister)


