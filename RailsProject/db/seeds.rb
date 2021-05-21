roles = Role.create([{ role: "admin" }, { role: "user" }, { role: "moderator" }])
users = User.create([
  {
    first_name: "Erin",
    last_name: "Matthews",
    password: "1111",
    email: "1111@g.com",
    age: 30,
    about: "some Erin info",
    role_id: 1,
  },
  {
    first_name: "Jayden",
    last_name: "Feeney",
    password: "2222",
    email: "2222@g.com",
    age: 39,
    about: "some Jayden info",
    role_id: 2,
  },
  {
    first_name: "Monty",
    last_name: "Wolf",
    password: "3333",
    email: "3333@g.com",
    age: 44,
    about: "some Monty info",
    role_id: 3,
  },
])
categories = Category.create([
  {
    name:"fun",
    description:"fun fun",
  },
  {
    name:"life",
    description:"life life",
  },
  {
    name:"work",
    description:"work work",
  },
])
posts = Post.create([
  {
    title:"first",
    body:"first body",
    user_id:1,
    category_id:1,
  },
  {
    title:"second",
    body:"second body",
    user_id:2,
    category_id:2,
  },
  {
    title:"third",
    body:"third body",
    user_id:3,
    category_id:3,
  },
])

tags = Tag.create([
  {
    tag: "tag 1",
    post_id: 1
  },
  {
    tag: "tag 2",
    post_id: 1
  },
  {
    tag: "tag 3",
    post_id: 1
  },
])
