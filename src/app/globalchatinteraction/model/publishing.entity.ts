export class Publishing {
  id: string = "";
  title: string = "";
  content: string = "";
  created_at: string = ""; // o Date
  user_id: string = "";
  image_url: string = "";

  constructor(publishing: {
    id?: string,
    title?: string,
    content?: string,
    created_at?: string,
    author_id?: string,
    image_url?: string
  }) {
    this.id = publishing.id || "";
    this.title = publishing.title || "";
    this.content = publishing.content || "";
    this.created_at = publishing.created_at || "";
    this.user_id = publishing.author_id || "";
    this.image_url = publishing.image_url || "";
  }
}
