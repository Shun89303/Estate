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

<!-- Latest ongoing progress -->

Currently ongoing off plan seeding
