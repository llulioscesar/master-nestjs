import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // cambiar por la misma clave secreta del registro del módulo de JwtModule
    });
  }

  async validate(payload: any) {
    // Lógica para validar al usuario utilizando el payload del token
    return {
      user: {
        id: payload.user.id,
        email: payload.user.email,
        role: payload.user.role,
      },
    };
  }
}
