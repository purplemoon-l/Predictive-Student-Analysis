import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Component } from '@angular/core';

@Injectable()
export class HttpService {

    apiUrl = 'http://192.168.43.172:5000'

    constructor(private http: HttpClient) { }

    public get(path: string) {
        return this.http.get(this.apiUrl + path, { headers: this.getHeaders() }).toPromise();
    }

    public post(path: string, body: string) {
        return this.http.post(this.apiUrl + path, body, { headers: this.getHeaders() }).toPromise();
    }
    public postLocal(path: string, body: string) {
        return this.http.post(path, body, { headers: this.getHeaders() }).toPromise();
    }

    public put(path: string, body: string) {
        return this.http.put(this.apiUrl + path, body, { headers: this.getHeaders() }).toPromise();
    }

    public delete(path: string) {
        return this.http.delete(this.apiUrl + path, { headers: this.getHeaders() }).toPromise();
    }

    public secureGet(path: string) {
        // console.log(this.secureHeaders);
        return this.http.get(this.apiUrl + path, { headers: this.getSecureHeaders() }).toPromise();
    }

    public securePost(path: string, body: any) {
        return this.http.post(this.apiUrl + path, body, { headers: this.getSecureHeaders() }).toPromise();
    }

    public securePut(path: string, body: string) {
        return this.http.put(this.apiUrl + path, body, { headers: this.getSecureHeaders() }).toPromise();
    }

    public secureDelete(path: string) {
        return this.http.delete(this.apiUrl + path, { headers: this.getSecureHeaders() }).toPromise();
    }

    getHeaders() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return headers;
    }

    getSecureHeaders() {
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
        return headers;
    }

}