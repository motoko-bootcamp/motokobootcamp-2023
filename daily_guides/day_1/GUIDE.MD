# Day 1 🥚
Welcome to your very 1st day into the **Motoko Bootcamp 2023**.

Today is packed with a lot of activities and lectures. This first day will be intense, but take the opportunity to bond with your teammates and settle in for the journey ahead! <br/>
Get ready because tomorrow you'll have your first one and be starting the [core project](https://github.com/motoko-bootcamp/motokobootcamp-2023/blob/main/core_project/PROJECT.MD)

Today is an introduction to Motoko: there is a lot to cover! Don't stress if you fall behind. Take the time needed to understand the material. Have fun, stay focused and let's survive this together 💪

# <a id="lectures-and-events"> 🍿 Lectures & events </a>
- <b> Event: Motoko Bootcamp Kick-off. </b> <br/>
  Get ready to kick off your Motoko Bootcamp journey with our exciting kick-off event! Join us as we dive into organizing your week, sharing valuable advice, and hearing inspiring stories from past students who have succeeded in the program.
- <b> Lecture: Overview of a project: files, documentations & packages. </b> <br/>
  Next, we'll delve into the technical side of things with a lecture on the overview of a project, including all the important details about files, documentation, and packages. We'll also explain the sample deployed with dfx and show you how to navigate the structure and understand the utility of each file.
- <b> Lecture: Motoko - variables, types, functions & loops. </b>  <br/> As we move forward, we'll dive into the heart of the Motoko language with lectures on variables, types, functions, and loops. These are the essential concepts you'll need to master during the week, and our expert instructors will guide you every step of the way.
- <b> Lecture: How to use dfx to deploy canisters? </b> <br/>
Finally, we'll show you how to make the most of dfx by providing an in-depth lecture on how to use it to deploy and manage your canisters. 

