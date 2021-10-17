<script>
  import { createEventDispatcher } from "svelte";
  import MeetupItems from "./MeetupItems.svelte";
  import MeetupFilter from "./MeetupFilter.svelte";
  import Button from "../UI/Button.svelte";

  export let meetups;

  let favsOnly = false;
  const dispatch = createEventDispatcher();

  $: filteredMeetups = favsOnly ? meetups.filter((m) => m.isFavorite) : meetups;

  function setFilter(event) {
    favsOnly = event.detail === 1;
  }
</script>

<section id="meetup-controls">
  <MeetupFilter on:select={setFilter} />

  <Button on:click={() => dispatch("add")}>New Meetup</Button>
</section>

<section id="meetups">
  {#each filteredMeetups as meetup}
    <MeetupItems
      id={meetup.id}
      title={meetup.title}
      subtitle={meetup.subtitle}
      description={meetup.description}
      imageUrl={meetup.imageUrl}
      email={meetup.email}
      address={meetup.address}
      isFavorite={meetup.isFavorite}
      on:showDetails
      on:edit
    />
  {/each}
</section>

<style>
  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  #meetup-controls {
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
