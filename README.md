## To Do
- [ ] change app name
- [ ] media queries
- [ ] screen shot
- [ ] add to portfolio
- [ ] change favicon
- [ ] disable email confirmation
- [ ] login and signup error handling
- [ ] persist login state




## Done
- [x] on signup or login you need to set the user to its db value not its auth db value
- [x] style display grid
- [x] navigate to login on logout
- [x] get user to display wait position
- [x] break up waitlist and add waitlist
- [x] Set Up Context
- [x] Basic Style Components
- [x] Git/Github Init
- [x] fix specials context
## tests
- [ ] sign up works
- [X] user sign in and out
- [X] admin sign in and out 
- [x] admin can change special, vacancy and waitlist
- [x] waitlist users can move up down be added or deleted
- [x] users waitlist status is correct
- [x] all user routes work
- [x] all admin routes work
## Notes
- logic for whether to render admin or user views is in the protected route and navmenu

##Architecture
Initial Fetch=>State=>Context=>Components=>db via rpcs=>state via subcription