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

<!-- Latest to do -->

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

<!-- Latest ongoing progress -->

implement nested pages skeleton
