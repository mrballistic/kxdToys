class Toys < ActiveRecord::Base
	validates :name, :presence => true
	validates :client, :presence => true
	validates :description, :presence => true
end
