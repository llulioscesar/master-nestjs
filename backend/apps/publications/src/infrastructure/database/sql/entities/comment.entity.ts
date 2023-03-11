import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { PublicationEntity } from './publication.entity';
import { Comment } from '../../../../domain/models';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  content: string;

  @Column({
    name: 'user_id',
    nullable: false,
  })
  userId: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Column({
    name: 'publication_id',
    nullable: false,
  })
  publicationId: string;

  @ManyToOne(() => PublicationEntity, (publication) => publication.comments)
  @JoinColumn({ name: 'publication_id' })
  publication: PublicationEntity;

  @Column({
    nullable: false,
    name: 'parent_id',
  })
  parentId: string;

  @ManyToOne(() => CommentEntity, (comment) => comment.children)
  @JoinColumn({ name: 'parent_id' })
  parent: CommentEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.parent)
  children: CommentEntity[];

  ToModel(): Comment {
    const model = new Comment({
      id: this?.id,
      content: this?.content,
      userId: this?.userId,
      publicationId: this?.publicationId,
      createdAt: this?.createdAt,
      updatedAt: this?.updatedAt,
    });

    if (this.parent) {
      model.parent = this.parent.ToModel();
    }

    if (this.children) {
      model.children = this.children.map((child) => child.ToModel());
    }

    return model;
  }
}
