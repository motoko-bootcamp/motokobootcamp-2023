<script>
  import { proposaltoVote } from "../stores.js"
  import { hasvoted } from "../stores.js"
  import mot from "../assets/mot.png"
  import { get } from "svelte/store"
  import { daoActor, principal } from "../stores"

  let choosenproposal = ""
  let choosenvote = ""
  let voteid = ""
  let id = ""

  async function vote(thisid, votepayload) {
    let dao = get(daoActor)
    if (!dao) {
      return 
    }
    let res = await dao.vote(BigInt(thisid), votepayload)
    if (res.Ok) {
      return res.Ok
    } else {
      throw new Error(res.Err)
    }
  }
  async function get_proposal(thisid) {
    let dao = get(daoActor)
    if (!dao) {
      return 
    }
    let res = await dao.get_proposal(BigInt(thisid))
    if (res.length !== 0) {
      return res[0]
    } else {
      throw new Error(
        "Could not find this proposal, make sure you typed in the right ID",
      )
    }
  }

  let promise = vote(voteid, choosenvote)
  let promise2 = get_proposal(id)

  function handleVoteClick(payload) {
    choosenvote = payload
    voteid = id
    promise = vote(voteid, choosenvote)
    $hasvoted = true
  }

  function handleProposalCheck(payload) {
    id = payload
    promise2 = get_proposal(id)
  }

  //I assume the vote Yes/No will be represented as True/False
  function setProposal(x) {
    $proposaltoVote.proposalID = x
    if (x != "null") {
      handleProposalCheck(x)
    }
  }
</script>

<div class="votemain">
  {#if $principal}
    <img src={mot} class="bg" alt="logo" />
    {#if $proposaltoVote.proposalID === "null"}
      <h1 class="slogan">Please input a proposal ID!</h1>
      <input
        bind:value={choosenproposal}
        placeholder="Input your proposal ID here"
      />
      <button on:click={setProposal(choosenproposal)}>Vote!</button>
    {:else if $proposaltoVote.proposalID != "null"}
      {#await promise2}
        <h1 class="slogan">Loading...</h1>
      {:then res}
        <div class="votingdiv">
          <h1 class="slogan">
            You are voting on proposal ID: {$proposaltoVote.proposalID}
          </h1>
          <div>
            <h1 class="slogan">Cast your vote:</h1>
            <button on:click={() => handleVoteClick(true)}>Yes</button>
            <button on:click={() => handleVoteClick(false)}>No</button>
            {#if $hasvoted === true}
              {#await promise}
                <h1 class="slogan">Loading...</h1>
              {:then res2}
                <p style="color: white">
                  Voted successfully! Current votes: {res2}
                </p>
              {:catch error}
                <p style="color: red">{error.message}</p>
              {/await}
            {/if}
          </div>
          <button on:click={() => setProposal("null")}
            >Choose new proposal</button
          >
        </div>
      {:catch error}
        <button on:click={() => setProposal("null")}
          >Wrong Proposal ID, click here to reset</button
        >
        <p style="color: red">{error.message}</p>
      {/await}
    {/if}
  {:else}
    <p class="example-disabled">Connect with a wallet to access this example</p>
  {/if}
</div>

<style>
  input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .bg {
    height: 55vmin;
    animation: pulse 3s infinite;
  }
  .votingdiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5vmin;
  }

  .votemain {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  button {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }

  .delete {
    background-color: white;
  }
</style>
