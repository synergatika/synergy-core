import { Observable } from "rxjs";
import { Content, Sector } from "../model";
import { HttpClient } from '@angular/common/http';


export abstract class IStaticContentService {

    public _content: Content[];
    public _sectors: Sector[];
    environment = 'https://api.synergatika.gr';

    constructor(
        private http: HttpClient,
    ) {
    }

    get content(): Content[] {
        console.log("Provider");
        console.log(this._content)
        return this._content;
    }

    get sectors(): Sector[] {
        return this._sectors;
    }

    readContent(): Promise<any> {

        return new Promise((resolve, reject) => {//An Http Get to my API to get the available languages in my application
            this.http.get<Observable<Content[]>>(`${this.environment}/content`)
                .subscribe(response => {
                    this._content = response['data'];
                    console.log(this._content)
                    resolve(true);
                })
        })
    }

    readSectors(): Promise<any> {

        return new Promise((resolve, reject) => {//An Http Get to my API to get the available languages in my application
            this.http.get<Observable<Content[]>>(`${this.environment}/content/sectors`)
                .subscribe(response => {
                    this._sectors = response['data'];
                    resolve(true);
                })
        })
    }
}