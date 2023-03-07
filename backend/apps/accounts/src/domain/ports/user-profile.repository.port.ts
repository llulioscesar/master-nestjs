import { Profile } from '../models';

export abstract class ProfileRepositoryPort {
  abstract findByUserId(id: string): Promise<Profile | null>;
  abstract created(profile: Profile): Promise<Profile>;
  abstract updated(profile: Profile): Promise<Profile>;
}
