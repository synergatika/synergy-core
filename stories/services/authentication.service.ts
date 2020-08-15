// Core
import { Injectable } from '@angular/core';

import {
  IAuthenticationService
} from 'sng-core';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends IAuthenticationService {
  get currentUserValue () {
    return {
      user: {
        access: 'member',
      },
    };
  }
}
