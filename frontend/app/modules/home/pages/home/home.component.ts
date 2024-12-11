import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { Router } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ComponentsConfig } from '../../../../components.config';
import config from '../../../../config/config';
import { AccountService } from '../../../../services/account.service';
import { QuestionnaireService } from '../../../../services/questionnaire.service';
import { ICards } from '../../home.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  public version = config.version;
  public cuestionarios: any[] = [];
  public currentDate: Date = new Date;
  public currentMonth: number = 0;
  public currentMonthString: string = '';
  public currentYear: number = 0;
  public loading : boolean = false;
  public user: any;
  public cards: ICards[] = [];

  public categoryOptions = [
    { value: '', label: 'Todas' },
    { value: 'C++', label: 'C++' },
    { value: 'css', label: 'CSS' },
    { value: 'html', label: 'HTML' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'C#', label: 'C#' },
  ];
  
  public selectedCategory: string = '';
  public filteredCards: ICards[] = [];

  constructor(private router: Router, private accountService: AccountService , private cuestionarioService: QuestionnaireService) {}

  ngOnInit(): void {
    this.currentMonth = this.currentDate.getMonth() + 1; 
    this.currentMonthString = Intl.DateTimeFormat('es-ES', { month: 'long' }).format(this.currentDate);; 
    this.currentYear = this.currentDate.getFullYear();
    this.user = JSON.parse(this.accountService.getSessionUser()!);
    this.getQuestionnaires();
  }

  getQuestionnaires(): void {
    this.loading = true;
    this.cuestionarioService.getAllCuestionarios().subscribe(
      (data) => {
        this.cuestionarios = data;
        this.generateCardsData();
        this.filterCards(); 
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  filterCards(): void {
    if (this.selectedCategory) {
      this.filteredCards = this.cards.filter(
        (card) => card.title.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    } else {
      this.filteredCards = [...this.cards]; // Mostrar todas las tarjetas
    }

    console.log(this.selectedCategory , this.filteredCards);
    
}

  generateCardsData() {
    this.cuestionarios.forEach((cuestionario, index) => {
      if (cuestionario.cuestionario_completo) {
        // Corrección de nombres de categorías
        let categoriaCorregida = cuestionario.cuestionario_categoria;
        switch (cuestionario.cuestionario_categoria) {
          case 'csharp':
            categoriaCorregida = 'C#';
            break;
          case 'cpp':
            categoriaCorregida = 'C++';
            break;
          default:
            break;
        }
  
        let card: ICards = {
          id: cuestionario.cuestionario_id,
          number: `--i:${index + 1}`,
          color: '',
          difficulty: cuestionario.cuestionario_dificultad.toUpperCase(),
          icon: 'mdi mdi-file card-icon',
          title: categoriaCorregida,
          subTitle: `Cuestionario número: ${cuestionario.cuestionario_id}`,
        };
  
        // Asignación de color según dificultad
        switch (cuestionario.cuestionario_dificultad) {
          case 'facil':
            card.color = 'success';
            break;
          case 'dificil':
            card.color = 'error';
            break;
          case 'medio':
            card.color = 'warning';
            break;
          default:
            break;
        }
  
        this.cards.push(card);
      }
    });
  }
  

  viewQuestionnaire(questionnaireId: number){
    this.router.navigate(['/main/questionnaire', questionnaireId]);
  }

}
