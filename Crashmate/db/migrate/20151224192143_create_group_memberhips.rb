class CreateGroupMemberhips < ActiveRecord::Migration
  def change
    create_table :group_memberhips do |t|
      t.integer :group_id, null: false
      t.integer :user_id, null: false
      t.timestamps null: false
    end
    add_index :group_memberhips, :group_id
  end
end
