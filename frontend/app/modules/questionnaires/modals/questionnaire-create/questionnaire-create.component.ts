import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { QuestionnaireService } from '../../../../services/questionnaire.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-questionnaire-create',
  templateUrl: './questionnaire-create.component.html',
  styleUrls: ['./questionnaire-create.component.scss']
})
export class QuestionnaireCreateComponent implements OnInit{

  @Output() confirm = new EventEmitter<Boolean>();
  public submitButton = true;
  public formIsValid: boolean = false;
  public loading: boolean = false;

  public formValues = {
    date: '' as string | null,
    category: '',
    dificultad: '',
    questionCount: '',
    name: ''
  };
  
  constructor(
    private readonly modalService: NzModalService,
    private datePipe: DatePipe,
    private cuestionarioService: QuestionnaireService,
    private nzNotification: NzNotificationService) {}

  ngOnInit(): void {}

  cancel() {
    //Funcion que cierra el modal
    this.modalService.closeAll();
  }

  onDateChange(date: Date): void {
    if (date) {
      this.formValues.date = this.datePipe.transform(date, 'yyyy-MM-dd');
    }

    this.validateForm();
  }

  categoryChange(value: string): void {
    if (value) {
      this.formValues.category = value;
    }

    this.validateForm();
  }

  dificultadChange(value: string): void {
    if (value) {
      this.formValues.dificultad = value;
    }

    this.validateForm();
  }

  nameChange(value: string): void {
    if (value) {
      this.formValues.name = value;
    }

    this.validateForm();
  }

  questionCountChange(value: string): void {
    if (value) {
      this.formValues.questionCount = value;
    }

    this.validateForm();
  }

  validateForm(){
    this.formIsValid =
      this.formValues.date !== '' &&
      this.formValues.category !== '' &&
      this.formValues.dificultad !== '' &&
      this.formValues.questionCount !== '' &&
      this.formValues.name !== '';

    if(this.formIsValid){
      this.submitButton = false;
    }else{
      this.submitButton = true;
    }
  }
  
  async postQuestionnaire() {
    
    this.loading = true;
    this.submitButton = false;

    const payload = {
      fecha: this.formValues.date,
      categoria: this.formValues.category,
      dificultad: this.formValues.dificultad,
      cantPreguntas: this.formValues.questionCount,
      nombre: this.formValues.name
    };

    // Llamar al endpoint para enviar los datos
    this.cuestionarioService.postQuestionnaire(payload).subscribe(
      (response) => {
        this.confirm.emit(true);
        this.nzNotification.create('success','Cuestionario creado','El cuestionario fue creado con éxito');
        this.modalService.closeAll();
        this.loading = false;
      },
      (error) => {
        this.confirm.emit(false);
        this.modalService.closeAll();
        this.loading = false;
      }
    );
  }
}
