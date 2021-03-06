class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :sender_id, null: false
      t.integer :recipient_id, null: false
      t.string :type, null: false
      t.string :body
      t.timestamps null: false
    end
    add_index :messages, :recipient_id
  end
end
