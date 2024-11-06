import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';

interface TextGenerationResponseService {
  output: {
    choices: [
      {
        finish_reason: string;
        message: {
          role: string;
          content: string;
        }
      }
    ];
  };
  usage: {
    total_tokens: number;
    output_tokens: number;
    input_tokens: number;
  };
  request_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AIGenerationService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  generateContent(prompt: string): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    });

    const roleDescription = [
      "你现在是罗永浩，你要语气更激烈一点！",
      "回答必须以(ICON)开头，括号内的内容是angular的mat-icon可以识别的符号",
      "你的回答和你的表情需要相符合"
      ].join();   
    
    const MAX_SEED = 10000;
    const seed = Math.floor(Math.random() * MAX_SEED);

    const body = {
      "model": "qwen-max",
      "input": {
        "messages": [
          { "role": "system", "content": roleDescription },
          { "content": prompt, "role": "user" }
        ]
      },
      "parameters": {
        "temperature": 0.8,
        "seed": seed,
        "result_format": "message"
      }
    };

    return this.http.post<TextGenerationResponseService>(this.apiUrl, body, { headers }).pipe(
      map(response => response.output.choices[0].message.content)
    );
  }
}