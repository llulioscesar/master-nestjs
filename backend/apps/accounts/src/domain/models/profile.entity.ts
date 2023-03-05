export class Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;

  constructor(props: ProfileProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
  }

  static create(props: ProfileProps) {
    // Validar que los atributos requeridos estén presentes
    if (!props.userId || !props.firstName || !props.lastName) {
      throw new Error('User ID, username, email and role are required');
    }

    return new Profile(props);
  }

  update(firstName?: string, lastName?: string) {
    if (firstName) {
      this.firstName = firstName;
    }

    if (lastName) {
      this.lastName = lastName;
    }
  }
}

// Props de Profile
interface ProfileProps {
  id?: string;
  userId?: string;
  firstName: string;
  lastName: string;
}
