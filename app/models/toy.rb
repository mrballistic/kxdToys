class Toy < ApplicationRecord
  validates :name, presence: true
  validates :owner, presence: true
  validates :tag, presence: true
end
