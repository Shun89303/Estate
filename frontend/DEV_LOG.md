<!-- Things to consider -->

Language
Role based

<!--  -->

฿

Apr-3-2026
Initial project setup.

Resetted the project.
Moved gitignore to root.
Installed deps.
Added scripts and metadata.
created development build with eas

created bottom tabs
created custom tab bars

created dark mode light mode
created global shadows

created custom metrics

created centralized metrics for tabs

created backend
created a local host server

<!-- Initial completed -->

<!-- Define data -->

Define property data
Define how database will store property data

New design detected, will redesign the property data
redesigned new property data to cover all 5 major types

Properties core table: has
core fields,
pricing fields,
classification fields(for 5 major types, for residential or business),
basic info(bedroom, bathroom, area),
badge(is new),
posted by(agent or owner),
room rent module(room type, roomate, contract), business module(type),
off plan module,
owner direct,
timestamp

property media: this table will store images, videos urls and will reference to objects inside properties table

features table(Buy/Sell): will store all features in this table one by one
property features table: will store which property is storing which feature, the same property can't have 2 same features, the referencing property id and feature id will be deleted together by cascading along with deleted property

Amenities(Room rent + business): same as features

House rules(Room Rent): same as features

Off-Plan extensions

Unit Types: same as features
Project features: same as features
Nearby landmarks: same as features

<!--  -->

Apr-4-2026
Currently ongoing off plan seeding
seeding initial data into db complete

designed api response shape

implementing backend routes
implemented agent, owner, properties - model, controller, routes

implemented image/video upload handling
multer setup complete propertyUpload.ts
setting up wrapper function to prepare for future cloud flare r2 integration, cancelled, not knowledgable enough to integrate safely
folder structure redesign to handle image/videos better for scalability complete
upload path helper setup complete - propertyPath.ts

property controller update, now including media handling to store inside property_media table

property_media table now updated + migrated previous data

db seeding complete, initial data ready
backend routes - agents, owners, properties complete
backend controllers - agent, owner, property complete
backend models - agent, owner, property (db queries) complete

media: image video handling
create property can now handle media

<!-- To do -->

plan
Render frontend pages Buy/Sell, Off-Plan, Owner Direct

Implement role-based UI logic: browsing vs agent vs owner. Conditional rendering for actions like edit, upload buttons.

Implement agent/owner upload routes using existing multer + addMedia. Include proper role checks in middleware.

Connect media upload UI to backend. Test file uploads, preview, sort order, cover selection.

Rendering Buy/Sell
didn't have features data, created model and connected to property data for frontend
didn't have agents data, created model and connected to property data for frontend
implemented map

Render the entire app's skeleton
Data shape check
fix layout
styling
UX
animation

<!--  -->

Apr-5-2026

Rendered home page skeleton
navigation working
pages connected
minimal data renders
basic ui(unstyled)

rendered search page skeleton
navigation working
pages connected
minimal data renders
basic ui(unstyled)

rendered saved page skeleton
navigation working
basic ui(unstyled)

rendered bookings page skeleton
navigation working
pages connected
minimal data renders
basic ui(unstyled)

rendered profile page skeleton
navigation working
pages connected
minimal data renders
basic ui(unstyled)

removed tab title
rendered noti page skeleton
navigation working
pages connected
minimal data renders
basic ui(unstyled)

rendered 7 booking steps page skeleton
navigation working
pages connected
minimal data renders
basic ui(unstyled)

rendered booking success page skeleton

<!--  -->

Apr-6-2026

implement nested pages skeleton
ONLY care about data sanity after the entire app's skeleton is complete

implemented customer review page

implemented profile nested pages: logout, settings, help & support, edit profile, history, top up, login

implemented booking nested pages: consultation and reserves details pages

implement search page's navigations to all 5 property types

buySell:
created type
created 3 mock data

home page featured list updated

roomRent:
created type
created 3 mock data

implemented roomRent page + details page

implemented off-plan page + details page

<!-- Latest to do -->

purpose filter not concrete just yet
wait for boss's design update about color

<!--  -->

Apr-7-2026

implemented owner-direct page + details page

implemented business page + details page

implemented contents page + details page + home page display

implemented filter system in search page

inserted unique code for each listing

created mock auth pages: login + register for user

created zustand store: authStore to test user authenticated state

created helper / wrapper function requireAuth to guide no account users to auth page

initial skeleton completed pages:
Home page
Search page
Saved page
Bookings page
Profile page

creating reusable components:
currently created reusable components:
maps(single + multi)
FilterSection (used in buy/sell, room rent, business)

creating title and body text reusables and implementing starting from home page...

<!--  -->

Apr-8-2026

currently created reusable components:
back button
search bar
filter button
filter section
clear filter button
view toggle with count

created contents home display and content page display cards
created buy sell page display card and home page display card

home page completed applying reusable texts

search page completed applying reusable components

saved page coompleted applying reusable components

bookings page coompleted applying reusable components

profile page completed applying reusable components

Surface level pages have applied reusable components.
Now continuing to apply reusable components to nested pages.

