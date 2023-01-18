<script>
  import * as dao from "../src/declarations/dao"
  import Sidebar from "./components/Sidebar.svelte"
  import ConnectButton from "./components/shared/ConnectButton.svelte"
  import { view } from "./stores.js"
  import Home from "./components/Home.svelte"
  import Vote from "./components/Vote.svelte"
  import View from "./components/View.svelte"
  import Create from "./components/Create.svelte"
</script>

<div class="App">
    <ConnectButton />
  <div class="main">
    <Sidebar />
    {#if $view.current === $view.home}
      <Home />
    {:else if $view.current === $view.view}
      <View />
    {:else if $view.current === $view.vote}
      <Vote />
    {:else if $view.current === $view.create}
      <Create />
    {/if}
    <div class="styling" />
  </div>

  <footer>
    <p class="twitterfoot">
      by <a href="https://twitter.com/iriasviel">Iri</a>
    </p>
  </footer>
</div>

<style global>
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #424242;
    background-color: #262626;
  }
  .styling {
    width: 5vmin;
  }
  .main {
    display: flex;
    justify-content: space-between;
  }

  button {
    font-weight: 600;
    background-color: #4c4a4a;
  }

  .slogan {
    font-size: 1.7em;
    margin-bottom: 0;
    color: #ffffff;
  }

  .twitter {
    font-size: 0.4em;
    color: #ffffff;
  }

  a {
    color: inherit;
  }

  .twitterfoot {
    position: fixed;
    color: #ffffff;
    bottom: 0;
    right: 0;
    margin-right: 2vmin;
    font-size: 1em;
    font-weight: 600;
  }

  .App-logo {
    height: 14vmin;
    pointer-events: none;
    transform: scale(1);
    animation: pulse 3s infinite;
  }

  footer {
    position: fixed;
    bottom: 0;
  }
  .footerimg {
    position: fixed;
    bottom: 0;
    right: 100px;
    height: 5vmin;
    pointer-events: none;
  }

  .App-header {
    height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
  }

  .examples {
    padding: 30px 100px;
    display: grid;
    grid-gap: 30px;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .examples-title {
    font-size: 1.3em;
    margin-bottom: 0;
    text-align: center;
  }

  .example {
    padding: 50px 50px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
  }

  .example-disabled {
    font-size: 1.3em;
    color: #ffffff;
  }

  .demo-button {
    background: #a02480;
    padding: 0 1.3em;
    margin-top: 1em;
    border-radius: 60px;
    font-size: 0.7em;
    height: 35px;
    outline: 0;
    border: 0;
    cursor: pointer;
    color: white;
  }

  .demo-button:active {
    color: white;
    background: #979799;
  }

  .auth-section {
    padding: 0.4em;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-align: right;
    position: fixed;
    top: 0;
    right: 0;
    background-color: #4c4a4a;
    border-radius: 50px;
    border: 2px solid rgb(222, 221, 221);
  }

  @keyframes pulse {
    0% {
      transform: scale(0.97);
      opacity: 0;
    }

    70% {
      transform: scale(1);
      opacity: 1;
    }

    100% {
      transform: scale(0.97);
      opacity: 0;
    }
  }

  .connexion {
    margin: 40px auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
  }
</style>
