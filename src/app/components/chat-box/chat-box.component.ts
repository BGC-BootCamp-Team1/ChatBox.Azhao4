import { Component } from '@angular/core';
import { AIGenerationService } from '../../services/text-generation-response.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent {    
  public prompt: string = ""
  public response: string = "";
  responseIcon: string[] = ['mood', 'mood_bad', 'sentiment_satisfied_alt', 'sentiment_neutral', 'sentiment_very_satisfied'];

  iconSelection = 0;

  constructor(public service: AIGenerationService) { 
    // this.service.generateContent(this.prompt).subscribe(
    //   response => { 
    //     this.response = response;
    //   });
    this.response = "mock response";
  }

  onSubmit()
  {
    this.iconSelection = (this.iconSelection + 1) % this.responseIcon.length;
    this.response = "new response";
  }

}