Be sure to consult [the calendar](https://calendar.google.com/calendar/u/0/embed?src=e0a9c944a17afc070ed77f9f10688eaac557ebd0251c5e6d0b724253506d43b3@group.calendar.google.com) for the precise schedule of each lecture.

# <a id="introduction-to-the-motoko-language"> 🧩 Introduction to the Motoko  language! </a>
## <a id="what-is-motoko"> 👻 What is Motoko? </a>
<p align="center"> <img src="./img/motoko_banner.png" width="600px" style="border: 2px solid black;"> </p>

The Internet Computer is a platform that hosts a large number of applications, all of which operate smoothly within special containers called "canisters". <br/> The [DFINITY Foundation](https://dfinity.org/) has introduced a new language called Motoko, which is a programming language specifically designed for creating decentralized applications (dApps) on the Internet Computer. <br/> Canisters on the platform run using WebAssembly modules. WebAssembly is like a virtual machine that helps run special instructions, called bytecode, on the Internet Computer. It's great for building efficient apps on the Internet because it's faster, more efficient, and works on different devices. Since Motoko can directly convert its code into [WebAssembly](https://webassembly.org/), it is an incredible language for building on the Internet Computer.

It's worth noting that WebAssembly, or "WASM" for short, was co-designed by [Andreas Rossberg](https://github.com/rossberg), who joined the DFINITY Foundation early in 2017 to work on its canister smart contract execution environment and is also the original designer of the Motoko language. The standard is maintained by the [World Wide Web Consortium](https://www.w3.org/). 

A **Motoko file** is a file with the extension .mo 

<p align="center"> <img src="./img/mo_extension.png" width="300px" style="border: 2px solid black;"> </p>

---
<i> Motoko has a cool logo that has already been intensively used and modified in the community. 
So not only will you be able to build cutting-edge decentralized applications with Motoko, but you'll also have the coolest logo in the game. Don't believe us? Just check out the [Motoko NFT market](https://entrepot.app/marketplace/motoko) and see for yourself. </i>

<p align="center"> <img src="./img/motoko_variations.png" width="400px" style="border: 2px solid black;"> </p>
<p align="center"> Who will be the next Motoko in town?</p>

## <a id="what-is-a-canister"> 🥫 What is a canister? </a>
The concept of **canisters** is fundamental to understanding how dApps on the Internet Computer are developed. 
<p align="center"> <img src="./img/canister_overview.png" width="800px" style="border: 2px solid black;"> </p>
<p align="center"> Overview of a canister.</p>

A canister is composed of:

- A **WebAssembly module** which is a piece of compiled code from languages such as Rust or Motoko. This is the code that is installed in the canister and is ultimately running. 
- A **WebAssembly memory** - also called memory pages. This is where the state of the canister is stored and files are stored (photos, videos, tokens...). Code runs by the WebAssembly module will modify the memory.

<i> A WebAssembly module can be replaced by a new one while keeping the memory intact - this is what enables canisters to be upgraded without losing their data. </i>

Users will interact with canisters directly by sending and receiving messages (which corresponds to the public function on the canister as we'll see later). 
They are two types of calls:

- Update call: This type of call is used when a user wants to modify the state of a canister (such as posting a message on social media, sending a token, or updating their profile). To ensure the integrity of the Internet Computer, these calls must be processed through consensus and by all nodes, which results in a delay of around 1-2 seconds.

<p align="center"> <img src="./img/update_call.png" width="800px" style="border: 2px solid black;"> </p>
<p align="center"> The call is processed by all nodes that are running the canister.</p>

- Query call: This type of call is used when a user wants to read data (such as browsing social media, looking at photos, or downloading a movie) without modifying the state. These calls can be answered by a single node, making them faster to respond to (around 200 milliseconds). However, the downside is that query calls are less secure as a malicious node could potentially provide false information.

<p align="center"> <img src="./img/query_call.png" width="680px" style="border: 2px solid black;"> </p>
<p align="center"> The call is processed by a single node.</p>

## <a id="what-is-an-actor"> 📬 What is an Actor? </a>
If you open any `main.mo` file you will notice that the first word is **actor**:
```
actor {

    /// CODE

};
```
An actor is simply the representation of a canister for the Motoko language. <br/>
This nomenclature comes from the [Actor model](https://en.wikipedia.org/wiki/Actor_model) which is a way to write computer programs that can handle many tasks at the same time. It does this by treating "actors" as the basic building blocks of the program. <br/> An actor is a small computer program that can receive messages, do some work and then send messages to other actors. Actors can also create new actors and control them. All the actors talk to each other by sending messages. Since all interaction between actors is done via message passing, this allows for very high levels of concurrency and parallelism, making it well-suited for distributed systems (and that's exactly what the Internet Computer is!).

**In that regard the Internet Computer is like a giant world computer where each program is a canister.**

<p align="center"> <img src="./img/actor_model.gif" width="800px" style="border: 2px solid black;"></p>
<p align="center"> Receive - Process - Send - Receive - Process - Send  </p>

Since canisters have been implemented to follow the actor model - you won't be surprised to learn that canisters:

- Have a private state (memory) & can run computations.
- Receive messages from users or other canisters.
- Can send messages to users or other canisters.
- Can create other canisters.

## <a id="variables"> 📦 Variables </a>
In Motoko, variables can be declared using either the "**let**" or "**var**" keyword, followed by the assignment operator "**=**". Variables declared with "**let**" are immutable, meaning that their value cannot be changed once they are assigned. Conversely, variables declared with "**var**" are mutable, which means that their value can be reassigned to a new value at any time using the reassignment operator "**:=**".
<br/> <b> Whenever you </b> declare variables don't forget to end the declaration by using the "**;**" otherwise Motoko will complain! <br/>
Let's declare a few variables:
```
let a = 5;
var b = 5;
b := 6;
```
However, if we try the following code: 
```
let a = 4;
a := 5;
```
An attempt is made to reassign a value to an immutable variable - that's why an error will occur. The specific error message will be `type error [M0073], expected mutable assignment target.` This error message indicates that the variable being reassigned is immutable and cannot be changed.

## <a id="types"> 🍎 Types </a>
The Motoko language places a strong emphasis on types and is more strict in enforcing them compared to other general-purpose languages like Javascript or Python. This strictness serves a purpose, as it helps prevent errors and issues.
<p align="center"> <img src="./img/motoko_primitives_types.png" width="800px" style="border: 2px solid black;"> </p>
<p align="center"> A few basics types in Motoko</p>

<i> In Motoko, each variable is assigned a specific type, which is determined before the program runs. The compiler checks each use of the variable to avoid errors that may occur during runtime, such as null reference errors, accessing invalid fields, and other type-related issues </i>.

Whenever you want to assign a type to a value, you use a colon ":", as shown in the following example:
```
var age : Nat = 20;
```
You can also omit the type declaration - in the following case, the compiler will automatically understand that the variable "age" is of type **Nat** (Natural numbers) because the first assigned value is 20.
```
var age = 20;
```
<br/> <b> However, for the duration of the Bootcamp it is recommended to follow best practices and manually assign types to your variables, especially if you are new to Motoko or typed languages. </b>

Let's go through a few types!

## <a id="nat"> 🔢 Nat </a>
**Nat** is used for unbounded natural numbers (1,2,3,4,......♾️). If you try to assign a negative number to a **Nat** the program will trap you. Unbounded means that they will never [overflow](https://www.youtube.com/watch?v=WN8i5cwjkSE). The memory representation used will grow to accommodate any finite number. 

```
let n : Nat = 10;
```

The usual operations are also included:
- Addition: you can add two numbers using the addition operator "**+**"
```
let a : Nat = 1 + 1; //2
```
- Subtraction: you can subtract two numbers using the subtraction operator "**-**":
```
let a : Nat = 10 - 2; //8
```
> When using the subtraction operator with the type **Nat**, be careful! Because Nat only plays with the positive numbers. If the result of the subtraction is less than zero, it won't fit. The value will no longer be of the **Nat** type and that could cause trouble if your program is expecting a value of the **Nat** type, it might just **trap**. A trap is like a "time-out" for your code, it's an error that happens during execution, and when it does, the program will stop and give you an error message, indicating that something went wrong.
- Multiplication: you can multiply two numbers using the multiplication operator "**\***"
```
let a : Nat = 10 * 10; //100
```
- Division and modulo: to divide two numbers, you can use the division operator '**/**', and to find the remainder of a divided by b, you can use the modulo operator '**%**'.
```
let a : Nat = 10 / 2; //5
let b : Nat = 3 % 2; //1
```

## <a id="int"> ➖ Int </a>
The **Int** data type includes all integers, both positive and negative numbers. This includes all the numbers in the **Nat** data type. The same mathematical operations seen earlier (addition, multiplication, subtraction, division, and modulo) can be performed on both **Int** and **Nat** data types.

> Motoko includes special versions of integers and natural numbers that have a limited range of values that can be represented. These versions are different from the regular versions. They each have a specific number of bits (8, 16, 32, or 64) that determines the range of values they can represent. If a value exceeds the limit, the program will stop running and an error will occur.

## <a id="bool"> 🚦 Bool </a>
**Bool** stands for booleans.
This data type only contains two values **true** & **false**. We will see later how to best use booleans.
```
let light_on : Bool = True;
```

## <a id="text"> ✏️ Text </a>
The type **Text** is used to represent sequences of characters, such as words or sentences. 
```
let t : Text = "Motoko bootcamp 2023";
```
> We will see in another module that the type **Text** is a concatenation of another type called **Char**.

## <a id="function"> ⚙️ Function </a>
With the knowledge that we now have - let's look at the following actor:

<p align="center"> <img src="./img/motoko_sample_code.png" width="800px" style="border: 2px solid black;"> </p>

This code is structured into 2 different parts:
- A variable declaration for a variable called **"name"** of type **Text**. These variables are assigned to the value **"Motoko"**.
- A function declaration for a public function called **"change_name"** that takes an argument called **"new_name"** of type **Text** and (asynchronously), modifies our internal variable and returns its value.

<b> Async? Public?  </b>
There are a lot of keywords that we need to explain. Let's take this one at a time:
- **Public**: the "**public**" keyword in the function declarations indicates that the function can be accessed and called by external users or other canisters. On the other hand, "private" functions can only be called by the canister itself as we'll see later.

- **Async**: the "**async**" keyword before the return value indicates that the function will take some time to complete and the caller will have to wait for a response. This is in line with the actor model of canisters, which means that they always respond to requests with a delay. 

- **var**: the "**var**" keyword is used to declare a mutable variable as we've seen earlier.

The **body** of the function is a set of instructions executed when the function is being called. In our example, for the **change_name** we have 2 instructions:

- The first one will take the value of the argument "**new_name**" provided by the person calling the function and assign it to the variable named "**name**". This effectively changes the value stored in the "**name**" variable to the value of "**new_name**".
```
name := new_name;
``` 
- The second instruction on will returns whatever is now stored in the "**name**" variable.
```
return name; 
``` 
For instance - calling `change_name("Motoko")` would returns "**Motoko**".

## <a id="errors"> ❌ Errors </a>
Let's take a look at the following code:
<p align="center"> <img src="./img/motoko_type_error.png" width="800px" style="border: 2px solid black;"> </p>
<p align="center"> There is something wrong 😖</p>


In this example, we are indicating that the return type of **change_name** is a **Nat** but we are returning name which is of type **Text**. In this case, the Motoko compiler will indicate:
```
expression of type
  Text
cannot produce an expected type
  Nat
```

This is called a **Type error** and this is probably the most common type of error - so keep that in mind!

Another common error that we've hinted at earlier is the following:
```
let a : Nat = 10 - 20;
```
If we try to deploy the following actor:
```
actor {
let a : Nat = 10 - 20;
}
```
The deployment will fail and returns an error message that states:"**Call was rejected: Request ID: 4af8e36bec7f235c4ea88ca581f1e42afa7a1951b2249108b63d5ef0b52898ae Reject code: 4 Reject text: Canister 3f6pv-baaaa-aaaab-qacoq-cai trapped explicitly: Natural subtraction underflow**".

## <a id="what-is-candid"> 👽 What is Candid and why do we need it? </a>
An important concept that you'll need to become familiar with is "**Candid**".
Let's imagine the following situation:
- We are writing a canister in Motoko and we have defined a value x of type **Nat**. 
```
let x : Nat = 5;
```
- We know that there is another canister that exposes a public function square that returns the square of a number - this canister is written in [Rust](https://www.rust-lang.org/).
```
#[ic_cdk_macros::query]
fn square(value: u128) -> u128 {
  value * value
}
```
We want to compute the square of our value x, but rather than implementing the function ourselves in Motoko, we will use the function of the other canister 
(yes that's possible it's called **intercanister-calls** and it will the focus of another lesson!)
The situation will be the following:

<p align="center"> <img src="./img/rust_motoko_situation.png" width="600px" style="border: 2px solid black;"> </p>
<p align="center"> Communication can be hard sometimes...</p>

From the perspective of the Rust canister, there is a fundamental problem: the "**square**" method expects an input of type **u128** and returns an output of the same type, but the value x that it will receive is of type **Nat**. This creates an issue as we are attempting to mix Motoko types (**Nat**) and Rust types (**u128**). <br/>

> Composing services (i.e canisters) written in different languages is central to the vision of the Internet Computer.  This is why we need to introduce an Interface Description Language (IDL). An interface description language (IDL) is a generic term for a language that lets a program written in one language communicate with another program written in another unknown language. 

Candid is an IDL describing the public services deployed in canisters on the Internet Computer. The Candid interface allows inter-operation between services, and between services and frontends, independently of the programming language used.

The purpose of the Candid interface is similar to the purpose of a [REST API](https://www.redhat.com/en/topics/api/what-is-a-rest-api), but where APIs typically use [JSON](https://www.youtube.com/watch?v=iiADhChRriM) to exchange data, Candid is an Interface Description Language (IDL). IDL is platform and programming language-neutral and describes the service, data formats, data structures, etc. Read more about Candid in the documentation.

Candid solves the problem we raised earlier by enabling a mapping between types in different languages. 

<p align="center"> <img src="./img/candid_mapping.png" width="600px" style="border: 2px solid black;"> </p>

We can define the interface of the Rust canister with the following Candid file:
```
service : {
  "square": (nat) -> (nat) query;
}
```
Our service has a unique function called square and this function takes a nat and returns a nat (after awaiting for it). Notice that we are using the "**nat**" type from Candid (not the "**Nat**" from Motoko). The description of the service is independent of the language it was written in - this is key!

<p align="center"> <img src="./img/candid_solved.png" width="600px" style="border: 2px solid black;"> </p>
<p align="center"> Candid is the common ground for all canisters to solve their misunderstanding!</p>

## <a id="the-did-file"> 📁 The DID-file (.did) </a>
To follow along this part we recommend that you deploy (locally) the sample greet dApp that is shipped with dfx:
- Create the code for this project by running:
```bash
$ dfx new greet
```
- Start your local replica with the following command:
```bash
$ dfx start
``` 
- Open another terminal tab & deploy the project (locally) by running:
```bash
$ dfx deploy
```
The Candid interface is automatically generated when building a Motoko project, but it can also be written manually. In its simplest form, the Candid DID file contains a service description. When the project is deployed, the `greet. did` file will contain this service description:
```
service : {
  greet: (text) -> (text) query;
}
```
> You can find the .did file under .dfx/local/canisters/greet_backend. If you don't see it make sure that you have built & deployed the project.

The greet dApp has one public function: `greet(text)`. From the service description we can see, that the greet() function takes a text and returns another text, and the service is a query function (faster execution). 

You can see more advanced uses of Candid in the [documentation](https://internetcomputer.org/docs/current/developer-docs/build/candid/candid-concepts) or in other examples [Motoko examples](https://github.com/dfinity/examples/tree/master/motoko).

The Candid interface, as previously mentioned, allows inter-operation between services, and between services and frontends. Candid is also very useful for calling the canisters from different places:
- Using the terminal with `dfx`. 
- Using the Candid UI. 
- Using a frontend (webpage) with the JavaScript Agent.  

<b> Let's take a look at those different methods! </b>

## <a id="using-the-terminal"> 📺 Using the terminal (dfx) </a>
The Candid interface allows you to call backend services or functions from the command line. This is useful for administrative tasks that do not require a front end or for testing the back end. In the example of the Greet dApp, you can call the greet() method by running the command:
```bash
$ dfx canister call greet_backend greet '("motoko")'
("Hello, motoko!")
```
The general structure for calling any method from any canister is as follows:
```bash
$ dfx canister call <CANISTER_NAME OR CANISTER_ID> <METHOD_NAME> '(ARGUMENT)'
```
If you want to call a canister on the main net, you need to add the --network ic flag:
```bash
$ dfx canister --network ic call <CANISTER_NAME OR CANISTER_ID> <METHOD_NAME> '(ARGUMENT)'
```
> Note that when using dfx you should always put your arguments between "**()**". The format for the arguments is the Candid format. 

For more information about how to call canisters from the command-line, see the [documentation](https://internetcomputer.org/docs/current/references/cli-reference/dfx-canister).

## <a id="candid-ui"> 📲 Candid UI </a>
While the command-line can be very practical, there's also an easier way to call the backend services, and that's by using the Candid UI. When a project is deployed, besides the Candid interfaces, an asset canister running the Candid UI is also deployed. The built process will show the URL in the console, but the URL can also be found in `greet/.dfx/local/canister_ids.json`:

```json
{
  "__Candid_UI": {
    "local": "r7inp-6aaaa-aaaaa-aaabq-cai"
  },
  "greet_backend": {
    "local": "rrkah-fqaaa-aaaaa-aaaaq-cai"
  },
  "greet_frontend": {
    "local": "ryjl3-tyaaa-aaaaa-aaaba-cai"
  }
}
```
In this case the URL to the Candid UI is http://127.0.0.1:4943/?canisterId=r7inp-6aaaa-aaaaa-aaabq-cai&id=rrkah-fqaaa-aaaaa-aaaaq-cai

> It's possible that the URL for the Candid UI may be different on your machine. Make sure to adjust the URL accordingly based on the canister IDs in your own file.

Simply click the **Query** buttons, and see the response in the Output Log.
<p align="center"> <img src="./img/candid_ui_local.png" width="600px" style="border: 2px solid black;"> </p>

<b> Local or Live? </b> <br/>
One important confusion to avoid is the difference between the local & live Candid UIs:

- The [live Candid UI](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.ic0.app/) is unique for the entire Internet Computer - you can access the interface of any dApp (assuming that the candid file has been shipped). By using the live Candid UI you can directly modify the state of a canister. To show you how cool that is we have deployed a "messenger" canister. This canister can store a message and displays it through the "**see_message**" function. The message can be modified by calling the "**change_message**". You can access the Candid UI for this canister [here](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.ic0.app/?id=rhjue-eaaaa-aaaaj-qazra-cai). 

<p align="center"> <img src="./img/candid_live.png" width="600px" style="border: 2px solid black;"> </p>
<p align="center"> Check the message left for you and then leave one for the next student. Be nice 🙏 </p>

- The local Candid UI that we tried earlier is only deployed on your local replica. It can only give you access to the canister that you've deployed locally.

> By the way - the Candid UI (live or local) is also deployed in a canister.

## <a id="using-the-frontend"> 📑 Using Candid in the frontend </a>
The greet dApp has both a backend and a frontend, and the frontend accesses the backend services through the Candid interface. The project's source code is organized in the following three folders:

- declarations
- greet_backend 
- greet_frontend

Let's take a look at the frontend's JavaScript file located at `src/greet_frontend/src/index.js`. This file is responsible for handling the front-end logic of the greet dApp. The front-end and back-end are connected using the Candid interface which allows the front-end to access the back-end services.

```javascript
import { greet_backend } from "../../declarations/greet_backend";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");

  const name = document.getElementById("name").value.toString();

  button.setAttribute("disabled", true);

  // Interact with foo actor, calling the greet method
  const greeting = await greet_backend.greet(name);

  button.removeAttribute("disabled");

  document.getElementById("greeting").innerText = greeting;

  return false;
});
```
Two lines of code in this file are worth paying attention to. The first line is where the Candid service description is imported, and in this case, it's not the greet.did file but the index.js file. The Candid index.js is automatically generated when the project is built and imports the Motoko backend's services.

```javascript
import {greet_backend } from "../../declarations/greet_backend";
```
After importing the Candid interface we can now use the public backend service, which is illustrated in this line:

```javascript
const greeting = await greet_backend.greet(name);
```
The update function `greet()` is called with the name as a parameter, which will return the greeting message. The call is asynchronous so an **await** is added so the front end is waiting for a response before moving on. 

Several agents are developed by both DFINITY and the community to easily integrate the Candid interface in different programming languages. See the [documentation](https://internetcomputer.org/docs/current/developer-docs/build/agents/) for a list of the available agents.

## <a id="motoko-playgroun"> 🛝 Motoko Playground </a>
For testing smaller code snippets, or testing some ideas, [Motoko Playground](https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app) can be very useful. You can write Motoko code in the editor, and deploy it to canisters without going through the steps of manually deploying the code to either the local or main net. All public functions/services can be tested with the built-in Candid UI. Test the [Motoko Playground](https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app) by selecting the Counter project and seeing the same Candid interface as in the examples above. 

<p align="center"> <img src="./img/motoko_playground.png" width="800px"> </p>

# <a id="questions"> 🙋 Questions </a>
1. How much is the current memory capacity of a canister? 
2. What is the issue with the following code sample?
```
actor {
  let counter : Nat = 0;
  public func increment_counter() : async () {
    counter := counter + 1;
  };
}
```
3. What is the issue with the following code sample?
```
actor {
  var message : Text = 0;

  public query func change_message(new_message : Text) : async () {
    message := new_message;
    return;
  };
  
  public query func see_message() : async Text {
    return(message);
  };
}
```
4.  False or True: we can remove the keyword **async** for the return argument of a query function since queries are faster to answer.

# <a id="coding-challenges"> 🥊 Coding challenges </a>
1. Write a function **multiply** that takes two natural numbers and returns the product. 
```
multiply(n : Nat, m : Nat) -> async Nat
```
2. Write a function **volume** that takes a natural number n and returns the volume of a cube with side length n.
```
volume(n : Nat) -> async Nat
```
3. Write a function **hours_to_minutes** that takes a number of hours n and returns the number of minutes.
```
hours_to_minutes(n : Nat) -> async Nat
```
4. Write two functions **set_counter** & **get_counter** .

- set_counter sets the value of the counter to n.
- get_counter returns the current value of the counter.
```
set_counter(n : Nat) -> async ()
get_counter() -> async Nat
```
5. Write a function **test_divide** that takes two natural numbers n and m and returns a boolean indicating if n divides m.
```
test_divide(n: Nat, m : Nat) -> async Bool
```
6. Write a function **is_even** that takes a natural number n and returns a boolean indicating if n is even.
```
is_even(n : Nat) -> async Bool 
```

# <a id="useful-resources"> 🔗 Useful resources & links </a>
- [Internet Computer Documentation](https://internetcomputer.org/docs/current/developer-docs/ic-overview)
- [Motoko Documentation](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/motoko)
- [Candid Documentation](https://internetcomputer.org/docs/current/developer-docs/build/candid/candid-intro)
- [Motoko Playground](https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app)
- [Agents](https://internetcomputer.org/docs/current/developer-docs/build/agents/)
- [DFX](https://internetcomputer.org/docs/current/references/cli-reference/)
- [Example projects](https://github.com/dfinity/examples)
