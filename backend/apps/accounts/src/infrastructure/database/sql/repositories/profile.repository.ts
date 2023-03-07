import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProfileRepositoryPort } from '../../../../domain/ports';
import { Profile } from '../../../../domain/models';
import { ProfileEntity } from '../entities';

@Injectable()
export class ProfileRepository implements ProfileRepositoryPort {
  constructor(
    @Inject('PROFILES_REPOSITORY')
    private readonly repository: Repository<ProfileEntity>,
  ) {}

  async findByUserId(id: string): Promise<Profile | null> {
    const dbProfile = await this.repository.findOne({
      where: { userId: id },
    });
    return dbProfile
      ? new Profile({
          id: dbProfile.id,
          userId: dbProfile.userId,
          firstName: dbProfile.firstName,
          lastName: dbProfile.lastName,
        })
      : null;
  }

  async created(profile: Profile): Promise<Profile> {
    const profileEntity = new ProfileEntity();
    profileEntity.userId = profile.userId;
    profileEntity.firstName = profile.firstName;
    profileEntity.lastName = profile.lastName;

    const savedProfile = await this.repository.save(profileEntity);

    profile.id = savedProfile.id;

    return profile;
  }

  async updated(profile: Profile): Promise<Profile> {
    const dbProfile = await this.findByUserId(profile.userId);

    if (dbProfile) {
      dbProfile.firstName = profile.firstName;
      dbProfile.lastName = profile.lastName;

      await this.repository.save(dbProfile);

      return profile;
    }

    throw new Error('Profile not found');
  }
}
