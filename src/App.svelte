<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meet/MeetupGrid.svelte";
  import { v4 as uuidv4 } from "uuid";
  import Button from "./UI/Button.svelte";
  import AddMeetup from "./Meet/AddMeetup.svelte";
  import meetups from "./Meet/meet-store.js";
  import MeetupDetail from "./Meet/MeetupDetail.svelte";
  import LoadingSpinner from "./UI/LoadingSpinner.svelte";
  import Error from "./UI/Error.svelte";

  let editMode = false;
  let editedId = null;
  let page = "overview";
  let pageData = {};
  let isLoading = true;
  let error;

  fetch("https://meet-2a75b-default-rtdb.firebaseio.com/meet.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          "An error occurred at fetching meetups, please try again later."
        );
      }
      return res.json();
    })
    .then((data) => {
      const loadedMeetups = [];
      for (const key in data) {
        loadedMeetups.push({
          id: key,
          ...data[key],
        });
      }
      setTimeout(() => {
        isLoading = false;
        meetups.setMeetups(loadedMeetups.reverse());
      }, 1000);
    })
    .catch((err) => {
      error = err;
      isLoading = false;
      console.log(err);
    });

  function savedMeetup(event) {
    editMode = false;
    editedId = null;
  }

  function cancelAdd() {
    editMode = false;
    editedId = null;
  }

  function showDetails(event) {
    page = "details";
    pageData.id = event.detail;
  }

  function closeDetails() {
    page = "overview";
    pageData = {};
  }

  function startEdit(event) {
    console.log(event);
    editMode = "edit";
    editedId = event.detail;
    console.log(editedId);
  }

  function clearError() {
    error = null;
  }
</script>

{#if error}
  <Error message={error.message} on:cancel={clearError} />
{/if}

<Header />

<main>
  {#if page === "overview"}
    {#if editMode === "edit"}
      <AddMeetup id={editedId} on:save={savedMeetup} on:cancel={cancelAdd} />
    {/if}
    {#if isLoading}
      <LoadingSpinner />
    {:else}
      <MeetupGrid
        meetups={$meetups}
        on:showDetails={showDetails}
        on:edit={startEdit}
        on:add={() => {
          editMode = "edit";
        }}
      />
    {/if}
  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
