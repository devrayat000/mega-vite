<script lang="ts">
  import star from "../assets/images/icon-star.svg";
</script>

<span class="inline-block rounded-full p-4 bg-white/10">
  <img src={star} alt="Icon Star" />
</span>

<section class="mt-3.5">
  <h3 class="text-white text-2xl">How did we do?</h3>
  <p class="text-medium-gray text-sm mt-2.5">
    Please let us know how we did with your support request. All feedback is
    appreciated to help us improve our offering!
  </p>
</section>

<form class="mt-6" action="thanks">
  <section class="flex justify-between">
    <input
      type="radio"
      name="rating"
      id="rating-1"
      class="appearance-none rounded-full w-10 h-10 text-light-gray bg-white/10 hover:bg-white/20 hover:text-white checked:bg-primary checked:text-white cursor-pointer transition-colors grid place-items-center before:content-value"
      value="1"
    />
    <input
      type="radio"
      name="rating"
      id="rating-2"
      class="appearance-none rounded-full w-10 h-10 text-light-gray bg-white/10 hover:bg-white/20 hover:text-white checked:bg-primary checked:text-white cursor-pointer transition-colors grid place-items-center before:content-value"
      value="2"
    />
    <input
      type="radio"
      name="rating"
      id="rating-3"
      class="appearance-none rounded-full w-10 h-10 text-light-gray bg-white/10 hover:bg-white/20 hover:text-white checked:bg-primary checked:text-white cursor-pointer transition-colors grid place-items-center before:content-value"
      value="3"
    />
    <input
      type="radio"
      name="rating"
      id="rating-4"
      class="appearance-none rounded-full w-10 h-10 text-light-gray bg-white/10 hover:bg-white/20 hover:text-white checked:bg-primary checked:text-white cursor-pointer transition-colors grid place-items-center before:content-value"
      value="4"
    />
    <input
      type="radio"
      name="rating"
      id="rating-5"
      class="appearance-none rounded-full w-10 h-10 text-light-gray bg-white/10 hover:bg-white/20 hover:text-white checked:bg-primary checked:text-white cursor-pointer transition-colors grid place-items-center before:content-value"
      value="5"
    />
  </section>
  <div class="mt-5">
    <button
      type="submit"
      class="tracking-widest uppercase text-white text-sm bg-primary hover:text-primary hover:bg-white transition-colors px-5 py-2.5 w-full rounded-full"
      >Submit</button
    >
  </div>
</form>
