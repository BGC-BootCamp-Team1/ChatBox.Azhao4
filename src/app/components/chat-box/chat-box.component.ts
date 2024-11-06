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
      const regex = /^\(([^)]+)\)\s*(.*)$/s;
      const match = response.match(regex);
      if (match) {
        this.responseIcon = match[1];
        this.responseMessage = match[2];
        this.isLoading = false;
      }
    });
  }
}
