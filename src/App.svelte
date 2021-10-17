<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meet/MeetupGrid.svelte";
  import { v4 as uuidv4 } from "uuid";
  import Button from "./UI/Button.svelte";
  import AddMeetup from "./Meet/AddMeetup.svelte";
  import meetups from "./Meet/meet-store.js";
  import MeetupDetail from "./Meet/MeetupDetail.svelte";

  let editMode = false;
  let editedId = null;
  let page = "overview";
  let pageData = {};

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
</script>

<Header />

<main>
  {#if page === "overview"}
    {#if editMode === "edit"}
      <AddMeetup id={editedId} on:save={savedMeetup} on:cancel={cancelAdd} />
    {/if}
    <MeetupGrid
      meetups={$meetups}
      on:showDetails={showDetails}
      on:edit={startEdit}
      on:add={() => {
        editMode = "edit";
      }}
    />
  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
