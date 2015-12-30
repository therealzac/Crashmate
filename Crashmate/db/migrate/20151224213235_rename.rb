class Rename < ActiveRecord::Migration
  def change
    rename_table :group_memberhips, :group_memberships
  end
end
