# Schema Information

## users, 1st phase
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique


## users, 2nd phase
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
budget          | integer   | not null
minimum_term    | integer   | not null
available_date  | date      | not null
age             | integer   | not null
gender          | boolean   | not null
occupation      | boolean   | not null
dogs            | boolean   | not null
cats            | boolean   | not null

## messages, 3rd phase
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
type            | string    | not null
body            | string    |
sender_id       | integer   | not null, foreign key
reciever_id     | integer   | not null foreign key


## groups, 4th phase
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key

## group memberships, 4th phase
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
member_id       | integer   | not null, foreign key
group_id        | integer   | not null, foreign key
