export class Publication {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: PublicationProps) {
    this.id = props.id;
    this.content = props.content;
    this.userId = props.userId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}

interface PublicationProps {
  id?: string;
  content?: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
