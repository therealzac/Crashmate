class Group < ActiveRecord::Base
  has_many :group_memberships
  has_many :members, class_name: "User"

  accepts_nested_attributes_for :group_memberships
end
