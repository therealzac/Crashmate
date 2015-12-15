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
first_name      | string    | not null
last_name       | string    | not null, indexed
email           | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
budget          | integer   | not null
minimum_term    | integer   | not null
available_date  | date      | not null
target_date     | date      | not null
age             | integer   | not null
gender          | boolean   | not null
occupation      | boolean   | not null  <!-- Either student or professional -->
orientation     | integer   | not null
smoker          | boolean   | not null
pets            | boolean   | not null
smoke_preference| boolean   | not null
pet_preference  | boolean   | not null
