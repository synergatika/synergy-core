import { BehaviorSubject, Observable } from 'rxjs';

import { AuthUser } from '../model';

export abstract class IAuthenticationService {

  public currentUser: Observable<AuthUser>;

  public abstract get currentUserValue(): AuthUser;

  public abstract logout(): void;
}
