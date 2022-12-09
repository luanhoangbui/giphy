import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/**  Enums */
import { APIAuthen, Rating } from 'src/app/enums/api.enum';

/**  Interfaces */
import { gifResponse } from 'src/app/interfaces/gif.interface';

/**  Services */
import { giphySerice } from 'src/app/services/giphy.service';

@Component({
  selector: 'app-gif-detail',
  templateUrl: './gif-detail.component.html',
  styleUrls: ['./gif-detail.component.scss']
})
export class GifDetailComponent implements OnInit{

  @ViewChild("gifImage", { read: ElementRef })
  gifImageElement!: ElementRef; //#gifImage element

  /**  Variables */
  gifData: gifResponse = { // initial gif response data
    id: '',
    images: {
      downsized: {
        height: 0,
        size: 0,
        url: '',
        width: 0
      }
    },
    title: '',
    rating: '',
    type: '',
    user: {
      avatar_url: ``,
      description: '',
      website_url: '',
      display_name: '',
      username: ''
    },
    username: '',
    rowSpan: ''
  };
  gifId: string = '';
  isLoading: boolean = false; // use for loading-overlay

  constructor(
    private activatedRoute: ActivatedRoute,
    private giphyServirce: giphySerice
  ) {}

  ngOnInit(): void {
    // Get id from route params
    this.activatedRoute.params.subscribe(params => {
      this.gifId = params['id'];
    })

    if (this.gifId) {
      this.getGifById(this.gifId);
    }
  }

  // Get GIF from Id
  getGifById(gifId: string) {

    // Set params for API
    const params = {
      api_key: APIAuthen.APIKey,
      gif_id: gifId
    }

    this.isLoading = true;
    this.giphyServirce.getGifById(params).subscribe(res => this.gifData =  {
      ...res.data,
      user: {
        avatar_url: res.data.user?.avatar_url || '',
        description: res.data.user?.description || '',
        website_url: res.data.user?.website_url || '',
        display_name: res.data.user?.display_name || '',
        username: res.data.user?.username || ''
      },
      title: res.data.title || ''
    });
  }

  // Map the value of rating from API to label
  ratingMapping(value: string) {
    return Rating.filter(item => 
      item.value === value
      ).map(itemAfterFilter => 
        itemAfterFilter.label
        )
  }

  // Stop loading-overlay when GIFs image load finished
  onLoaded() {
    this.isLoading = false;
  }

}
