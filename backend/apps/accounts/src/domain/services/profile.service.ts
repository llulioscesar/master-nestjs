import { Profile } from '../models';

export abstract class ProfileService {
  abstract getProfileByUserId(userId: string): Promise<Profile>;

  abstract create(profile: Profile): Promise<Profile>;
}
