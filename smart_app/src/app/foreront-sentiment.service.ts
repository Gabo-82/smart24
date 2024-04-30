import { Injectable } from '@angular/core';
import Forefront from 'forefront';
import { Observable, from } from 'rxjs';
import { CompletionResponse } from 'forefront/build/chat/completion';

@Injectable({
  providedIn: 'root'
})
export class ForefrontSentimentService {

  private apiUrl = 'http://localhost:8080/api/';
  client = new Forefront('sk-9tH5F6Q3n7hhPleQKn8sL8polTEe711T');

  constructor() { }

  async getSentiment() {
    const completion = await this.client.chat.completions.create({
      model: "MODEL_STRING",
      messages: [
        {
          role: "user",
          content: "Write a recipe for an italian dinner",
        },
      ],
      max_tokens: 256,
      stream: false,
    });
    return completion;
  }
}
