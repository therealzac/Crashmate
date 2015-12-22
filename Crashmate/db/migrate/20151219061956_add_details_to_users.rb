class AddDetailsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :age, :integer, null: false
    add_column :users, :city, :string, null: false
    add_column :users, :date, :string, null: false
    add_column :users, :budget, :integer, null: false
    add_column :users, :term, :integer, null: false
    add_column :users, :dogs, :boolean, null: false
    add_column :users, :cats, :boolean, null: false
    add_column :users, :amenities, :string, null: false
    add_column :users, :about, :string, null: false
    add_column :users, :gender, :string, null: false
    add_column :users, :occupation, :string, null: false
  end
end
