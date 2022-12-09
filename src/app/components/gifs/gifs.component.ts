import { Component, OnInit } from '@angular/core';

/**  Enums */
import { APIAuthen, Paging } from 'src/app/enums/api.enum';
import { GridStyle } from 'src/app/enums/style-variable.enum';

/**  Interfaces */
import { gifResponse, gifSearchRequest, gifTrendingRequest } from 'src/app/interfaces/gif.interface';

/**  Services */
import { CommonService } from 'src/app/services/common.service';
import { giphySerice } from 'src/app/services/giphy.service';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.scss']
})
export class GifsComponent implements OnInit {
  
  /**  Variables */
  isLoading: boolean = true; // use for loading-overlay
  searchValue: string = ''; // search-value emited from header
  listOfGifs!: gifResponse[]; // list of GIFs response from APIs
  columnWidth = GridStyle.comlumnWidth; 
  gridGap = GridStyle.gridGap;
  pageSize = Paging.pageSize;
  currentOffset = -Paging.pageSize; 
  resultNumber = 1; // total results count from APIs response

  constructor(
      private giphyService: giphySerice,
      private commonService: CommonService
    ) { }

  ngOnInit(): void {
    this.commonService.searchGif$.subscribe(value => {   
      this.searchValue = value;
      this.currentOffset = -this.pageSize;  
      if (this.listOfGifs) {
        this.listOfGifs.length = 0;
      }
      this.searchGifs();
    });
  }

  // Get trending GIFs from APIs
  getGifs() { 
    this.isLoading = true;
    this.currentOffset += this.pageSize; // increase offset to get more item

    const gifsTrendingRequest: gifTrendingRequest = {
      api_key: APIAuthen.APIKey,
      limit : this.pageSize,
      offset: this.currentOffset
    }
    this.giphyService.getGifsTrending(gifsTrendingRequest).subscribe(res => {
      this.addGifFromResponse(res);
      this.resultNumber = res.pagination.total_count;
    }).add( () => {
      this.isLoading = false;
    });
  }

  // Search GIFs from APIs with params
  searchGifs() {
    this.isLoading = true;

    if (this.searchValue) {
      this.currentOffset = this.searchValue ? this.currentOffset + this.pageSize : 0; // calculate offset while searching

      const gifsSearchingParams: gifSearchRequest = { // set params for API
        api_key: APIAuthen.APIKey,
        q: this.searchValue,
        limit : this.pageSize,
        offset: this.currentOffset
      }
      this.giphyService.searchGifs(gifsSearchingParams).subscribe(res => {
        this.addGifFromResponse(res);
        this.resultNumber = res.pagination.total_count; // total results
      }).add( () => {
        this.isLoading = false;
      });
    }
    else {
      this.getGifs(); // get trending list if searchValue is empty
    }
  }
  
  // Parsing GIFs from response data to listOfGifs
  addGifFromResponse(response: any) {
    if (this.listOfGifs){
      this.listOfGifs = this.listOfGifs.concat(response.data);
    }
    else {
      this.listOfGifs = response.data;
    }
    this.listOfGifs = this.listOfGifs.map(gif => {
      return {
        ...gif,
        rowSpan: `span ${Math.ceil(this.calcImageHeight(gif.images.downsized.height, gif.images.downsized.width) / this.gridGap) + 1}` // calculate number of row span for each item in grid
      }
    })
  }

  // Calculate the height of image in DOM relative to image's size
  calcImageHeight (height: number, width: number) {
    return height / width * this.columnWidth
  }

  // Lazy load GIFs when receive visible event
  isIntersecting () {
    this.searchValue ? this.searchGifs() : this.getGifs();
  }

}
