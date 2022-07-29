package com.programming.techie.youtube.mapper;

import com.programming.techie.youtube.dto.VideoDto;
import com.programming.techie.youtube.model.Video;
import org.springframework.stereotype.Service;

@Service
public class VideoMapper {
    public VideoDto mapToDto(Video video) {
        return VideoDto.builder()
                .id(video.getId())
                .videoUrl(video.getUrl())
                .description(video.getDescription())
                .tags(video.getTags())
                .title(video.getTitle())
                .videoStatus(video.getVideoStatus())
                .userId(video.getUserId())
                .thumbnailUrl(video.getThumbnailUrl())
                .likeCount(video.getLikes().get())
                .dislikeCount(video.getDisLikes().get())
                .build();
    }
}
