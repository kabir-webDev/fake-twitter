import { Component, OnInit } from '@angular/core';
import { RequesterService } from 'src/app/shared/services/requester.service';
import { TweetService } from '../tweet.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private tweetService: TweetService,
    private snackbar: MatSnackBar,
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
        this.snackbar.open(err, "Close", {
          duration: 3000,
        })
      },
    });
  }
  
  onScroll() {
    this.pageCount++;
    this.getTimeline();
  }
}
