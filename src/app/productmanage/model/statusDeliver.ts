export class StatusDeliver {

  id: string = "";
  type: string = "";

  constructor(statusDeliver: {
    id?: string,
    type?: string,
  }) {
    this.id = statusDeliver.id || "";
    this.type = statusDeliver.type || "";
  }
}
