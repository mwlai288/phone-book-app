class CreateContacts < ActiveRecord::Migration[5.1]
  def change
    create_table :contacts do |t|
      t.string :firstname
      t.string :lastname
      t.string :avatar
      t.string :phone
      t.string :email
      t.string :address
      t.string :group
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
