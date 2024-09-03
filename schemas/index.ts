export const typeDefs = `#graphql

  type Variation {
      color: VariationType!
      available: Int!
      img_urls: [String!]!
  }

  type Rating {
    rate: Float!
    n_reviewers: Int!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    address: [String!]!
    phone: String!
    email: String!
    password: String!
    role: String! 
  }

  type OrderedProduct {
      product_id: ID!
      amount: Int!
      variation: Variation!
  }
  
  type Product {
    id: ID! 
    name: String!
    description: String!
    price: Float!
    category: String!
    sold: Int!
    rating: Rating!
    variations: [Variation!]!
  }

  type Order {
    id: ID!
    user_id: ID!
    sub_total: Float!
    tax: Float!
    products: [OrderedProduct!]!
    status: OrderStatus!
  }

  type ProductInput {
    name: String!
    description: String!
    price: Float!
    available: Int!
    variations: [Variation!]!
  }

  type Session {
    id: ID!,
    user_id: ID!,
    createdAt: Int
  }

  type Query {
    test: User!

    users: [User!]!
    user(id: ID!): User
    
    
    product(id: ID!): Product
    products: [Product!]!

    order(id: ID!): Order
    orders(user_id: ID!): [Order!]
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, address: [String!]!, phone: String!, email: String!, password: String!, role: String!): Session!
    updateUser(user_id: ID!, name: String!, address: [String!]!, phone: String!, email: String!): User
    deleteUser(user_id: ID!): User

    createProduct(name: String!, description: String!, price: Float!, category: String!, variations: String!): Product!
    deleteProduct(id: ID!): Product

    

  }

  type NewUserInput {
    firstName: String!
    lastName: String!
    address: [String!]!
    phone: String!
    email: String!
    password: String!
    role: Role! 
  }

  

  enum OrderStatus {
    CREATED
    READY
    DELIVERING
    FINISH
  }
  
  enum Role {
    ADMIN
    USER
  }

  enum VariationType{
    Black
    White
    Gray
    Red
    Yellow
    Blue
  }

`;
