# Day 2 🐣
Welcome back to day 2 of the Motoko Bootcamp! We're excited to have you back and congratulations on making it through the first day. We also hope you had the chance to get to know your teammates and connect.

Today, we're diving into the Motoko language with three dedicated lectures. You'll be writing more code than yesterday, so get ready to put your knowledge to the test. We'll be starting work on the core project today by setting up the correct environment, providing context on DAOs, and discussing the exciting possibilities offered by the Internet Computer.

# 🍿 Lectures
- Motoko: Optional types, switch/case, Option & List. <br/>
This lecture will cover the usage of optional types in Motoko, how to handle nullable values using **Option** and **List**, and how to use the switch/case statement for control flow.
- Motoko: Generic types & Arrays. <br/>
In this lecture, you'll learn about how to manipulate arrays in Motoko. This is an important topic as this is a more advanced data structure than what we've seen on Day 1. You will also see that the **Array** type in Motoko is usually linked to another concept called **Generic**.  
- Motoko: Char, Text & Iterators. <br/>
In this lecture, we will cover the manipulation of **Char** and **Text** in Motoko and see how those two are linked through iterators also called **Iter**.

# 🧩 Motoko: conditions, loops, arrays & the Base library.
## ✅ Conditions & retational operators.
Do you remember the type **Bool** that we introduced in the previous lesson? 
This type is often used with **if** conditions to make your code adaptative to different situations:
```
if(true){
 // Do this
} else {
// Do that
}
```
Those conditions are also often combined with relational operators such as:
- The equality operator "**==**" tests if two values equal and returns a Bool. 
    ```
    public func enter_the_club(age : Nat) : async Text {
        if(age >= 18) {
            // return("Welcome to the club");
        } else {
            // return ("You are too young!");
        };
    };
    ```
    > The "**==**" operator is different than the "**=**" operator. The first one will test if two values are equal while the latter will assign a value to a variable.

- The "**<**" (less than) and ""**>**" (more than) operator.
  ```
  3 < 5     //true
  6 < 2     //false
  1 < 1     //false
  3 > 5     //false
  6 > 2     //true
  1 > 1     //false
  ```
- The "**<=**" (less than or equal to) and "**>=**" (more than or equal to) operators.

  ```
  3 <= 5    //true
  6 <= 2    //false
  1 <= 1    //true
  3 >= 5    //false
  6 >= 2    //true
  1 >= 1    //true
  ```

- The "**!=**" (not equal) operator.
  ```
  1 != 1    //false
  1 != 0    //true
  ```

## 🗃️ Arrays
In Motoko, an array (of type **Array**) is a group of similar elements that are stored together. To create an array, we must specify the type of elements that it will contain, for example, if the array will hold natural numbers - the type should as indicated as follow:
```
let date : [Nat] = [16, 01, 2023];
```
The same syntax would be for an array that holds values of type **Text**:

```
let words : [Text] = ["Motoko", "is", "the", "best", "language"];
```
> Contrary to some more flexible programming languages (JavaScript) - in Motoko we can't mix elements of different types in the same array.

<p align="center"> <img src="./img/array.png" width="600px" style="border: 2px solid black;"></p>

To access a specific element within an array, we use its index. Keep in mind that arrays in Motoko are zero-indexed, which means that the first element is at position 0, the second element is at position 1, and so on. For example, to access the first element of an array named "**myArray**", we would use "**myArray[0]**", and to access the second element, we would use "**myArray[1]**".

For example, referring back to the example mentioned earlier:
```
let date : [Nat] = [16, 1, 2023];
let month : Nat = date[1]; // 1
```

Finally, we can access the size of an array using the **array.size()** syntax. 
```
let date : [Nat] = [16, 1, 2023];
let size : Nat = date.size() // 3
```

