class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :created_at
  belongs_to :user 
  belongs_to :category
  has_many :comments
  has_many :tags
end
