import { Profile } from '../../domain/models';
import { Inject, Injectable } from '@nestjs/common';
import { ProfileService as Service } from '../../domain/services';
import { ProfileRepository } from '../../infrastructure/database';

@Injectable()
export class ProfileService implements Service {
  constructor(
    @Inject(ProfileRepository)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async create(profile: Profile): Promise<Profile> {
    return this.profileRepository.created(profile);
  }

  getProfileByUserId(userId: string): Promise<Profile> {
    return this.profileRepository.findByUserId(userId);
  }
}