## 🪨 Immutable or Mutable?
In Motoko, arrays are immutable by default, just like variables declared with "**let**". This means that the values inside an array can be read but not modified. Additionally, the size of an array is fixed once it is created and cannot be increased. To add a new element to the array, a new array must be created and all existing elements must be manually transferred over.

> Accessing elements in an array is efficient because arrays are immutable. This means that the size of an array is fixed when it is created, and memory is allocated accordingly. The location of the first element in the array is known, and the memory locations of all other elements can be easily calculated from it. Understanding the specifics of how computer memory is managed is not necessary for this lesson, but it is important to note that this is what makes accessing elements in arrays so efficient.

The following code would throw an error:
```
actor {
let dates : [Nat] = [1, 3, 6];
dates[0] := 5;
};
```
> **Error in file Main.mo:2:0 expected mutable assignment target**

It is possible to create mutable arrays but, just like variables you have to use the keyword "**var**". 
```
let mutable_array : [var Nat] = [var 1, 2, 3]; // This is mutable!
```

This time the following code would compile:
```
actor {
  let mutable_dates : [var Nat] = [1, 3, 6];
  dates[0] := 5;
};
```
> Note that mutable and immutable arrays do not have the same type.

## 🤫 Mutable state 
In Motoko, actors can use an internal mutable state, but they can't directly share it with other actors. Instead, actors can share immutable data and handle each other's external entry points, which act as shared functions. However, the important thing to note is that mutable data must always be kept private and can never be shared remotely. <br/>

To put it short - anything that you can modify in the state of your canister should be considered private and you won't be able to share it! 

<p align="center"> <img src="./img/mutable_state_actor.png" width="800px" style="border: 2px solid black;"></p>

> This rule is designed to simplify your programming experience. It prevents multiple actors from simultaneously modifying a shared variable without knowledge of the other actors' actions. Otherwise, this would confuse and make programming with actors way more difficult.

For instance, the following code: 
```
actor {
  public var name : Text = "Motoko";
};
```
Would throw an error: **public actor field name has non-shared function type var Text**! 

## 🔁 Loops 
In Motoko - we can loop over an array with the following syntax:
```
actor {
    let array : [Nat] = [1, 2, 3, 4, 5];
    var somme : Nat = 0;

    public func somme_array() : async Nat {
        for (value in array.vals()){
          somme := somme + value;
        };
       return somme; 
    };
};
```

> Regarding what we said earlier: it may seem confusing that a mutable variable, "**somme**", is returned at the end of the function. However, it's important to understand the difference between sharing the variable itself and sharing the value of the variable. In this case, it's the value of "**somme**" that is shared and not the variable itself. This concept can also be applied to mutable arrays by using a method called '**Freeze**', which allows for sharing a "snapshot" of the array, rather than the variable itself.

