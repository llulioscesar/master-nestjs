import { Inject, Injectable } from '@nestjs/common';
import { GrpcService } from '@nestjs/microservices';
import { AccountsService } from './accounts.service';
import { PublicationsService } from './publications.service';

@Injectable()
@GrpcService()
export class NotificationsService {
  constructor(
    @Inject(AccountsService)
    private readonly accountsService: AccountsService,
    @Inject(PublicationsService)
    private readonly publicationsService: PublicationsService,
  ) {}

  notify(data: { user_id: string; publication_id: string; content: string }) {
    const publicationObserver = this.publicationsService.getPubicationById(
      data.publication_id,
    );

    publicationObserver.subscribe((publication) => {
      const userPublicationObserver = this.accountsService.getUserById(
        publication.userId,
      );
      userPublicationObserver.subscribe((userPublication) => {
        const userNotificationObserver = this.accountsService.getUserById(
          data.user_id,
        );

        userNotificationObserver.subscribe((userNotification) => {
          console.log(userNotification, userPublication, publication);
        });
      });
    });
  }
}
