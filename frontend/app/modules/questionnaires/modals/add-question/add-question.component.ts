import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { QuestionnaireService } from '../../../../services/questionnaire.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit{
  @Output() confirm = new EventEmitter<Boolean>();
  public data : any;
  public submitButton = true;
  public formIsValid: boolean = false;
  public loading: boolean = false;
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
    private nzNotification: NzNotificationService) {}

  ngOnInit(): void {
    console.log(this.data);
    const numberOfQuestions = parseInt(this.data.cuestionario_cantidad_preguntas, 10) || 0;

    // Genera el `questionArray` con cada pregunta y sus opciones inicializadas
    this.questionArray = Array.from({ length: numberOfQuestions }, () => ({
      text: '',
      options: Array.from({ length: 3 }, () => ({ text: '', isCorrect: false })) // Cambiado aquí
    }));

    console.log(this.questionArray);
  }

  // Función para actualizar el texto de la pregunta
  updateQuestionText(index: number, newText: string): void {
    this.questionArray[index].text = newText;
  }

  // Función para actualizar el texto de una opción específica
  updateOptionText(questionIndex: number, optionIndex: number, newText: string): void {
    this.questionArray[questionIndex].options[optionIndex].text = newText;
  }

  cancel() {
    //Funcion que cierra el modal
    this.modalService.closeAll();
  }

  // Función para alternar la opción correcta de una pregunta
  toggleCorrectOption(questionIndex: number, optionIndex: number): void {
    this.questionArray[questionIndex].options.forEach((option, index) => {
      if (index !== optionIndex) {
        option.isCorrect = false; // Desmarca las otras opciones
      }
    });
  }

  validateForm(): void {
    // 1. Validar que cada pregunta tenga texto
    const areQuestionsComplete = this.questionArray.every(question => question.text.trim() !== '');
  
    // 2. Validar que cada pregunta tenga exactamente una opción con texto y marcada como correcta
    const areOptionsValid = this.questionArray.every(question => {
      const correctOptions = question.options.filter(option => option.isCorrect && option.text.trim() !== '');
      return correctOptions.length === 1;
    });
  
    // 3. El botón se habilita solo si ambas condiciones son verdaderas
    this.formIsValid = areQuestionsComplete && areOptionsValid;
    this.submitButton = !this.formIsValid;
  }
  
  async postQuestion() {
    
    this.loading = true;
    this.submitButton = false;

    const payload = {
      cuestionario_id: this.data.cuestionario_id,
      cuestionario_preguntas: this.questionArray.map(question => ({
        pregunta_texto: question.text,
        pregunta_opciones: question.options.map(option => ({
          opcion_texto: option.text,
          opcion_correcta: option.isCorrect ? "1" : "0"
        }))
      }))
    };

    // Llamar al endpoint para enviar los datos
    this.cuestionarioService.crearQuestionnaire(payload).subscribe(
      (response) => {
        this.confirm.emit(true);
        this.nzNotification.create('success','Preguntas creadas','Las preguntas se crearon con éxito');
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
