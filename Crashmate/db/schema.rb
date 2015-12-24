# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151224180221) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "messages", force: :cascade do |t|
    t.integer  "sender_id",                    null: false
    t.integer  "recipient_id",                 null: false
    t.string   "type",                         null: false
    t.string   "body"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.boolean  "read",         default: false
  end

  add_index "messages", ["recipient_id"], name: "index_messages_on_recipient_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "age",             null: false
    t.string   "city",            null: false
    t.string   "date",            null: false
    t.integer  "budget",          null: false
    t.integer  "term",            null: false
    t.boolean  "dogs",            null: false
    t.boolean  "cats",            null: false
    t.string   "amenities",       null: false
    t.string   "about",           null: false
    t.string   "gender",          null: false
    t.string   "occupation",      null: false
  end

  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
