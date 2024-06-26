import { Injectable } from '@angular/core';
import Forefront from "forefront"
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CompletionResponse} from "forefront/build/chat/completion";

@Injectable({
  providedIn: 'root'
})
export class ForerontSentimentService {

  private apiUrl = 'http://localhost:8080/api/';

  constructor(private client = new Forefront("sk-9tH5F6Q3n7hhPleQKn8sL8polTEe711T")) { }

  getSentiment(): Promise<CompletionResponse> {
    const completion = this.client.chat.completions.create({
      model: "MODEL_STRING",
      messages: [
        {
        role: "system",
        content: "You will be provided with a tweet, and your task is to classify its sentiment as positive, neutral, or negative."
      },
        {
          role: "user",
          content: "I love you all!",
        }
      ],
      max_tokens: 256,
      stream: false,
    });
    return completion;
  }
}
