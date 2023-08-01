import { Component } from '@angular/core';
import { TweetService } from '../tweet.service';

@Component({
  selector: 'app-tweet-form',
  templateUrl: './tweet-form.component.html',
  styleUrls: ['./tweet-form.component.scss']
})
export class TweetFormComponent {
  content!: string;

  constructor(private tweetService: TweetService) {}

  postData() {
    if (!this.content) {
      console.error('Content cannot be empty.');
      return;
    }

    const payload = {
      content: this.content
    };
    this.tweetService.makeTweet(payload).subscribe(
      (response) => {
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
