export class Publication {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: PublicationProps) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.userId = props.userId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}

interface PublicationProps {
  id?: string;
  title?: string;
  content?: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
