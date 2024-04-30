import { Injectable } from '@angular/core';
// import Forefront from 'forefront';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ForefrontSentimentService {

  private apiUrl = 'https://api.forefront.ai/v1/chat/completions';
  // client = new Forefront("sk-9tH5F6Q3n7hhPleQKn8sL8polTEe711T");

  constructor(private http: HttpClient) { }

  getSentimentHttp(): Observable<any> {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer sk-9tH5F6Q3n7hhPleQKn8sL8polTEe711T'};
    const body = {
      model: "mistralai/Mistral-7B-v0.1",
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
    }
    return this.http.post(this.apiUrl, body, {headers: headers})

  }

  // getSentiment(): Promise<CompletionResponse> {
  //   const completion = this.client.chat.completions.create({
  //     model: "MODEL_STRING",
  //     messages: [
  //       {
  //       role: "system",
  //       content: "You will be provided with a tweet, and your task is to classify its sentiment as positive, neutral, or negative."
  //     },
  //       {
  //         role: "user",
  //         content: "I love you all!",
  //       }
  //     ],
  //     max_tokens: 256,
  //     stream: false,
  //   });
  //   return completion;
  // }
}
