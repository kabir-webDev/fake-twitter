import { Component, OnInit } from '@angular/core';
import { RequesterService } from 'src/app/shared/services/requester.service';
import { TweetService } from '../tweet.service';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss'],
})
export class TweetListComponent implements OnInit {
  timelineData: any[] = [];
  isLoading!: boolean;
  pageCount: number = 1;
  isNoMoreData!:boolean;
  constructor(
    private requesterService: RequesterService,
    private tweetService: TweetService
  ) { }
  ngOnInit(): void {
    this.getTimeline();
    this.tweetService.tweetPosted$.subscribe((tweetPosted) => {
      if (tweetPosted) {
        setTimeout(() => {
          this.getTimeline(true);
        }, 2000);

      }
    });
  }
  getTimeline(initial?:boolean): void {
    this.isLoading = true;
    this.tweetService.getTimeline(this.pageCount).subscribe({
      next: (res) => {
        console.log('New Call:',res.timeline);
        // this.timelineData = res.timeline;
        if(initial){
          this.timelineData = res.timeline;
        }else{
          this.timelineData = [...this.timelineData, ...res.timeline];
        }
        this.isNoMoreData = (res.timeline.length>0) ? false : true;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.log('Error:', err);
      },
    });
  }

  getMyTweets(): void {
    this.tweetService.getMyTweets().subscribe({
      next: (res) => {
      },
      error: (err) => {
        console.log('Error:', err);
      },
    });
  }
  onScroll() {
    this.pageCount++;
    this.getTimeline();
  }
}
