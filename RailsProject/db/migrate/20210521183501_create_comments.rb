class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.string :body
      t.references :user, null: false, foreign_key: true
      t.references :post, null: false, foreign_key: true
      t.references :replycomment, null: true, foreign_key: { to_table: :comments }

      t.timestamps
    end
  end
end
