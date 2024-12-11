import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { QuestionnaireService } from '../../../../services/questionnaire.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit{

  public loading : boolean = false;
  public scores: any[] = [];
  public color: string = '';
  public filteredScores: any[] = [];
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

  constructor(private cuestionarioService: QuestionnaireService){}

  ngOnInit(): void {
    this.getQuestionnaires();
  }

  getQuestionnaires(): void {
    this.loading = true;
    this.cuestionarioService.getAllScores().subscribe(
      (data) => {
        this.scores = data;
        this.filteredScores = [...this.scores];
        this.loading = false;
        this.processColor();
      },
      (error) => {
        this.loading = false;
      }
    );
   
  }

  processColor(){
    this.scores.forEach(element => {
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

  applyFilters(): void {
    this.filteredScores = this.scores.filter(score => {
      const matchesName = score.cuestionario_nombre.toLowerCase().includes(this.filters.name.toLowerCase());
      const matchesCategory = this.filters.category === '' || score.cuestionario_categoria === this.filters.category;
      const matchesDifficulty = this.filters.difficulty === '' || score.cuestionario_dificultad === this.filters.difficulty;
      return matchesName && matchesCategory && matchesDifficulty;
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
  

}
