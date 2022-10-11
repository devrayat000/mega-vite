<script lang="ts">
  import { navigate } from "svelte-routing";
  import thank from "../assets/images/illustration-thank-you.svg";

  const params = new URLSearchParams(window.location.search);
  const rating = params.get("rating");

  if (!rating) navigate("/", { replace: true });
</script>

<div class="grid place-items-center">
  <span class="inline-flex flex-col items-center p-4 gap-6">
    <img src={thank} alt="Thank You illustration" />
    <p class="bg-white/10 py-1 px-3 rounded-full text-sm text-primary">
      You selected {rating} out of 5
    </p>
  </span>
</div>

<section class="mt-3.5">
  <h3 class="text-white text-2xl text-center font-bold">Thank you!</h3>
  <p class="text-medium-gray text-sm mt-2.5 text-center">
    We appreciate you taking the time to give a rating. If you ever need more
    support, don’t hesitate to get in touch!
  </p>
</section>
