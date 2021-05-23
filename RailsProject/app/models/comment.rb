class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post
  belongs_to :replycomment, :class_name => "Comment", 
                          :foreign_key => "replycomment_id",
                          optional: true
end
