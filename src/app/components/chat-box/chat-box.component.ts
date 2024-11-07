import { Component } from '@angular/core';
import { AIGenerationService } from '../../services/text-generation-response.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css',
})
export class ChatBoxComponent {
  public prompt: string = '';
  public responseMessage: string = '';
  responseIcon: string = '';
  isLoading: boolean = false;

  iconSelection = 0;

  constructor(public service: AIGenerationService) {}

  onSubmit() {
    this.isLoading = true;
    this.service.generateContent(this.prompt).subscribe((response) => {
      console.log(response);
      let parsedData = JSON.parse(response);
      
      this.responseIcon = parsedData.icon ? parsedData.icon : "mood";
      this.responseMessage = parsedData.message ? parsedData.message : response;
      this.isLoading = false;
    });
  }
}
