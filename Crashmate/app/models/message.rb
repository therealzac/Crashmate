class Message < ActiveRecord::Base
  self.inheritance_column = nil
  validates :type, :sender_id, :recipient_id, presence: true
  validates :body, length: {minimum: 1, allow_nil: true}

  belongs_to :sender, class_name: "User"
  belongs_to :recipient, class_name: "User"
end
