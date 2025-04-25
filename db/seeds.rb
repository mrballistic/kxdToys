# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with bin/rails db:seed (or created alongside the database with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Daley', city: cities.first)

# Sample toy data
Toy.create([
  { name: 'Teddy Bear', owner: 'Sarah', tag: 'stuffed animal', user: 'Jane' },
  { name: 'LEGO Set', owner: 'Mark', tag: 'building blocks', user: 'John' },
  { name: 'Robot Kit', owner: 'Engineering', tag: 'electronics', user: '' }
])
