# Crashmate

[Heroku link][heroku] https://crashmate.herokuapp.com/

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

Crashmate is a tool for people to find roommates, built using Ruby on Rails and
React.js. Crashmate allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] Create an account
- [x] Log in / Log out
- [ ] Browse all roommates
- [ ] Filter search results
- [ ] Access roommate show page and contact functionality

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Auth Cycle, Flux Pattern, and first screen (1.5 days)

Phase 1 will entail getting all of the boilerplate with the backend out of the
way. Storing and authorizing users in the DB using BCrypt shouldn't take more
than a couple hours, since it's basically like assessment 04 again.

I will also lay the groundwork for the front end during this phase, and set up
a RoommatesStore so I can get a full flux cycle in place.

Next I will build the Nav_Bar component, which will be present in all following
views. This will have a homepage button, a Sign_In button, Log_In button when
logged out. If a user is logged in, this will have a Notifications component, a
Profile button with their profile picture, and a Log_Out button.

[Details][phase-one]

### Phase 2: Index Page (1-2 days)

Phase 2 will be spent tackling the index page. This will feature the Nav_Bar
and a Filter_Bar component that users can interface with to update search results
rapidly. The filter bar will have the following React components:
- [ ] Age_Slider with 2 sliding handles,
- [ ] Monthly_Budget_Slider with 1 handle,
- [ ] Minimum_Stay_Slider with 1 handle,
- [ ] Move_In_Date_Calendar interface,
- [ ] Gender_Selector,
- [ ] Occupation_Selector,
- [ ] Smoker_Selector,
- [ ] Orientation_Selector,
- [ ] Pets_Selector.

The index page will also have an Index component of all roommates that satisfy
the search criteria detailed by the filter bar. This index will be populated by
Index_Item components, which will have roommate pictures and first names, along
with a 'like' option that interfaces with the LikesStore.

[Details][phase-two]

### Phase 3: User Show Page (1.5 days)

Phase 3 will be spent tackling the user's Show page. This will feature the
Nav_Bar, and a User_Details_Bar component, displaying a profile picture and
useful information about the user. This will also feature a Header component,
allowing them to send a message to the user and add them to their 'favorites'
in the DB.

The bulk of the page will be accounted for by the About_Section, and I'd also like
to provide a Property_Likes_Section, which will have Property_Like_Item components
as children. This will involve integrating the Zillow API, which would be a bonus
feature.

[Details][phase-three]

### Phase 4: Testing and Optimization (1-2 days)

This day will be spent completing any unfinished tasks from previous phases,
and making sure that everything is integrated correctly. After everything
works, I'll spend the day copying other good looking websites and building out
the front page 'tour' feature similar to the front page of https://asana.com/ or
https://www.airbnb.com/.

[Details][phase-four]

### Phase 5: New User Setup Process (1-2 day)

Up until this point we've had a very basic user setup process, but given that
this service requires a lot of user input to be useful, we'll need a more
comprehensive user setup interface.

I'll add a detailed user sign up process that gets any situational information
that may be pertinent, such as where they're trying to move, when they'll be
available to move, any deadlines they may have to find a place, etc.

As a bonus, the last component of setting up a profile will involve having the
user select a few favorites from a list of properties in their target area and
price range so that other users can also be matched in terms of property
preference. This will involve a more robust interface with the Zillow API.

[Details][phase-five]

### Phase 6: Polishing

All remaining time will be spent making sure these features work well, and that
the user experience is as pleasant and impressive as possible.

### Bonus Features (TBD)
- [ ] Add a 'log in with Facebook' feature.
- [ ] Allow users to like properties.
- [ ] Add support for couples looking for roommate(s).
- [ ] Add support for groups of several roommates.

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
