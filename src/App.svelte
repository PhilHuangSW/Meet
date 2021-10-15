<script>
  import Header from "./UI/Header.svelte";
  import MeetupItems from "./Meet/MeetupItems.svelte";

  const meetups = [
    {
      id: "m1",
      title: "Coding Bootcamp",
      subtitle: "Learn to code in 2 hours",
      description:
        "In this meetup, we will have some experts that teach you how to build a SPA using Svelte!",
      imageUrl:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80",
      address: "27th Nerd Road, 32523 New York",
      contactEmail: "code@test.com",
    },
    {
      id: "m2",
      title: "Swim Together",
      subtitle: "Let's go for a swim!",
      description: "It's Summertime, time to get wet and enjoy the water!",
      imageUrl:
        "https://images.unsplash.com/photo-1551672746-89991811c186?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3dpbW1pbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      address: "3023 GreenTree, 92647 California",
      contactEmail: "swim@test.com",
    },
  ];
</script>

<Header />

<section id="meetups">
  {#each meetups as meetup}
    <MeetupItems
      title={meetup.title}
      subtitle={meetup.subtitle}
      description={meetup.description}
      imageUrl={meetup.imageUrl}
      contactEmail={meetup.contactEmail}
      address={meetup.address}
    />
  {/each}
</section>

<style>
  #meetups {
    margin-top: 5rem;
  }
</style>
