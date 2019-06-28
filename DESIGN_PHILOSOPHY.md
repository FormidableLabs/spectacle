# Design Philosophy

## State

The previous version of Spectacle used a classical reducer approach of containing the state at the top level of the App. This has contributed to issues of maintainability with the App and as such the decision was to use a lot more of the 'modern' react approaches of local state management.

As such we are using a simple state management philosophy of:

1. Deck maintain their own state of what slide should be currently displayed.
2. Slides maintain their own state of what should be currently displayed on the slide.
3. Anything that changes on a slide is wrapped in a SlideElement.

An example of how this state is maintained can be represented by:

1. Deck initializes and displays slide 1.
2. User triggers SlideElement transition, SlideElement appears.
3. User triggers another SlideElement transition, but as there is only one SlideElement this triggers a Slide transition.
4. Deck displays slide 2.
5. Process continues till all Slides have been displayed or it loops back to the first Slide.

Or alternatively state is:

```javascript
const state = {
  currentSlide: 1,
  currentSlideElement: 2
};
```

This state can then be easily passed up the component tree and when talking to other apps for example if we are communicating via websocket the child app will not have to care how to implement the state, simply display the streamed state.

## Components


Components are split into [`coreComponents`](#Core-Components) and [`displayComponents`](#Display-Components).
.

### Core Components 

These comprise of Slide, Deck, and SlideElementWrapper. These are used to coordinate the [state](#State). Use these to build up the slide-deck. 

### Display Components

These are in development but these will aid the users to create slide-decks in a plug and play manner without having to write their own specific display logic (though they can if they want to.)