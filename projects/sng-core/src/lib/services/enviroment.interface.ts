export abstract class IEnvironmentService {
  abstract get mapOptions(): any;

  abstract get fixedMicrocreditCampaign(): any;

  abstract get access(): Array<any>;

  abstract get subAccess(): Array<any>;

  abstract get version(): string;

  abstract get mapApiKey(): string;

  abstract get apiUrl(): string;

  abstract get openUrl(): string;

  abstract get staticUrl(): string;

  abstract get authTimeOuter(): number;
}
