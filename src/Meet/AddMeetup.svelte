<script>
  import meetups from "./meet-store.js";
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";
  import { isEmpty, isValidEmail } from "../helpers/validation.js";

  export let id = null;

  let title = "asd";
  let subtitle = "asd";
  let description = "asd";
  let imageUrl = "asd";
  let address = "asd";
  let email = "asd@asd.com";

  if (id) {
    const unsubscribe = meetups.subscribe((items) => {
      const selectedMeetup = items.find((i) => i.id === id);
      title = selectedMeetup.title;
      subtitle = selectedMeetup.subtitle;
      description = selectedMeetup.description;
      imageUrl = selectedMeetup.imageUrl;
      address = selectedMeetup.address;
      email = selectedMeetup.email;
    });

    unsubscribe();
  }

  const dispatch = createEventDispatcher();

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: descriptionValid = !isEmpty(description);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: addressValid = !isEmpty(address);
  $: emailValid = isValidEmail(email);
  $: formIsValid =
    titleValid &&
    subtitleValid &&
    descriptionValid &&
    imageUrlValid &&
    addressValid &&
    emailValid;

  function submitForm() {
    const meetupData = {
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      address: address,
      email: email,
    };

    if (id) {
      meetups.updateMeetup(id, meetupData);
    } else {
      meetups.addMeetup(meetupData);
    }
    dispatch("save");
  }

  function cancel() {
    dispatch("cancel");
  }

  function deleteMeetup() {
    meetups.removeMeetup(id);
    dispatch("save");
  }
</script>

<div>
  <Modal title="Add Meetup" on:cancel>
    <form on:submit|preventDefault={submitForm}>
      <TextInput
        id="title"
        label="Title"
        valid={titleValid}
        validityMessage="Please enter a valid title."
        type="text"
        value={title}
        on:input={(event) => (title = event.target.value)}
      />
      <TextInput
        id="subtitle"
        label="Subtitle"
        valid={subtitleValid}
        validityMessage="Please enter a valid subtitle."
        type="text"
        value={subtitle}
        on:input={(event) => (subtitle = event.target.value)}
      />
      <TextInput
        id="description"
        label="Description"
        valid={descriptionValid}
        validityMessage="Please enter a valid description."
        controlType="textarea"
        rows="3"
        bind:value={description}
      />
      <TextInput
        id="imageUrl"
        label="ImageUrl"
        valid={imageUrlValid}
        validityMessage="Please enter a valid image URL."
        type="text"
        value={imageUrl}
        on:input={(event) => (imageUrl = event.target.value)}
      />
      <TextInput
        id="address"
        label="Address"
        valid={addressValid}
        validityMessage="Please enter a valid address."
        type="text"
        value={address}
        on:input={(event) => (address = event.target.value)}
      />
      <TextInput
        id="email"
        label="E-Mail"
        valid={emailValid}
        validityMessage="Please enter a valid email."
        type="email"
        value={email}
        on:input={(event) => (email = event.target.value)}
      />
    </form>
    <div slot="footer">
      <Button type="button" on:click={cancel} mode="outline">Cancel</Button>
      <Button type="button" on:click={submitForm} disabled={!formIsValid}
        >Save</Button
      >
      {#if id}
        <Button type="button" on:click={deleteMeetup}>Delete</Button>
      {/if}
    </div>
  </Modal>
</div>

<style>
  form {
    width: 95%;
    margin: auto;
  }
</style>
