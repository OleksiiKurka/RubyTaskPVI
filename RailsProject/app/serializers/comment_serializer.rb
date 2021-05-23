class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :replycomment_id
  belongs_to :user
  #belongs_to :replycomment, :class_name => "Comment",
  #                        :foreign_key => "replycomment_id",
  #                        optional: true
end
