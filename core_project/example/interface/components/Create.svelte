<script>
  import { daoActor, principal } from "../stores"
  import { get } from "svelte/store"
  import mot from "../assets/mot.png"
  let choosenproposal = "Input your proposal"

  let summary

  async function create_proposal(summarypayload) {
    let dao = get(daoActor)
    if (!dao) {
      return
    }
    let res = await dao.submit_proposal(summarypayload)
    if (res.Ok) {
      return res.Ok
    } else {
      throw new Error(res.Err)
    }
  }

  let promise = create_proposal(summary)

  function handleCreateClick(payload) {
    summary = payload
    promise = create_proposal(summary)
  }
</script>

<div class="votemain">
  {#if $principal}
    <img src={mot} class="bg" alt="logo" />
    <h1 class="slogan">Create a proposal</h1>
    <input
      bind:value={choosenproposal}
      placeholder="Input your proposal summary here"
    />
    <button on:click={handleCreateClick(choosenproposal)}>Create!</button>
    {#await promise}
      <p style="color: white">...waiting</p>
    {:then proposal}
      <p style="color: white">Proposal created with payload {proposal}</p>
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
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
</style>
