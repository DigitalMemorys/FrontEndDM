export class CommentE {
  id: string = "";
  content: string = "";
  created_at: string = ""; // o Date
  user_id: string = "";
  publishing_id: string = "";

  constructor(comment: {
    id?: string,
    content?: string,
    created_at?: string,
    user_id?: string,
    publishing_id?: string
  }) {
    this.id = comment.id || "";
    this.content = comment.content || "";
    this.created_at = comment.created_at || "";
    this.user_id = comment.user_id || "";
    this.publishing_id = comment.publishing_id || "";
  }
}
