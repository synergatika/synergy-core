import { ComponentType } from '@angular/cdk/portal';
import { TemplateRef } from '@angular/core';

export abstract class IStepperService {

  abstract pledgeComponent<T> () : ComponentType<T> | TemplateRef<T>;
}