home page's featured list's home property card applied reusable components.
buy/sell details page's media carousel now became reusable.
room rent details page now using reusable media carousel.
owner direct details page now using reusable media carousel.
business details page now using reusable media carousel.

<!--  -->

Apr-9-2026

buy/sell, room rent, owner direct, off-plan, business: media carousel applied reusable component

buy/sell display page applied reusable components
room rent display page applied reusable components
owner direct display page applied reusable components
off plan display page applied reusable components
business display page applied reusable components

switched video usage from expo-av to expo-video

buy/sell details page applied reusable components
owner direct details page applied reusable components
room rent details page applied reusable components
business details page applied reusable components

<!--  -->

Apr-10-2026

<!-- COMPLETED -->

off plan details page applied reusable components
notifications page applied reusable components
customer reviews display page applied reusable components
settings page applied reusable components
help & support page applied reusable components
logout applied reusable components
contents display page applied reusable components
coin top up applied reusable components
edit profile applied reusable components
contents details page applied reusable components
consultations details page applied reusable components
created reusable heart button, share button, bookmark button
reserves details page applied reusable components
coin history applied reusable components

<!-- Latest to do -->

main pages surface display - done
5 properties display + details - done
nested pages - not done

<!-- Home nested pages:
    notification page: easiest
    customer reviews display page: easiest
    contents display page: easy
    contents details page: medium
    booking process: hard -->

<!-- My bookings nested pages:
    consultations details page: medium
    reserves details page: medium -->

<!-- Profile nested pages:
    coin history: medium
    coin top up: easy
    agent/owner login process: hardest
    edit profile: easy
    settings: easiest
    help & support: easiest
    logout: easiest -->

<!-- notification page: easiest -->

<!-- customer reviews display page: easiest -->

<!-- settings: easiest -->

<!-- help & support: easiest -->

<!-- logout: easiest -->

<!-- contents display page: easy -->

<!-- coin top up: easy -->

<!-- edit profile: easy -->

<!-- contents details page: medium -->

<!-- consultations details page: medium -->

<!-- reserves details page: medium -->

<!-- coin history: medium -->

<!-- Latest ongoing progress -->

pass data to booking process:
router.push({
pathname: "/booking",
params: {
image: property.media.cover,
title: property.title,
location: property.location.address,
bedrooms: property.bedrooms,
price: property.price,
},
});

no need to find for specific property

<!--  -->

Apr-11-2026

<!-- Latest to do -->

<!-- booking process: hard -->

agent/owner login process: hardest
implement new property type
implement new app name: insert brand image
CRUD user
i18n language setup
layout
styling proper
different phone, different tablet

<!-- COMPLETED -->

booking process: reusable + initial look

<!--  -->

Final thoughts:

Use expo dev client
I will create theme and metrics files, centralized service layer, add loading / error states

<!--  -->

Apr-12-2026

<!-- agent/owner login process: hardest -->

<!-- Completion -->

agent/owner login process: completed(applied reusable components, metrics, styles)

<!--  -->

Apr-13-2026

<!-- Todo list -->

Implement Buy Business property

<!-- Update Home page -->

Create Buy Business display page
Create route : DONE
back button : DONE
title : DONE
star: shortlist button DONE
buy coins DONE
filter button DONE
Search bar DONE
filter section DONE
view toggle with count DONE
Property cards vertical display list DONE
Buy Business display card
Property map DONE

Create mock data DONE
Create Buy Business property display card DONE initial version 1
Create Buy Business details page

<!-- Completed -->

Home page update: applied metrics, styling, Buy Business initial without route

Created reusable components and zustand stores preparation for buy business page.
buy business page initial setup
short list design

<!--  -->

Apr-14-2026

<!-- To do -->

complete final version of buy business property

<!-- Next -->

compare

<!-- Completed -->

buy business locked design
unlock sheet design
recently unlocked design
buy business unlocked card
compare feature initial design
buy business page first version design complete

<!--  -->

Apr-15-2026

<!-- To do -->

wrap up buy business display page, take notes about everything happening in this page and then move on to the buy business details page

<!-- Completed -->

updated unlock bottom sheet, short list and coins to use custom bottom sheet instead of gorhom
extract compare sheet to separate file
matched buy business display page design with lovable
buy business details page

<!--  -->

Apr-16-2026

<!-- To do -->

Saved Properties page + apply reusable component & centralize app's layout & data sanity

<!-- goal objective:  -->

User profile
Implement CTA buttons
apply reusable components & centralize app's layout + styling & data sanity(zustand stores) (user profile zustand integration) (search page design update)
add disable ability to all 6 properties so that admins can disable an entire property with a click
auth gates(ProtectedPressable) inside UIs to navigate accountless users to login page
i18n language setup
animations & UX

<!--  -->

Apr-17-2026

<!-- To do -->