## 📚 The Base Library
So far we've only looked at operations that are built-in into the language. To perform more complex operations, we'll need to use modules, particularly the [Base library](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/basic-concepts#the-motoko-base-library).

A module is a collection of code written by someone else that you can use in your program. We will explore different methods for importing modules and even creating our modules, but for today we will focus on importing modules from the Base library. The Base library is a set of modules that handle common operations for commonly used types (such as Array, Bool, Nat, Int, and Text).

The source code for this library is [available on Github](https://github.com/dfinity/motoko-base/) and is maintained by engineers from the Dfinity foundation and community members. Each module has its documentation page, where you can learn about the available functions. For example, here is the [documentation page for the Nat module](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/base/Nat).


<p align="center"> <img src="./img/base_library_nat.png" width="800px" style="border: 2px solid black;"></p>

> The function signature is the way to define the types of input parameters and output return values. In the case of the "toText" function, the signature is "Nat -> Text" which means that it takes an input of type **Nat** and returns an output of type **Text**. Indeed, this function converts a **Nat** value to its equivalent **Text** representation.

It's important to know how to use the documentation, but you don't need to understand how the source code for these modules was written (unless you're curious). The source code is meant to understand how a specific module was written, whereas the documentation is meant to understand how you can use a module.

> The documentation is still missing examples for each function. That would be a really valuable addition to have examples directly in the Base library.

Here's an example that shows how to import the **Nat** module and use the **toText** function:
```
import Nat "mo:base/Nat";
actor {
    public func nat_to_text(n : Nat) : async Text {
        return(Nat.toText(n));
    };
};
```

> You may be wondering how we were able to use the type **Nat** in previous examples without importing the corresponding module. This is an important concept to understand: the type **Nat** is automatically available in Motoko, but if you need to use a specific function from the **Nat** module, you will need to import the module first.

Congratulations on making it this far! You've officially finished your daily dose of Motoko. Time to move on to something a little more exciting, like learning about Decentralized Autonomous Organizations. I hear they're the hot new thing these days.

# 🧩 What is DAO? Overview of the NNS 
> During this week you will have the opportunity to build a prototype for a **Decentralized Autonomous Organization** (DAO) - see [core project](../../core_project/PROJECT.md) for more information. This is why this module will be focused on answering an important question: **What is a DAO?**. 

## 🏛️ Decentralized Autonomous Organization: a new model of governance?
<p align="center"> <img src="./img/dao_icon.png" width="300px" style="border: 2px solid black;"> </p>
A Decentralized Autonomous Organization (DAO) is a digital platform or system that is run on a blockchain and is governed by rules encoded into smart contracts. DAOs are decentralized in the sense that they are not controlled by any single individual or entity, but rather operate based on the collective decision-making of their members.


DAOs are designed to be transparent, efficient, and self-sustaining, and they can be used for a wide variety of purposes, such as managing funds, voting on proposals, and making decisions about the direction of a project or organization.

DAOs are created by deploying smart contracts to the blockchain, which define the rules and processes that the organization will follow. Once the DAO is deployed, it can be managed and governed by its members through a voting process, in which members can propose and vote on decisions.

Usually, DAOs create their dedicated governance token & the voting power of each member will be determined by the number of tokens they hold. However, each DAO is different and ultimately the rules can be very different depending on the code that has been deployed. Sometimes, even within the same DAO, the voting rules will change depending on the type of the proposal (Funding proposals, management proposals, or proposals to change the direction of the organization).

A few use cases for DAOs include the followings:
- **Decentralized venture capital**: DAOs can be used to enable decentralized venture capital funds, in which members can propose and vote on investments in projects. [The DAO](https://en.wikipedia.org/wiki/The_DAO_(organization)) (short for "Decentralized Autonomous Organization") was one of the first DAOs to be created and was designed to be a decentralized venture capital fund, although it was controversial and ultimately failed due to a hack.

<p align="center"> <img src="./img/the_dao.png" height="400px" style="border: 2px solid black;"></p>
<p align="center"> Due to a loophole in the smart contracts, the DAO was hacked.</p>

- **Decision-making**: DAOs can be used to enable members to make decisions about the direction of a project or organization. For example, [MakerDAO](https://makerdao.com/en/) is a decentralized finance (Defi) platform that is built on the Ethereum blockchain and is governed by a DAO, in which members can vote on proposals to change the parameters of the MakerDAO system, such as the interest rates on loans.
- **Supply-chain management**: 
- **Decentralized exchanges**:
- **Decentralized social network**: 

## 🙁 Limitations of current DAOs
Ultimately, DAOs are implemented through smart contracts and can only take action if the voted proposal can be implemented directly by code. 
It would be the case for a proposal such as: 
-  **Mint 5000 tokens** where a corresponding "mint" function would be executed on the dedicated smart contract.
-  **Burn 2500 tokens** where a corresponding "burn" function would be executed on the dedicated smart contract.
- "[Increase the yield rate of DAI to 1%](https://www.theblock.co/post/190526/makerdao-is-voting-on-increasing-yield-for-the-dai-stablecoin) where a corresponding parameter would be modified on the dedicated smart-contract.

However, what would happen if the proposal was not executable by a smart contract - let's say: 

- **Modify the website https://app.uniswap.org/ to delist tokens that correspond to known scams**

This is exactly [what happened in July 2021](https://cointelegraph.com/news/uniswap-delists-100-tokens-from-interface-including-options-and-indexes). 
This decision was unitarily taken by Uniswap Labs despite the existence of the Uniswap DAO (which is organized around the UNI token).
Ultimately, the website is not hosted on Ethereum and the legal liabilities associated with it are the responsibilities of Uniswap Labs and not of the DAO - explaining the decision.

> Now what if DAOs could control... entire web applications? 

## 🚀 From smart contracts to canisters
Smart contracts are pretty limited: 
- They can't store any meaningful amount of data (photos, videos, files...) 
For instance: [the cost of storing 1GB of data in the Ethereum blockchain is estimated at around $5.5M](https://steemit.com/ethereum/@suryanshkumr/you-need-usd5-5m-to-save-1gb-data-in-ethereum-blockchain-d)! 
- You can't interact with smart contracts directly from a browser: usually a wallet (extension) needs to be installed and this wallet will do the relay. 
- Smart contracts rely on oracles to gather information from the external world and facilitate communication with it, as they are unable to interact with anything outside of the blockchain on their own. Oracles serve as a bridge between smart contracts and external data sources and systems

Other properties of smart contracts, that you might or might not like depending on your use case include:
- Smart-contracts can never be updated - they are permanent and immutable once deployed to a blockchain 
- Users need to pay fees to interact with a smart contract.  

To build dApps so far developers had to resort to solving those issues by relying on a third-party actor. Usually a centralized entity - a few of them:
- AWS to store the front end and data associated with the dApp. 
- Metamask to communicate from the browser with the blockchain. 
- Chainlink to interact with the external world (Web2) - though Chainlink is probably the least centralized in the list so far. 

<p align="center"> <img src="img/ethereum_aws.png" width="400px" style="border: 2px solid black;"></p>
<p align="center"> Not really "without intermediaries"</p>

Now imagine that smart contracts could:
- Store an unlimited amount of data & run any computation.
- Be accessible directly from any browser.
- Communicate with the external world through HTTP requests.
- Create and sign transactions on any blockchain (Bitcoin, Ethereum...).
- Enable different modelization models by choosing if the user pays fees or can interact freely with the smart contract.
- Being upgradable to constantly add new features & fix potential bugs. 

If that sounds interesting: welcome to the world of **canisters**! Imagine what DAOs will be able to achieve controlling canisters 🤯

<p align="center"> <img src="img/canister.png" width="800px" style="border: 2px solid black;"></p>
<p align="center"> Canister Canister Canister!</p>
A few more information:

- One canister can store up to 48GB of data! Moreover, this is a temporary limitation and the memory limitation is [frequently uplifted](https://forum.dfinity.org/t/increased-canister-smart-contract-memory/6148/139). 
- Canisters can communicate with the Web 2.0 world without the need to rely on external oracles! 
- Canisters can hold keys and sign transactions on other blockchains (Bitcoin, Ethereum, and soon all currencies) thanks to [Threshold ECDSA](https://internetcomputer.org/docs/current/developer-docs/integrations/t-ecdsa/). Each replica holds a share of the private key and they can combine their shares to create ECDSA signatures. The private key is **never** reconstructed! 

## 👑 Who controls the canister?
Canisters on the Internet Computer can have one or multiple controllers, which can update, delete, and modify the state of the canister. There are three main cases to consider:

- A single developer or a group of developers control the canister. In this case, the control over the canister is centralized, and any trust placed in the canister is dependent on the trust of the controllers. This is the default state when a new project is deployed on the Internet Computer.

- The canister is controlled by another canister. With this approach, any type of governance system can be designed. The canister can still be upgraded, but the control over it can be decentralized.

- The canister has no controller. This is the ultimate solution to ensure that a canister will never be upgraded. In this scenario, a canister is similar to a traditional smart contract.

<p align="center"> <img src="./img/governance_canister.png" width="400px" style="border: 2px solid black;"> </p>

<p align="center"> Before trusting a canister - make sure that you know who controls it!</p>

Using ```dfx``` we can verify the list of controllers for any canister - with the following command:
```
dfx canister --network ic info <CANISTER_ID>
```
## 🌍 Open Internet Service
One of the most promising applications of the Internet Computer is the development of Open Internet Services (OIS). Those are web services that run entirely on a set of canisters, where the governance of those canisters is ensured through a tokenized public governance canister.  <br/>

<p align="center"> <img src="./img/web2_web3.jpeg" width="400px" style="border: 2px solid black;"> </p>

Open Internet Services aims to supplement the current monopoly of BigTech by aligning incentivizes between investors, users, and developers and is expected to operate more transparently and cooperatively than traditional web services.

Users will receive token rewards for interacting and adding value to the application, which will also grant them governance rights, but this concept is still being explored and other governance systems may be implemented! <br/>

<p align="center"> <img src="./img/ois.png" width="800px" style="border: 2px solid black;"> </p>

> **A prediction?** <br/> Open Internet Services are here to revolutionize the way we work together. With the unprecedented scalability of collaborative work enabled by the combined power of DAOs and OIS, the sky's the limit! Imagine the positive impact on humanity with projects like environmental conservation, medical research, and education all being amplified by this new level of coordination and collaboration. And this is just the tip of the iceberg, as this new technology could open the door to even more innovative solutions to some of the world's most pressing problems. This is an opportunity to make real progress and change the world in ways we never thought possible before. **Get ready, the future is here!**
## ☝️ A DAO on the IC: the Network Nervous System (NNS)

<p align="center"> <img src="./img/nns_home.png" width="800px" style="border: 2px solid black;"> </p>
<p align="center"> Home page of the NNS</p>

The most developed DAO operating on the IC (so far!) is the one that manages the network itself. This DAO is called the **Network Nervous System** and it is responsible for making decisions about the future of the network, coordinating various parties, and arranging the network's structure.

Typically, when a blockchain needs to be upgraded, it takes a few weeks or months to complete the process. This requires node operators to upgrade their software. If some node operators refuse to upgrade or if a group of them installs a different version, it can result in a "fork," where the blockchain splits into two separate chains - creating two completely different networks of lower sizes.

<p align="center"> <img src="./img/hard_fork.png" width="800px" style="border: 2px solid black;"> </p>
<p align="center"> A famous fork happened in 2017 when some members of the Bitcoin community wanted to increase the block size (to process more transactions). This resulted in two separate versions of Bitcoin, with the original version continuing to follow the old rules and the new version (Bitcoin Cash) following the new rules. </p>

On the Internet Computer, upgrades are voted on by the NNS (Network Nervous System). If the upgrades are accepted, the software of the nodes is directly upgraded, which mitigates the possibility of a fork. 
<br/>
The NNS is governed by a liquid democracy, in which ICP holders stake their ICPs to create neurons. 
The voting power of these neurons is based on :
- The amount of staked ICPs.
- The duration of the staking.
- The age of the neuron.
<p align="center"> <img src="./img/neuron_recap.png" width="800px" style="border: 2px solid black;"> </p>


The proposals that can be voted on by the NNS (Network Nervous System) are grouped into different categories, such as:

- Network economics: proposals related to determining the rewards paid to node operators.
- Node administration: proposals related to administering node machines, including upgrading or configuring the operating system, virtual machine framework, or node replica software.
- Subnet management: proposals related to administering network subnets, such as creating new subnets, adding and removing subnet nodes, or splitting subnets.
- Governance: proposals related to administering governance, such as motions and configuring certain parameters.

To learn more about the incredible power of the NNS, check out the [Internet Computer Wiki](https://wiki.internetcomputer.org/wiki/Network_Nervous_System).

## 🔎 How does the NNS work?
The NNS is constituted of **different canisters**. Each canister is deployed on the same subnet which is also called the [NNS subnet](https://dashboard.internetcomputer.org/subnet/tdb26-jop6k-aogll-7ltgs-eruif-6kk7m-qpktf-gdiqx-mxtrf-vb5e6-eqe).


<p align="center"> <img src="./img/nns_recap.png" width="800px" style="border: 2px solid black;"> </p>
<p align="center"> Overview of the canisters running the NNS</p>

- [Ledger](https://icscan.io/canister/ryjl3-tyaaa-aaaaa-aaaba-cai): This canister is responsible for controlling the balance of ICPs for all users, processing transactions, minting & burning ICPs.
- [Governance](https://icscan.io/canister/rrkah-fqaaa-aaaaa-aaaaq-cai): This canister is responsible for keeping track of neurons, proposals & votes, and ultimately taking actions when the proposals are accepted or rejected.
- [Registry](https://icscan.io/canister/rwlgt-iiaaa-aaaaa-aaaaa-cai): This canister is responsible for storing and modifying the configuration of the Internet Computer (Adding or removing nodes, adding or removing subnets, storing public keys of subnets, assign nodes to subnets, storing canister ids and which subnet they belong to....)
- [NNS-UI](https://icscan.io/canister/qoctq-giaaa-aaaaa-aaaea-cai): This canister is responsible for storing the official interface that gives users a way to interact with the 3 other canisters. 
NB: The NNS-UI is currently the main user-friendly interface for the NNS but nothing would prevent the community from creating another interface. The community has already created [another interface that enables users to create NNS proposals](https://nnsproposal.icp.xyz/) (without having to use their terminal!) which is a feature that is still missing on the main interface.

As we see with the example of the NNS - building a DAO can involve deploying and managing multiple canisters. 

## 🏗️ Architecture for our project
We want to build **a DAO that manages a simple website** and grants voting power based on the [Motoko Bootcamp token](../../core_project/PROJECT.md#-token-faucet). 
We will need the following canisters:
- A backend canister: this canister will be responsible for managing the logic of our DAO: keeping track of members, proposals, votes & taking actions whenever a proposal is passed.
You will have to write the entire logic for this canister yourself!

- A webpage canister: this canister will be responsible for storing a webpage, and answering http_request. This webpage will only contain basic text and the text will be updated upon vote of the DAO.
You will have to write the entire code for this canister yourself!

- An interface canister: this canister will be responsible for storing the interface and enabling user-friendly access to our DAO. From this interface, users should be able to join the DAO, create proposals and vote on proposals. 
Since this week is focused on Motoko and creating an interface requires other skills and knowledge. We will provide code samples that you'll just have to complete. For the interface, we will use a framework called [Svelte](https://svelte.dev/). If you are not familiar with Svelte - no worries! We will explain how the code is organized. 

- A ledger canister for the Motoko Bootcamp token: this canister is responsible for controlling the balance of MB tokens for all users, processing transactions, and minting & burning MB tokens.
This canister will be the same for all students. We have already created this canister and you will only have to interface with it. This token is following the ICRC_1 standard.
You can mint as many Motoko Bootcamp tokens as you need during the week. For more information - read [the dedicated section](../../core_project/PROJECT.md#-token-faucet)


# 🧹 Task: create the skeleton for the core project.
For your first task, the goal is to **create a skeleton for the core project**. This means that you should have the configuration files set up and the correct structure for your codebase in place. However, this does not include writing any actual code for the project.

The idea is to gather all the different pieces that you will need for the project in one place. This will serve as a starting point for the rest of the work you will do during the week.
To consider your task completed you'll need to have a (locally) running project setup with 3 canisters: 
- A backend canister (Motoko) for managing the logic of your DAO.
- A webpage canister (Motoko) for storing the webpage that your DAO will control.
- A interface canister (Svelte) for the user-friendly interface of your DAO. 

<p align="center"> <img src="./img/project_recap.png" width="800px" style="border: 2px solid black;"> </p>
<p align="center"> Overview of what we'll be buiding this week 💪</p>

You can consider that you've finished the task for today when you have completed the following steps:

1. Copy and take inspiration from this repository that contains a [motoko-svelte-project](https://github.com/dfinity/examples/tree/master/svelte/svelte-motoko-starter)
3. Add the 3rd canister that we need (webpage). Only add the files you don't need to write any code.
3. Rename the canisters and change the configuration files accordingly.
4. Deploy the project **locally**.

**Let’s f∞cking build!**
# Questions 🙋

1. Who controls the ledger canister? 
2. What is the subnet of the canister with the id: **mwrha-maaaa-aaaab-qabqq-cai**? How many nodes are running this subnet?  
3. I have a neuron with 1O ICPs locked with a dissolve delay of 4 years - my neuron has been locked for 2 years. What is my expected voting power?
4. What is wrong with the following code?
```
actor {
  let n : Nat = 50;
  let t : Text = "Hello";

  public func convert_to_text(m : Nat) : async Text {
    Nat.toText(m);
  };
 
}
```
5. What is wrong with the following code?
```
actor {
  var languages : [var Text] = ["English", "German", "Chinese", "Japanese", "French"];

  public func show_languages(language : Text) : async [var Text] {
    return (languages);
  };
 
}
```
6. What is wrong with the following code?
```
actor {
  var languages : [Text] = ["English", "German", "Chinese", "Japanese", "French"];

  public func add_language(new_language: Text) : async [Text] {
    languages := Array.append<Text>(languages, [new_language]);
    return (languages);
  };
 
}
```

# Coding challenges 🧑‍💻
1. Write a function **average_array** that takes an array of integers and returns the average value of the elements in the array.
```
average_array(array : [Int]) -> async Int. 
```
2. **Character count**: Write a function that takes in a string and a character, and returns the number of occurrences of that character in the string.
```
count_character(t : Text, c : Char) -> async Nat
```
3. Write a function **factorial** that takes a natural number n and returns the [factorial](https://www.britannica.com/science/factorial) of n.
```
factorial(n : Nat) ->  async Nat
```
4.  Write a function **number_of_words** that takes a sentence and returns the number of words in the sentence.
```
number_of_words(t : Text) -> async Nat 
```
5. Write a function **find_duplicates** that takes an array of natural numbers and returns a new array containing all duplicate numbers. The order of the elements in the returned array should be the same as the order of the first occurrence in the input array.
```
find_duplicates(a : [Nat]) -> async [Nat]
```
6. Write a function **convert_to_binary** that takes a natural number n and returns a string representing the binary representation of n.
```
convert_to_binary(n : Nat) -> async Text
```

# Useful resources & links 🔗
- [ICScan](https://icscan.io/): this website is an incredible tool to access information about the Internet Computer. You can inspect and find pieces of information on different topics (subnets, canisters, neurons, transactions). You can also use this website as a tool to directly interact with canisters deployed on the Internet Computer.
- [NNS-UI](https://nns.ic0.app): the offical interface of the NNS. You can use it to stake ICPs, create neurons, vote on proposals, invest in SNS launches, and more...
- [Array module](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/base/Array): the documentation for the **Array** module in Motoko.
- [Bool module](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/base/Bool): the documentation for the **Bool** module in Motoko.
- [Base Library](https://github.com/dfinity/motoko-base): the source code for the entiere Motoko Base Library - maintained by DFINITY engineers & the community.
- [Mutable state](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/mutable-state): a longer explanation on mutable state of actors in Motoko.
