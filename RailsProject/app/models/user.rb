class User < ApplicationRecord
  belongs_to :role
  has_many :likes,  :dependent => :destroy
  has_secure_password
end
