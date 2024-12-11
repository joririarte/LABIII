import { Component } from '@angular/core';
import { QuestionnaireService } from '../../../../services/questionnaire.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { QuestionnaireCreateComponent } from '../../modals/questionnaire-create/questionnaire-create.component';
import { AddQuestionComponent } from '../../modals/add-question/add-question.component';
import { AddQuestionAutomaticComponent } from '../../modals/add-question-automatic/add-question-automatic.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.scss']
})
export class QuestionnaireListComponent {
  public loading : boolean = false;
  public questionnaires: any[] = [];
  public color: string = '';
  public filteredQuestionnaires: any[] = [];
  public categoryOptions = [
    {value: '', label: 'Todas'},
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'css', label: 'CSS' },
    { value: 'html', label: 'HTML' },
    { value: 'javascript', label: 'JavaScript' }
  ];
  
  public difficultyOptions = [
    {value: '', label: 'Todas'},
    {value: 'facil', label: 'Facil'},
    {value: 'medio', label: 'Medio'},
    {value: 'dificil', label: 'Dificil'}
    ];
  public filters = {
    name: '',
    category: '',
    difficulty: ''
  };

  applyFilters(): void {
    this.filteredQuestionnaires = this.questionnaires.filter(questionaire => {
      const matchesName = questionaire.cuestionario_nombre.toLowerCase().includes(this.filters.name.toLowerCase());
      const matchesCategory = this.filters.category === '' || questionaire.cuestionario_categoria === this.filters.category;
      const matchesDifficulty = this.filters.difficulty === '' || questionaire.cuestionario_dificultad === this.filters.difficulty;
      return matchesName && matchesCategory && matchesDifficulty;
    });  
  }

  constructor(private cuestionarioService: QuestionnaireService, private readonly modalService: NzModalService, private nzNotification: NzNotificationService){}

  ngOnInit(): void {
    this.getQuestionnaires();
  }

  getQuestionnaires(): void {
    this.loading = true;
    this.cuestionarioService.getAllCuestionarios().subscribe(
      (data) => {
        this.questionnaires = data;
        this.filteredQuestionnaires = [...this.questionnaires];
        this.loading = false;
        this.processColor();      
      },
      (error) => {
        this.loading = false;
      }
    );
   
  }

  processColor(){
    this.questionnaires.forEach(element => {
      switch(element.cuestionario_dificultad){
        case 'facil':
          element.color = 'green';
          break;
        case 'dificil':
          element.color = 'red';
          break;
        case 'medio':
          element.color = 'yellow';
          break;
        default:
          break;
      }
    });
  }

  setCategory(categoryName: string): string {
    let icon = '';
  
    switch (categoryName) {
      case 'cpp':
        icon = 'mdi mdi-language-cpp';
        break;
      case 'csharp':
        icon = 'mdi mdi-language-csharp';
        break;
      case 'css':
        icon = 'mdi mdi-language-css3';
        break;
      case 'html':
        icon = 'mdi mdi-language-html5';
        break;
      case 'java':
        icon = 'mdi mdi-language-java';
        break;
      case 'javascript':
        icon = 'mdi mdi-language-javascript';
        break;
      case 'kotlin':
        icon = 'mdi mdi-language-kotlin';
        break;
      case 'php':
        icon = 'mdi mdi-language-php';
        break;
      case 'python':
        icon = 'mdi mdi-language-python';
        break;
      case 'sql':
        icon = 'mdi mdi-database';
        break;
      case 'swift':
        icon = 'mdi mdi-language-swift';
        break;
      case 'typescript':
        icon = 'mdi mdi-language-typescript';
        break;
      default:
        icon = 'mdi mdi-help-circle'; // Ícono por defecto si no coincide con ninguna categoría
        break;
    }
  
    return icon;
  }

  createQuestionnaire(){
    const modalCreateQuestionnaire= this.modalService.create({
      nzContent: QuestionnaireCreateComponent,
      nzWidth: '650px',
      nzFooter: null,
      nzComponentParams: {},
    });

    modalCreateQuestionnaire.componentInstance?.confirm.subscribe(
      (confirm: any) => {
        if(confirm){
          this.getQuestionnaires();
        }
      }
    );
  }

  addQuestions(questionnaire:any){

    //Verificamos que el usuario este completo.
    if(questionnaire.cuestionario_completo){
      this.nzNotification.info('info','El cuestionario esta completo.');
    }else{
      const modalAddQuestions = this.modalService.create({
        nzContent: AddQuestionComponent,
        nzWidth: '400px',
        nzFooter: null,
        nzComponentParams: {
          data: questionnaire
        },
      });
  
      modalAddQuestions.componentInstance?.confirm.subscribe(
        (confirm: any) => {
          if(confirm){
            this.getQuestionnaires();
          }
        }
      );
    }
  }

  addQuestionsAutomatic(questionnaire:any){
    if(questionnaire.cuestionario_completo){
      this.nzNotification.info('info','El cuestionario esta completo.');
    }else{
      const modalAddQuestions = this.modalService.create({
        nzContent: AddQuestionAutomaticComponent,
        nzWidth: '400px',
        nzFooter: null,
        nzComponentParams: {
          data: questionnaire
        },
      });
  
      modalAddQuestions.componentInstance?.confirm.subscribe(
        (confirm: any) => {
          if(confirm){
            this.getQuestionnaires();
          }
        }
      );
    }
  }
}
