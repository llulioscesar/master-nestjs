import { Profile } from './profile.entity';
import { Email, Password, Role, Username } from '../value-objects';

export class User {
  id: string;
  username: Username;
  email: Email;
  password: Password;
  role: Role;
  profile?: Profile;

  constructor(props: UserProps) {
    this.id = props.id;
    this.username = props.username;
    this.email = props.email;
    this.password = props.password;
    this.role = props.role;
    this.profile = props.profile;
  }

  static create(props: UserProps) {
    const { username, email, password, role } = props;

    // Validar que los atributos requeridos estén presentes
    if (!username || !email || !password || !role) {
      throw new Error('Username, email, password and role are required');
    }

    // Validar que los atributos sean instancias de los objetos de valor correspondientes
    if (!(username instanceof Username)) {
      throw new Error('Invalid username');
    }

    if (!(email instanceof Email)) {
      throw new Error('Invalid email');
    }

    if (!(password instanceof Password)) {
      throw new Error('Invalid password');
    }

    if (!(role instanceof Role)) {
      throw new Error('Invalid role');
    }

    return new User(props);
  }
}

// Props de User
interface UserProps {
  id?: string;
  username: Username;
  email: Email;
  password?: Password;
  role: Role;
  profile?: Profile;
}
