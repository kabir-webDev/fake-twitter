import { Component } from '@angular/core';
import { TweetService } from '../tweet.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tweet-form',
  templateUrl: './tweet-form.component.html',
  styleUrls: ['./tweet-form.component.scss']
})
export class TweetFormComponent {
  tweetText!: string;

  constructor(private tweetService: TweetService,
    private snackbar: MatSnackBar) { }

  onPostTweet() {
    if (!this.tweetText) {
      console.error('Content cannot be empty.');
      return;
    }
    const payload = {
      content: this.tweetText
    };
    this.tweetService.makeTweet(payload).subscribe(
      (response) => {
        this.snackbar.open(response.message, "Close", {
          duration: 80000
        })
        this.tweetText = '';
      },
      (error) => {
        console.error('Error:', error);
        this.tweetText = '';
      }
    );
  }
}