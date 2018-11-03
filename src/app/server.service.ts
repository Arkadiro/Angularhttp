import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  url = 'https://angularhttp-336ee.firebaseio.com/'
  endpoint = 'data.json'
  constructor( private http: Http) { }

  storeServers(servers: any[]){
    const headers = new Headers({
      "provider": "anonymous",
      //"uid": "seqHZNFYgjQsRW3AlJcBzNcDACD2"
    })
    return this.http.put(this.url+this.endpoint, servers, {headers:headers});
  }

  getServers(){
    return this.http.get(this.url+this.endpoint)
      .pipe(map(
        (response: Response) => {
          const data = response.json();
          console.log(response)
          for (const server of data){  // for data transform
            server.name = 'Fetched_'+server.name;
          }
          return data;
        }
      ))
      .pipe(catchError(
        error=>{
          console.log(error.toString())
          return throwError('Something went wrong');
        }
      )
      )
  }

  getAppName(){
    return this.http.get('https://angularhttp-336ee.firebaseio.com/appName.json')
      .pipe(map(
        (response: Response) => {
          return response.json()
        }
      ))
  }
}
