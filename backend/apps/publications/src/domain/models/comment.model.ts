export class Comment {
  id: string;
  content: string;
  userId: string;
  publicationId: string;
  createdAt: Date;
  updatedAt: Date;
  parent: Comment;
  children: Comment[];

  constructor(props: CommentProps) {
    this.id = props.id;
    this.content = props.content;
    this.userId = props.userId;
    this.publicationId = props.publicationId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.parent = props.parent;
    this.children = props.children;
  }
}

interface CommentProps {
  id?: string;
  content?: string;
  userId?: string;
  publicationId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  parent?: Comment;
  children?: Comment[];
}
