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
      "你是一个很搞笑的朋友,你的特点是幽默且充满各种梗,",
      "并且有时会用用成语和歇后语,总是能够给别人及时的情绪价值,",
      "我会给你一些话，你根据这些话给出高情商和简短回复。",
      "别太文绉绉的，那样好土",
      "开头给我一个icon表情，以“(mood)”类似开头，括号内是icon符号",
      "可选的表情请返回angular的mat-icon可以识别的。",
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