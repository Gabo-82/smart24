import { Injectable } from '@angular/core';
import OpenAI from "openai";
import { Observable } from "rxjs";
import {HttpClient} from "@angular/common/http";
import {APIPromise} from "openai/core";
import * as process from "node:process";
import {environment} from "../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class OpenaiSentimentService {
  private openai : OpenAI = new OpenAI({
      apiKey: environment.apiKey, /*process.env['OPENAI_API_KEY'],*/
      dangerouslyAllowBrowser: true
    }
  )
  constructor() { }

  getOpenAISentiment(): APIPromise<OpenAI.Chat.Completions.ChatCompletion> {
    const completion = this.openai.chat.completions.create({
      messages: [{
        role: "system",
        content: "You will be provided with a tweet, and your task is to classify its sentiment as positive, neutral, or negative."
      },{
          role: "user",
        content: "I love you all!",
        }
        ],
      model: "gpt-3.5-turbo",
    });
    return completion;
  }
}
