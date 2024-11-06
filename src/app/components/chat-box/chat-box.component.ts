import { Component } from '@angular/core';
import { AIGenerationService } from '../../services/text-generation-response.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent {    
  public prompt: string = "我今天晚上吃什么呢？！"
  public response: string = "";

  constructor(public service: AIGenerationService) { 
    this.service.generateContent(this.prompt).subscribe(
      response => { 
        this.response = response;
      });
  }

}