implement CTA buttons in property pages + this connected to bookings page + this also connected to coins display logic when not have enough balance + this also connects to authentication(can't access if accountless)

Accountless users case:
if clicked book consultation button:
navigate to book consultation booking process(has built in create account within the booking process for this very specific scenario so that users can easily and smoothly experience the app without the need to go to login page):
asks for phone number + password in step 1:
other steps are just some other data:
at the last confirmation step:
when clicking the confirm button, all the data gathered will be sent to backend + now we got user's phone number + password so can immediately create account for user + make the user logged in:
book consultation done, user also logged in, process complete

Logged users case:
if clicked book consultation button:
since already have user's phone number and password, can skip step 1(could simply fetch user's phone number and password since they might be stored in somewhere either fetch from backend or just take it from token):
the last confirmation step no longer requires to create account for user since user is already logged in.

<!--  -->

User profile

I want to integrate zustand store so that the user data will persist

need phone number, password, name, email

a user has coin history so that user can track the purchase of coins in the app

currently I have zustand integrated to coin purchase + coin storage so that coin balance will persist but I don't have coin history integrated yet which means my current coin history page just shows static mock data

need to update top up coins design

update edit profile to become functional to user profile and the edited results should become saved and update the design as well(example show latest updated new edited name)

log out should function, leave the app, logged out the user, prompting the user to browse as guest or relogin the app

<!-- Completed -->

updated authStore: added uid(unique way to remember each user, now no longer using phone number as unique number)
created coinStore: integrated asyncStorage to remember coin + history per user instead of global persist
created custom bottom sheet for top up + log out to replace gorhom bottom sheet
currently coin data is now accurate and functional for different users
currently user data is now accurate and function for different users

next, I shall continue to integrate this store data settings into the remaining profile features to become functional instead of static mock data.

auth, coin zustand stores complete for profile, profile integrated those stores, user data now persist, profile page now showing dynamic user info about phone numebr and name, edit profile now functional. Coin data inside profile page is not 100% complete yet, only + case is completed, - case are not integrated yet as it requires touching the 6 property pages, I will integrate that tomorrow one by one

<!--  -->

Apr-18-2026

<!-- To do -->

implement Reserve CTA button inside all the property details pages except Off-plan

click reserve CTA:
a custom bottom sheet shows up:
there is cancel button, if coin balance enough(confirm button) else quick top up button + top up coins button:
click quick top up / top up coins:
a custom bottom sheet shows up:
shows coin top up options:
click the coin option to purchase coins or click Back button or X icon to close the bottom sheet

desired outcome:
if user reserves a property, the coin amount should be deducted from user's coin balance which is from coinStore zustand store.
if user top up coins, coin balance should react

<!-- Completed -->

implemented Reserve CTA inside: Buy/Sell, Room Rent, Owner Direct, Business, Buy Business.

coin history(filter now functional: meaning all filter options data are now correct stored from either coin top up or coin deduction or unlocking a locked property or reserving a property + specific property type reserve data can also now be filtered correctly )

Saved Properties - persist per user(now saved properties is not global persist but persists per user)

<!-- Next -->

Saved Properties - Persist per user

<!-- Remaining -->

Home page clean up(fixing ui spacing layouts and styling): less important
Customer Review page clean up(fixing ui spacing layouts and styling): less important
Contents page's bookmark feature zustand integration so that each user's bookmarked contents can persist: important
Contents details page clean up(apply reusables + fix ui spacing layouts and styling): less important

Search page clean up(apply reusables + fix ui spacing layouts and styling): less important

Saved properties store update to persist only per user: important

Bookings page zustand integration(integrate zustand stores for single source of truth for user booked consultations and user reserved reservations instead of using static mock data): important
To initiate bookings page zustand integration: require consultation CTA function or else user can't book consulation and resulting in not having consultations data for bookings page to render: important
To initiate bookings page zustand integration: reserve requires zustand integration(currently we already have reserve CTA functional but we don't have a reserves zustand store to save user reserved reservations, resulting in bookings page not being able to render user reserved reservations due to won't have data): important

Profile page clean up(apply reusables + fix ui spacing layouts and styling): less important

🟠 Daily Report

Progress Report for [18/4/2026] 9:00AM – 5:00PM – Sai Sai Naing Linn Oo
——————————————————

[Completed]
implemented Reserve CTA inside: Buy/Sell, Room Rent, Owner Direct, Business, Buy Business.

coin history(filter now functional: meaning all filter options data are now correct stored from either coin top up or coin deduction or unlocking a locked property or reserving a property + specific property type reserve data can also now be filtered correctly )

Saved Properties - persist per user(now saved properties is not global persist but persists per user)

[Next Plan]
Contents Bookmark Feature – Zustand Store integration
Consultation CTA – Make Functional
Bookings Page – Zustand Integration (Consultations & Reservations)
Reserve CTA – Zustand Integration (Save Reservation to Store)

Home Page – UI & Spacing Cleanup
Customer Review Page – UI Cleanup
Contents Details Page – Apply Reusables & Spacing
Search Page – Apply Reusables & Spacing
Profile Page – Apply Reusables & Spacing

add disable ability to all 6 properties (admin can disable entire listings)
auth gates (ProtectedPressable) to navigate accountless users to login
i18n language setup
animations + UX
