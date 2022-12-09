import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  // Using for emit and receive input value among components
  public searchGif$ = new BehaviorSubject<string>('');
  constructor() { }
  
}
