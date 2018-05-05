User.destroy_all

will = User.create!(
  email: "email1@email.com",
  password: "password123",
  password_confirmation: "password123"
)

andy = User.create!(
  email: "email2@email.com",
  password: "password123",
  password_confirmation: "password123"
)

will.contacts.create!(
  firstname: "will",
  lastname: "lai",
  avatar: "https://www.fillmurray.com/242/324",
  phone: "321-952-0875",
  email: "email1@email.com",
  address: "3635 Woodstock Ct. Melbourne, FL 32904",
  group: "Family"
)

andy.contacts.create!(
  firstname: "andy",
  lastname: "lai",
  avatar: "https://www.fillmurray.com/222/324",
  phone: "321-952-0875",
  email: "email2@email.com",
  address: "3635 Woodstock Ct. Melbourne, FL 32904",
  group: "Family"
)