import { IBrand, ICategory, ILoginForm, IRegisterForm } from "@/interface";

export const categories: ICategory[] = [
  { id: 1, name: "Electronics", slug: "electronics" },
  { id: 2, name: "Computers", slug: "computers" },
  { id: 3, name: "Audio", slug: "audio" },
  { id: 4, name: "Fashion", slug: "fashion" },
  { id: 5, name: "Gaming", slug: "gaming" },
  { id: 6, name: "Wearables", slug: "wearables" },
  { id: 7, name: "Accessories", slug: "accessories" },
  { id: 8, name: "Monitors", slug: "monitors" },
];

export const brands: IBrand[] = [
  { id: 1, name: "Apple", slug: "apple" },
  { id: 2, name: "Samsung", slug: "samsung" },
  { id: 3, name: "Sony", slug: "sony" },
  { id: 4, name: "Dell", slug: "dell" },
  { id: 5, name: "HP", slug: "hp" },
  { id: 6, name: "Lenovo", slug: "lenovo" },
  { id: 7, name: "ASUS", slug: "asus" },
  { id: 8, name: "MSI", slug: "msi" },
  { id: 9, name: "Logitech", slug: "logitech" },
  { id: 10, name: "Nike", slug: "nike" },
  { id: 11, name: "Adidas", slug: "adidas" },
  { id: 12, name: "Puma", slug: "puma" },
  { id: 13, name: "Zara", slug: "zara" },
  { id: 14, name: "H&M", slug: "hm" },
  { id: 15, name: "Levi's", slug: "levis" },
  { id: 16, name: "JBL", slug: "jbl" },
  { id: 17, name: "Bose", slug: "bose" },
  { id: 18, name: "Amazon", slug: "amazon" },
  { id: 19, name: "Microsoft", slug: "microsoft" },
  { id: 20, name: "Acer", slug: "acer" },
];


export const user = {
  token: "",
  user: {
    id: 0,
    firstName: "islam",
    lastName: "ibrahim",
    address: "alexandria",
    email: "islam@email.com",
    gender: "male",
    image: "",
    username: "islam",
    password: "12345"
  }
}

export const LOGIN_FORM: ILoginForm[] = [
  {
    name: "email",
    type: "email",
    placeholder: "Enter Email"
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter Password"
  }
]


export const Register_FORM: IRegisterForm[] = [
  {
    name: "username",
    type: "text",
    placeholder: "Enter Username"
  },
  {
    name: "email",
    type: "email",
    placeholder: "Enter Email"
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter Password"
  }
]


