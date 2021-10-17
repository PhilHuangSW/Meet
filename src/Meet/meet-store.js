import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

const meetups = writable([
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
]);

const customMeetupsStore = {
  subscribe: meetups.subscribe,
  addMeetup: (meetupData) => {
    const newMeetup = {
      id: uuidv4(),
      ...meetupData,
      isFavorite: false
    };
    meetups.update(items => {
      return [newMeetup, ...items];
    })
  },
  updateMeetup: (id, meetupData) => {
    meetups.update(items => {
      const meetupIndex = items.findIndex(i => i.id === id);
      const updatedMeetup = { ...items[meetupIndex], ...meetupData };
      const updatedMeetups = [...items];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  },
  removeMeetup: (id) => {
    meetups.update(items => {
      return items.filter(i => i.id !== id);
    });
  },
  toggleFavorite: (id) => {
    meetups.update(items => {
      const updatedMeetup = { ...items.find((m) => m.id === id) };
      updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
      const meetupIndex = items.findIndex((m) => m.id === id);
      const updatedMeetups = [...items];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    })
  }
}

export default customMeetupsStore;