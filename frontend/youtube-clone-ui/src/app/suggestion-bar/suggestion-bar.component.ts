import { Component, OnInit } from '@angular/core';
import {VideoDto} from "../video-dto";
import {Subscription} from "rxjs";
import {VideoService} from "../video.service";

@Component({
  selector: 'app-suggestion-bar',
  templateUrl: './suggestion-bar.component.html',
  styleUrls: ['./suggestion-bar.component.css']
})
export class SuggestionBarComponent{

  suggestedVideos: Array<VideoDto> = [];
  getSuggestedVideosSubscription: Subscription;

  constructor(private videoService: VideoService) {
    this.getSuggestedVideosSubscription = videoService.getSuggestedVideos("").subscribe(data => {
      this.suggestedVideos = data;
    });
  }
}
