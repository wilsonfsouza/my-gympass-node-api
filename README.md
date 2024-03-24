
# App

GymPass style app.
- Monthly membership to access registered gyms

## RFs (Functional requirements)

- [X] It must be able to register a user;
- [X] It must be able to authenticate a user;
- [X] It must be able to get the profile of a logged in user;
- [ ] It must be able to obtain the number of check-ins made by the logged in user;
- [X] User must be able to see their own history of check-ins;
- [ ] User must be able to search for near by gyms;
- [ ] User must be able to search gyms by name;
- [X] User must be able to check-in in a gym;
- [ ] It must be able to validate the check-in of a user;
- [X] It must be able to register a gym;

## RNs (Business Logic)

- [X] User cannot register with an email that already exists;
- [X] User cannot make 2 check-ins in the same day;
- [X] User cannot check-in into a gym if it's not near by (100m);
- [ ] The check-in can only be validated up to 20 minutes after its creation;
- [ ] The check-in can only be validated by an admin;
- [ ] A gym can only be registered by an admin;

## RNFs (Non-functional requirements)

- [X] User's password must be hashed;
- [X] App's data must be persisted in a PostgreSQL database;
- [X] All lists of data must be paginated with 20 items per page;
- [ ] User must be identified by a JWT (JSON Web Token);