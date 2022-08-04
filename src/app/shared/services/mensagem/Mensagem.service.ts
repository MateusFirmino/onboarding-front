import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(private messageService: MessageService) { }

  showError(mensagem: string): void {
    this.messageService.add({severity:'error', summary: 'Erro!', detail: mensagem});
  }

  showSuccess(mensagem: string): void {
    this.messageService.add({severity:'success', summary: 'Sucesso!', detail: mensagem});
  }

  showWarn(mensagem: string): void {
    this.messageService.add({severity:'warn', summary: 'Atenção!', detail: mensagem});
  }
}
