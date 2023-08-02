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
  isLoading!:boolean;
  pageCount: number = 1;
  constructor(
    private requesterService: RequesterService,
    private tweetService: TweetService
  ) {}
  ngOnInit(): void {
    this.getTimeline();
    // this.getMyTweets();
  }
  getTimeline(): void {
    this.isLoading = true;
    this.tweetService.getTimeline(this.pageCount).subscribe({
      next: (res) => {
        console.log(res.timeline);
        // this.timelineData = res.timeline;
        this.timelineData = [...this.timelineData, ...res.timeline];
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
