import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionnaireService } from '../../../../services/questionnaire.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ResumeGameComponent } from '../../modals/resume-game/resume-game.component';
import { AccountService } from '../../../../services/account.service';

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.scss']
})
export class QuestionnairesComponent implements OnInit {

  questionnaireId: number | null = null;
  loading: boolean = false;
  endGame: boolean = false;
  
  // Timers
  totalMinutes: number = 0;
  totalSeconds: number = 0;
  questionTime: number = 20; // Contador para los 20 segundos por pregunta
  mainTimer: any;
  questionTimer: any;

  currentQuestionIndex: number = 0;
  cuestionarioResponse: any;
  user: any;
  score: number = 0;
  colorList: string[] = ['#FFB3B3', '#B3FFB3', '#B3B3FF', '#FFB3DA', '#B3FFFF', '#E6B3FF', '#FFD1B3', '#D1B3FF', '#B3FFD1', '#D1B3FF'];
  colorIndex: number = 0;
  isGameCancelled: boolean = false;

  constructor(
    private route: ActivatedRoute , 
    private cuestionarioService: QuestionnaireService, 
    private readonly modalService: NzModalService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = JSON.parse(this.accountService.getSessionUser()!);
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.questionnaireId = +id;
      this.getQuestionnaireById();
      this.startMainTimer();
      this.startQuestionTimer();
    }

  }

  // Temporizador principal: cuenta el tiempo total del juego
  startMainTimer(): void {
    this.mainTimer = setInterval(() => {
      this.totalSeconds++;
      if (this.totalSeconds >= 60) {
        this.totalSeconds = 0;
        this.totalMinutes++;
      }
    }, 1000);
  }

  // Temporizador para cada pregunta (20 segundos)
  startQuestionTimer(): void {
    this.questionTime = 20; // Reiniciar a 20 segundos por cada pregunta
    this.questionTimer = setInterval(() => {
      this.questionTime--;
      if (this.questionTime === 0) {
        this.handleTimeUp(); // Manejar si se acaba el tiempo
      }
    }, 1000);
  }

  // Manejar cuando el tiempo para responder se acaba
  handleTimeUp(): void {
    this.stopQuestionTimer();
    this.nextQuestion(); // Pasar a la siguiente pregunta si el tiempo se acaba
  }

  // Detener el temporizador de pregunta
  stopQuestionTimer(): void {
    if (this.questionTimer) {
      clearInterval(this.questionTimer);
    }
  }

  // Detener todos los temporizadores
  stopAllTimers(): void {
    if (this.mainTimer) {
      clearInterval(this.mainTimer);
    }
    if (this.questionTimer) {
      clearInterval(this.questionTimer);
    }
  }

  getQuestionnaireById(): void {
    this.loading = true;
    this.cuestionarioService.getCuestionarioById(this.questionnaireId).subscribe(
      (data) => {
        this.cuestionarioResponse = data;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

   // Seleccionar una opción como respuesta
  onInputClick(option: any): void {
    this.stopQuestionTimer();
    
    if (this.isCorrectAnswer(option)) {
      const timeRemaining = this.questionTime; // Tiempo restante
      this.score += 10 + timeRemaining; // Sumar el puntaje (10 por respuesta correcta + segundos restantes)
    }

    this.nextQuestion(); // Pasar a la siguiente pregunta después de seleccionar una respuesta
  }

  // Verificar si la opción seleccionada es la correcta
  isCorrectAnswer(option: any): boolean {
    const currentQuestion = this.getCurrentQuestion();
    return currentQuestion && option.opcion_correcta === '1'; // Validar si opcion_correcta es '1'
  }

  // Pasar a la siguiente pregunta
  nextQuestion(): void {
    if (this.currentQuestionIndex < this.cuestionarioResponse.cuestionario_preguntas.length - 1) {
      this.currentQuestionIndex++;
      this.startQuestionTimer(); // Iniciar el temporizador de la nueva pregunta
      this.changeBackgroundColor(); //Cambiar de color el div
    } else {
      this.endGame = true;
      this.endGameEvent();
    }
  }

  // Obtener la pregunta actual
  getCurrentQuestion() {
    if (this.cuestionarioResponse && this.cuestionarioResponse.cuestionario_preguntas) {
      return this.cuestionarioResponse.cuestionario_preguntas[this.currentQuestionIndex];
    }
    return null;
  }

  // Obtener las opciones de la pregunta actual
  getCurrentOptions() {
    const currentQuestion = this.getCurrentQuestion();
    return currentQuestion ? currentQuestion.pregunta_opciones : [];
  }

  endGameEvent(): void {
    // Verificar si el juego fue cancelado
    if (this.isGameCancelled) {
      return; // Si está cancelado, no hacer nada
    }

    // Detener el temporizador
    this.stopAllTimers();

    let array = [
      {
        title: 'Tiempo',
        subTitle: `${this.totalMinutes}:${this.totalSeconds}`
      },
      {
        title: 'Cantidad de preguntas',
        subTitle: this.cuestionarioResponse.cuestionario_preguntas.length

      },
      {
        title: 'Puntaje',
        subTitle: `${this.score} puntos`
      }
    ];

    const modalResumeGame= this.modalService.create({
      nzContent: ResumeGameComponent,
      nzWidth: '400px',
      nzFooter: null,
      nzMaskClosable: false,  // Evitar cerrar al hacer clic fuera
      nzClosable: false,       // Ocultar el botón de cierre (la 'X')
      nzComponentParams: {
        data: array
      },
    });

    let payload: any = { 
      idUsuario: this.user.usuario_id, 
      idCuestionario: this.questionnaireId?.toString(),
      puntaje: this.score,
      tiempo: (this.totalMinutes * 60) + this.totalSeconds, // Tiempo total en segundos
      fecha: new Date().toISOString().slice(0, 10) // Formato YYYY-MM-DD
    };

    // Llamar al endpoint para enviar los datos
    this.cuestionarioService.postGame(payload).subscribe(
      (response) => {},
      (error) => {}
    );
  }

  exitGame() {
    const text = `¿Estás seguro que deseas salir al menu?`;

    this.modalService.confirm({
      nzTitle: 'Salir del juego',
      nzContent: text,
      nzOkText: 'Confirmar',
      nzOnOk: async () => {
        this.isGameCancelled = true; // Marcar el juego como cancelado
        this.stopAllTimers(); // Detener los temporizadores
        this.modalService.closeAll();
        this.router.navigate(['/main/home']);
      },
      nzCancelText: 'Cancelar',
      nzOnCancel: () => {
        this.modalService.closeAll();
      },
    });
  }

  // Función que cambia el color de fondo
  changeBackgroundColor() {
    const myDiv = document.getElementById('myDiv');
    if (myDiv) {
      // Cambiar al próximo color en la lista
      myDiv.style.backgroundColor = this.colorList[this.colorIndex];

      // Actualizar el índice y asegurarse de que vuelva a 0 al final de la lista
      this.colorIndex = (this.colorIndex + 1) % this.colorList.length;
    }
  }

  ngOnDestroy(): void {
    this.isGameCancelled = true; // Marcar el juego como cancelado al salir del componente
    this.stopAllTimers(); // Detener temporizadores
  }
}

