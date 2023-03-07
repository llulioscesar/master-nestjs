import { User } from './user.entity';

export class Auth {
  user: User;
  token: string;
  expireToken: Date;

  constructor(props: AuthProps) {
    this.user = props.user;
    this.token = props.token;
    this.expireToken = props.expireToken;
  }
}

interface AuthProps {
  user: User;
  token: string;
  expireToken: Date;
}
