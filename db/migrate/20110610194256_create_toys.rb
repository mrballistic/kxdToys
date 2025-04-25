class CreateToys < ActiveRecord::Migration[7.1]
  def change
    create_table :toys do |t|
      t.string :name
      t.string :user
      t.string :owner
      t.string :tag

      t.timestamps
    end
  end
end
