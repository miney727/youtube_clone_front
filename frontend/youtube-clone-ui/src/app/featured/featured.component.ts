import {Component, OnDestroy} from '@angular/core';
import {VideoService} from "../video.service";
import {VideoDto} from "../video-dto";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnDestroy {

  videos: Array<VideoDto> = [];
  getAllVideosSubscription: Subscription;

  constructor(private videoService: VideoService) {
    this.getAllVideosSubscription = videoService.getAllVideos().subscribe(data => {
      this.videos = data;
    });
  }

  ngOnDestroy(): void {
    this.getAllVideosSubscription.unsubscribe();
  }
}
