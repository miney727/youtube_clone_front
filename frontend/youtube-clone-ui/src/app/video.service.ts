import {Injectable} from '@angular/core';
import {FileSystemFileEntry} from "ngx-file-drop";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UploadVideoResponse} from "./upload-video/UploadVideoResponse";
import {Observable} from "rxjs";
import {VideoDto} from "./video-dto";
import {AuthService} from "./auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  uploadVideoResponse: UploadVideoResponse | undefined;

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  uploadVideo(fileEntry: File): Observable<UploadVideoResponse>{


    const userId = this.authService.getUserId();

    const fd = new FormData();
    fd.append("file", fileEntry, fileEntry.name);
    fd.append("userId", userId !== null ? userId : 'test');

    return this.httpClient.post<UploadVideoResponse>('http://localhost:8080/api/video/upload', fd,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
      });

  }
  public getVideoResponse(): UploadVideoResponse {
    return <UploadVideoResponse>this.uploadVideoResponse;
  }

  deleteVideo(videoId: string): Observable<UploadVideoResponse>{

    const dfd = new FormData();
    dfd.append("videoId",videoId);

    return this.httpClient.post<UploadVideoResponse>('http://localhost:8080/api/video/delete', dfd,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
      });

  }


  public getVideo(videoId: string): Observable<VideoDto> {
    return this.httpClient.get<VideoDto>("http://localhost:8080/api/video/" + videoId);
  }

  uploadThumbnail(selectedFile: File, videoId: string): Observable<string> {
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    fd.append('videoId', videoId);
    return this.httpClient.post('http://localhost:8080/api/video/thumbnail/upload', fd,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token')),
        responseType: 'text'
      });
  }

  saveVideo(videoMetData: VideoDto): Observable<VideoDto> {
    return this.httpClient.put<VideoDto>("http://localhost:8080/api/video/", videoMetData,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
      })
  }

  getAllVideos(): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>("http://localhost:8080/api/video/", {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }

  likeVideo(videoId: string | ""): Observable<VideoDto> {
    return this.httpClient.post<VideoDto>("http://localhost:8080/api/video/" + videoId + "/like", null,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    })
  }

  dislikeVideo(videoId: string | "") {
    return this.httpClient.post<VideoDto>("http://localhost:8080/api/video/" + videoId + "/dislike",null, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    })
  }

  getSuggestedVideos(userId: string | ""): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>("http://localhost:8080/api/video/suggested/"+userId, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }
}
