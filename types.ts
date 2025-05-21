export interface User {
  name: string
  email: string
  phone: string
  gender: "male" | "female"
  birthday: string
  profilePicture?: string
}
