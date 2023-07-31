import { Component, OnInit } from '@angular/core';
import { RequesterService } from 'src/app/shared/services/requester.service';
import { TweetService } from '../tweet.service';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss'],
})
export class TweetListComponent implements OnInit {
  constructor(
    private requesterService: RequesterService,
    private tweetService: TweetService
  ) {}
  ngOnInit(): void {
    this.getMyTweets();
  }
  getMyTweets(): void {
    this.tweetService.getMyTweets().subscribe({
      next: (res) => {
        console.log('User Response:', res);
      },
      error: (err) => {
        console.log('Error:', err);
      },
    });
  }
}
