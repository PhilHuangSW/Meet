<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meet/MeetupGrid.svelte";
  import { v4 as uuidv4 } from "uuid";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meet/EditMeetup.svelte";

  let editMode = false;

  let meetups = [
    {
      id: uuidv4(),
      title: "Coding Bootcamp",
      subtitle: "Learn to code in 2 hours",
      description:
        "In this meetup, we will have some experts that teach you how to build a SPA using Svelte!",
      imageUrl:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80",
      address: "27th Nerd Road, 32523 New York",
      email: "code@test.com",
      isFavorite: false,
    },
    {
      id: uuidv4(),
      title: "Swim Together",
      subtitle: "Let's go for a swim!",
      description: "It's Summertime, time to get wet and enjoy the water!",
      imageUrl:
        "https://images.unsplash.com/photo-1551672746-89991811c186?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3dpbW1pbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      address: "3023 GreenTree, 92647 California",
      email: "swim@test.com",
      isFavorite: false,
    },
  ];

  function addMeetup(event) {
    meetups = [
      {
        id: uuidv4(),
        title: event.detail.title,
        subtitle: event.detail.subtitle,
        description: event.detail.description,
        imageUrl: event.detail.imageUrl,
        address: event.detail.address,
        email: event.detail.email,
        isFavorite: false,
      },
      ...meetups,
    ];
    editMode = false;
  }

  function toggleFavorite(event) {
    const id = event.detail;
    const updatedMeetup = { ...meetups.find((m) => m.id === id) };
    updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
    const meetupIndex = meetups.findIndex((m) => m.id === id);
    const updatedMeetups = [...meetups];
    updatedMeetups[meetupIndex] = updatedMeetup;
    meetups = updatedMeetups;
  }

  function cancelAdd() {
    editMode = false;
  }
</script>

<Header />

<main>
  <div class="meetup-controls">
    <Button on:click={() => (editMode = "add")}>New Meetup</Button>
  </div>
  {#if editMode === "add"}
    <EditMeetup on:save={addMeetup} on:cancel={cancelAdd} />
  {/if}
  <MeetupGrid {meetups} on:toggleFavorite={toggleFavorite} />
</main>

<style>
  main {
    margin-top: 5rem;
  }

  .meetup-controls {
    margin: 1rem;
  }
</style>
