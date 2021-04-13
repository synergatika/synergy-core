import { Observable } from 'rxjs';


/**
 * Models & Interfaces
 */
import { Content, Sector, Message } from '../model';

export abstract class IContentService {

  abstract readSectors():
    Observable<Sector[]>;

  abstract updateSectors(sectors: Sector[]):
    Observable<Message>

  abstract readContent():
    Observable<Content[]>;

  abstract readContentById(contentId: string):
    Observable<Content>;

  abstract createContent(name: string, elTitle: string, enTitle: string, elContent: string, enContent: string):
    Observable<Message>;

  abstract updateContent(contentId: string, name: string, elTitle: string, enTitle: string, elContent: string, enContent: string):
    Observable<Message>;
}
