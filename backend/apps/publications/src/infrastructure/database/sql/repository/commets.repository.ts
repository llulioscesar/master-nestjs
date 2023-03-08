import { Inject, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Comment } from '../../../../domain/models';
import { CommetRepositoryPort } from '../../../../domain/ports';
import { CommentEntity, PublicationEntity } from '../entities';

@Injectable()
export class CommentsRepository implements CommetRepositoryPort {
  constructor(
    @Inject('COMMENTS_REPOSITORY')
    private readonly repository: Repository<CommentEntity>,
  ) {}

  async create(comment: Comment): Promise<Comment> {
    let entity = new CommentEntity();
    entity.content = comment.content;
    entity.userId = comment.userId;
    entity.publication = { id: comment.publicationId } as PublicationEntity;
    if (comment.parent) {
      entity.parentId = comment.parent.id;
    }

    entity = await this.repository.save(entity);

    comment.id = entity.id;
    comment.createdAt = entity.createdAt;
    comment.updatedAt = entity.updatedAt;

    return comment;
  }

  async delete(id: string): Promise<void> {
    const entity = this.repository.findOneBy({ id });
    if (!entity) {
      throw new Error('Comment not found');
    }
    await this.repository.delete(id);
  }

  async getForPostId(postId: string): Promise<Comment[]> {
    const comments = await this.repository.find({
      where: { publicationId: postId },
      relations: ['parent'],
      order: { createdAt: 'ASC' },
    });

    const commentMap = {};
    const roots = [];

    for (const comment of comments) {
      comment.children = [];

      if (!comment.parent) {
        roots.push(comment);
      } else {
        if (!commentMap[comment.parent.id]) {
          commentMap[comment.parent.id] = { children: [] };
        }

        commentMap[comment.parent.id].children.push(comment);
      }

      commentMap[comment.id] = comment;
    }

    function removeParent(comment) {
      delete comment.parent;
      comment.children.forEach((child) => removeParent(child));
    }

    roots.forEach(removeParent);

    return roots.map((comment) => comment.ToModel());
  }

  async countCommentsForPublicationIds(
    publicationIds: string[],
  ): Promise<Comment[]> {
    const counts = await this.repository
      .createQueryBuilder('countedEntity')
      .select('publication_id, COUNT(*) as count')
      .where('publication_id IN (:...publicationIds)', { publicationIds })
      .groupBy('publication_id')
      .getRawMany();

    return counts.map((count) => {
      const comment = new Comment();
      comment.publicationId = count.publication_id;
      comment.countsPublications = parseInt(count.count);
      return comment;
    });
  }
}
