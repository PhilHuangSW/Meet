<script>
  import MeetupItems from "./MeetupItems.svelte";

  export let meetups;
</script>

<section id="meetups">
  {#each meetups as meetup}
    <MeetupItems
      id={meetup.id}
      title={meetup.title}
      subtitle={meetup.subtitle}
      description={meetup.description}
      imageUrl={meetup.imageUrl}
      email={meetup.email}
      address={meetup.address}
      isFavorite={meetup.isFavorite}
      on:toggleFavorite
    />
  {/each}
</section>

<style>
  section {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  @media (min-width: 768px) {
    section {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
