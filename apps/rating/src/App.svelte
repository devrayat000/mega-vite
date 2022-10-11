<script lang="ts">
  import { Route, Router } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import Thanks from "./pages/Thanks.svelte";
</script>

<Router>
  <main class="bg-very-dark-blue min-h-screen grid place-items-center p-6">
    <article class="bg-dark-blue rounded-xl p-6 max-w-sm">
      <Route path="/">
        <Home />
      </Route>
      <Route path="thanks">
        <Thanks />
      </Route>
    </article>
  </main>
</Router>
