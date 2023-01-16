# Core project 🧑‍🔬
## ❓ **What is the core project**
The core project is a project that you will build during the entire week. 
The experience of building this project will be as close as possible as what the experience of building a real-live project on the Internet Computer looks like. 

## 🤔 **Motivation** 
The Bootcamp is not a hackathon and should not be approached as a competitive event. Its primary purpose is to bring the community together in a shared effort to promote the Internet Computer, Motoko, and train a new generation of developers.

With that in mind, having to work in autonomy on a complete & real project with different requirements will provide the students & the Bootcamp with the following benefits: 
- It helps reinforce the knowledge and skills acquired through lectures and daily challenges.
- It provides a clear and motivating end goal for the Bootcamp.
- It challenges the autonomy and creativity of each student.
- It gives beginner students a taste of what it's like to be a developer and work on a project.
- It allows for prizes to be awarded to the most deserving students.
- It creates a live project that showcases the Motoko Bootcamp community and its achievements.

# ☑️ **Requirements** 
The goal for this edition is to build a **DAO (Decentralized Autonomous Organization)** with the following requirements:

- The DAO is controlling a webpage and is able to modify the text on that page through proposals.
- The DAO can create proposals. Each user is able to vote on proposals if he has at least 1 Motoko Bootcamp (MB)token. 
- The voting power of any member is equal to the number of MB they hold (at the moment they cast their vote).
- A proposal will automatically be passed if the cumulated voting power of all members that voted for it is equals or above 100. 
- A proposal will automatically be rejected if the cumulated voting power of all members that voted against it is equals or above 100. 

Here is a few functions that you'll need to implement in your canister
```
submit_proposal
get_proposal
get_all_proposals
vote
```

If you want to **graduate with honors** you'll have to complete those additional requirements:
- Users are able to lock their MB tokens to create **neurons** by specifying an amount and a dissolve delay.
- Neurons can be in 3 different states:
    - Locked: the neuron is locked with a set dissolve delay and the user needs to switch it to dissolving to access their MB.
    - Dissolving: the neuron's dissolve delay decreases over time until it reaches 0 and then the neuron is dissolved and the user can access their ICP.
    - Dissolved: the neuron's dissolve delay is 0 and the user can access their ICP.
    The dissolve delay can be increased after the neuron is created but can only be decreased over time while the neuron is in dissolving state. Also, neurons can only vote if their dissolve delay is more than 6 months. Additionally, neurons have an age which represents the time passed since it was created or last stopped dissolving.

- Voting power of a neuron is counted as followed: AMOUNT MB TOKENS * DISSOLVE DELAY BONUS * AGE BONUS where:
    - Dissolve delay bonus: The bonuses scale linearly, from 6 months which grants a 1.06x voting power bonus, to 8 years which grants a 2x voting power bonus
    - Age bonus: the maximum bonus is attained for 4 years and grants a 1.25x bonus, multiplicative with any other bonuses. The bonuses for durations between 0 seconds and 4 years scale linearly between.
- Proposals are able to modify the following parameters:
    - The minimum of MB token necessary to vote (by default - 1).
    - The amount of voting power necesary for a proposal to pass (by default - 100).
- An option to enable quadratic voting, which makes voting power equal to the square root of their MB token balance.
- The canister is blackholed. 

Here is a few functions that you'll need to implement in your canister
```
submit_proposal
get_proposal
get_all_proposals
vote
modify_parameters
quadratic_voting
createNeuron
dissolveNeuron 
```

> To graduate with honors you do not need to implement a follow system between neurons as in the NNS (but of course if you want to do that feel free to do so!)

If you want to **graduate among the best students** there is no specific requirement that we can give but you will be judged based on the following criteria:
- The code is clear and concise. 
- The code is safe, secure and doesn't contain any bug. 
- Additional functionalities have been implemented beyond the requirements.

## 💰 Token faucet 
We do not want to involve any form of real money for this event so we have created a faucet to use. This token is called MB token (Motoko Bootcamp token). This is the token that you need to use for the core project. You can mint as much as you need. 

You can access the faucet [here](https://dpzjy-fyaaa-aaaah-abz7a-cai.ic0.app/).

This token is following the [ICRC1 standard](https://github.com/dfinity/ICRC-1). 

> A huge thanks to the team at [ICPipeline](https://www.icpipeline.com/) for their contribution to the Token Faucet.
