import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**  Enums */
import { APIUrl } from '../enums/api.enum';

@Injectable({
  providedIn: 'root'
})
export class giphySerice {

  constructor(private httpClient: HttpClient) { }

  // GET trending GIFs
  public getGifsTrending(json: any): Observable<any>{
    return this.httpClient.get<any>(`${APIUrl.base}/trending`, {params: json}) 
  }

  // GET search GIFs endpoint
  public getGifById(json: any): Observable<any>{
    return this.httpClient.get<any>(`${APIUrl.base}/${json.gif_id}`, {params: json}) 
  }
  
  // GET GIFs by ID endpoint
  public searchGifs(json: any): Observable<any>{
    return this.httpClient.get<any>(`${APIUrl.base}/search`, {params: json}) 
  }
}
