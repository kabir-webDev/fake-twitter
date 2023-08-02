import { Component } from '@angular/core';
import { TweetService } from '../tweet.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tweet-form',
  templateUrl: './tweet-form.component.html',
  styleUrls: ['./tweet-form.component.scss']
})
export class TweetFormComponent {
  tweetText: string = '';
  isTweetTooLong: boolean = false;

  constructor(private tweetService: TweetService, private snackbar: MatSnackBar) {}

  onTweetTextChanged() {
    this.isTweetTooLong = this.tweetText.length > 160;
  }

  onPostTweet() {
    if (!this.tweetText) {
      this.snackbar.open('Content cannot be empty.', 'Close', {
        duration: 3000
      });
      return;
    }

    if (this.isTweetTooLong) {
      this.snackbar.open('Tweet text is too long! Maximum 160 characters allowed.', 'Close', {
        duration: 3000
      });
      return;
    }

    const payload = {
      content: this.tweetText
    };

    this.tweetService.makeTweet(payload).subscribe(
      (response) => {
        this.snackbar.open(response.message, 'Close', {
          duration: 3000
        });
        this.tweetText = '';
      },
      (error) => {
        this.snackbar.open(error, 'Close', {
          duration: 3000
        });
        this.tweetText = '';
      }
    );
  }
}
