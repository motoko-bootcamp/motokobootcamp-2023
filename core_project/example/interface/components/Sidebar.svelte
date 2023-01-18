<script>
  import { view } from "../stores.js"

  let isExpanded = false

  const mouseover = () => {
    isExpanded = true
  }

  const handleView = () => {
    $view.current = $view.view
  }
  const handleCreate = () => {
    $view.current = $view.create
  }
  const handleVote = () => {
    $view.current = $view.vote
  }
  const handleHome = () => {
    $view.current = $view.home
  }
</script>

<nav class:expanded={isExpanded} on:mouseover={() => mouseover()}>
  <ul>
    {#if isExpanded}
      <li on:click={() => handleHome()}>🏠 Home</li>
      <li on:click={() => handleView()}>🚀 View</li>
      <li on:click={() => handleCreate()}>⭐️ Create</li>
      <li on:click={() => handleVote()}>🗑 Vote</li>
    {/if}
  </ul>
</nav>

<style>
  nav {
    min-height: 100vh;
    background-color: #262626;
    color: #a2b7c4;
    transition: ease-out 200ms;
    width: 13vmin;
    position: relative;
  }

  .expanded {
    transition: ease-out 200ms;
    min-height: 100vh;
    background-color: #4c4a4a;
    color: #ffffff;
    transition: ease-out 200ms;
    width: 16vmin;
  }

  ul {
    list-style: none;
    padding-left: 1vmin;
    padding-right: 1vmin;
    margin: 0;
    margin-top: 2vmin;
  }

  li {
    width: 100%;
    padding-top: 2vmin;
    padding-bottom: 2vmin;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 600;
    font-size: 1em;
    cursor: pointer;
  }

  li:hover {
    background-color: #6e6b6b;
    transition: 300ms;
    transform: scale(1.08);
  }
</style>
