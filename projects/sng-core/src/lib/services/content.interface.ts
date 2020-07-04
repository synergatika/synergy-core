import { Observable } from 'rxjs';


/**
 * Models & Interfaces
 */
import { Content, Message } from '../model';

export abstract class IContentService {

  abstract readContent():
    Observable<Content[]>;

  abstract readContentById(contentId: string):
    Observable<Content>;

  abstract createContent(name: string, elTitle: string, enTitle: string, elContent: string, enContent: string):
    Observable<Message>;

  abstract updateContent(contentId: string, name: string, elTitle: string, enTitle: string, elContent: string, enContent: string):
    Observable<Message>;
}
