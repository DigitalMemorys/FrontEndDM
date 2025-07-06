export class Category {

  id: string = "";
  category_name: string = "";
  description: string = "";

  constructor(category: {
    id?: string,
    category_name?: string,
    description?: string
  }) {
    this.id = category.id || "";
    this.category_name = category.category_name || "";
    this.description = category.description || "";
  }
}
