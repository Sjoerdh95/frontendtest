<script>
  import Dashboard from './Dashboard.svelte'
</script>

<main>
  <Dashboard />
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    background-color: #09090b;
    color: #f8fafc;
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    overflow: hidden;
  }

  :global(#app) {
    width: 100%;
    height: 100%;
  }

  main {
    width: 100%;
    height: 100%;
  }
</style>