class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :created_at, :page_count
  belongs_to :user 
  belongs_to :category
  has_many :comments
  has_many :tags

  def page_count
    @instance_options[:page_count]
  end
end
