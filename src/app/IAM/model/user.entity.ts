export class User {
  id: string = "";
  name: string = "";
  email: string = "";
  password: string = "";
  phone: string = "";
  address: string = "";
  ubi_geo_id: string = "";

  constructor(user: {
    id?: string,
    name?: string,
    email?: string,
    password?: string,
    phone?: string,
    address?: string,
    ubi_geo_id?: string
  }) {
    this.id = user.id || "";
    this.name = user.name || "";
    this.email = user.email || "";
    this.password = user.password || "";
    this.phone = user.phone || "";
    this.address = user.address || "";
    this.ubi_geo_id = user.ubi_geo_id || "";
  }
}
