import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { QuestionnaireService } from '../../../../services/questionnaire.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-add-question-automatic',
  templateUrl: './add-question-automatic.component.html',
  styleUrls: ['./add-question-automatic.component.scss']
})
export class AddQuestionAutomaticComponent implements OnInit {
  @Output() confirm = new EventEmitter<boolean>();
  public data: any;
  public submitButton = true;
  public formIsValid = false;
  public loading = false;
  public dataLoaded = false; // Variable para controlar si se muestran los inputs
  questionArray: { text: string; options: { text: string; isCorrect: boolean }[] }[] = [];

  public formValues = {
    date: '' as string | null,
    category: '',
    dificultad: '',
    questionCount: ''
  };
  
  constructor(
    private readonly modalService: NzModalService,
    private cuestionarioService: QuestionnaireService,
    private nzNotification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.dataLoaded = false; // Inicialmente ocultamos el formulario
  }

  // Función que llama a la API y carga las preguntas
  loadQuestions(): void {
    this.loading = true;
  
    // Simulación de llamada a la API o ejecución del servicio real
    this.cuestionarioService.getQuestionnaireDataTest(this.data.cuestionario_cantidad_preguntas , this.data.cuestionario_categoria).subscribe(
      (response) => {
        // Parseamos el contenido JSON en caso de que venga en un campo 'contents'
        const data = Array.isArray(response) ? response : JSON.parse(response.contents);
  
        this.questionArray = data.map((question:any) => ({
          text: question.question,
          options: Object.keys(question.answers).map((key) => ({
            text: question.answers[key], // Extraemos el texto de cada respuesta
            isCorrect: key === question.correct_answer // Comparamos con la respuesta correcta
          })),
          feedback: question.feedback // Añadimos el feedback como ayuda adicional
        }));
  
        this.submitButton = false;
        this.dataLoaded = true;
        this.loading = false;
      },
      (error) => {
        this.nzNotification.create('error', 'Error', 'No se pudieron cargar los datos');
        this.loading = false;
      }
    );
  }
  

  updateQuestionText(index: number, newText: string): void {
    this.questionArray[index].text = newText;
    this.validateForm();
  }

  updateOptionText(questionIndex: number, optionIndex: number, newText: string): void {
    this.questionArray[questionIndex].options[optionIndex].text = newText;
    this.validateForm();
  }

  toggleCorrectOption(questionIndex: number, optionIndex: number): void {
    this.questionArray[questionIndex].options.forEach((option, index) => {
      option.isCorrect = index === optionIndex;
    });
    this.validateForm();
  }

  validateForm(): void {
    this.formIsValid = this.questionArray.every(question => 
      question.text.trim() !== '' && 
      question.options.filter(option => option.isCorrect && option.text.trim() !== '').length === 1
    );
    this.submitButton = !this.formIsValid;
  }

  postQuestion(): void {
    this.loading = true;
    this.submitButton = true;

    const payload = {
      cuestionario_id: this.data?.cuestionario_id,
      cuestionario_preguntas: this.questionArray.map(question => ({
        pregunta_texto: question.text,
        pregunta_opciones: question.options.map(option => ({
          opcion_texto: option.text,
          opcion_correcta: option.isCorrect ? "1" : "0"
        }))
      }))
    };

    this.cuestionarioService.crearQuestionnaire(payload).subscribe(
      () => {
        this.confirm.emit(true);
        this.nzNotification.create('success', 'Preguntas creadas', 'Las preguntas se crearon con éxito');
        this.modalService.closeAll();
        this.loading = false;
      },
      (error) => {
        this.confirm.emit(false);
        this.nzNotification.create('error', 'Error', 'No se pudieron crear las preguntas');
        this.modalService.closeAll();
        this.loading = false;
      }
    );
  }

  cancel(): void {
    this.modalService.closeAll();
  }
}
