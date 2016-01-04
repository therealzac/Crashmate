# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
cities = [
  "Albuquerque, NM, United States",
  "San Francisco, CA, United States",
  "Los Angeles, CA, United States",
  "New York, NY, United States",
  "Chicago, IL, United States",
  "Houston, TX, United States",
  "Philadelphia, PA, United States",
  "Phoenix, AZ, United States",
  "San Antonio, TX, United States",
  "Dallas, TX, United States",
  "San Jose, CA, United States",
  "Austin, TX, United States",
  "Jacksonville, FL, United States",
  "Indianapolis, IN, United States",
  "Columbus, OH, United States",
  "Fort Worth, TX, United States",
  "Charlotte, NC, United States",
  "Detroit, MI, United States",
  "El Paso, TX, United States",
  "Seattle, WA, United States",
  "Denver, CO, United States",
  "Washington, DC, United States",
  "Memphis, TN, United States",
  "Boston, MA, United States",
  "Nashville, TN, United States",
  "Baltimore, MD, United States"
]

genders = ["Male", "Female"]
occupations = ["Student", "Professional"]

def newdate
  year = Date.today.year.to_s
  month = (rand(12) + 1).to_s
  month.insert(0, "0") if month.length < 2
  month + "-01-" + year
end

100.times do
  name = Faker::Name.first_name
  gender = ["a", "e", "i", "y"].include?(name.last) ? "Female" : "Male"
  User.create(
  username: name,
  password: "password",
  age: rand(27) + 18,
  city: cities.sample,
  date: newdate,
  budget: rand(58) * 50 + 100,
  term: rand(12) + 1,
  dogs: (rand(11) > 5),
  cats: (rand(11) > 5),
  gender: gender,
  occupation: occupations.sample,
  amenities: Faker::Lorem.sentence,
  about: Faker::Lorem.paragraph,
  profile_pic: Faker::Avatar.image,
  group_id: nil
  )
end

100.times do
  group = Group.create()
end

500.times do
  user = User.find(rand(90) + 1)
  if user
    user.group_id = rand(100) + 1
    user.save!
  end
end

  # Parameters: {"user"=>{
    # "username"=>"Inga",
    # "password"=>"[FILTERED]",
    # "age"=>"49",
    # "city"=>"Albuquerque, NM, USA",
    # "date"=>"2-01-2016",
    # "budget"=>"1550",
    # "term"=>"1",
    # "dogs"=>"false",
    # "cats"=>"false",
    # "amenities"=>"None.",
    # "about"=>"I'm from Ukraine, looking for roommate.",
    # "gender"=>"Female",
    # "occupation"=>"Professional"}}
