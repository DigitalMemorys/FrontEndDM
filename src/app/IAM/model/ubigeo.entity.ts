export class UbiGeo {
  id: string = "";
  city_name: string = "";
  country_name: string = "";

  constructor(ubi: {
    id?: string,
    city_name?: string,
    country_name?: string
  }) {
    this.id = ubi.id || "";
    this.city_name = ubi.city_name || "";
    this.country_name = ubi.country_name || "";
  }
}
