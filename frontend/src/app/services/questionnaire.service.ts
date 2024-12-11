import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfiguration } from '../config/api.configuration';
import { ApiProvider } from './api/api';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService extends ApiProvider{

  constructor(http: HttpClient , apiConfig: ApiConfiguration ) {
    super(http, apiConfig);
  }

  // Método para obtener los cuestionarios
  getAllCuestionarios(): Observable<any> {
    return this.http.get(this.apiUrl + 'cuestionarios/GetAllCuestionario.php');
  }

  getCuestionarioById(id: number | null): Observable<any> {
    return this.http.get(this.apiUrl + 'cuestionarios/GetCuestionario.php?id=' + id);
  }

  // Método para obtener los puntajes
  getAllScores(): Observable<any> {
    return this.http.get(this.apiUrl + 'puntuaciones/GetAllPuntuaciones.php');
  }

  postGame(payload: any) {
    const formData = new FormData();
    formData.append('idUsuario', payload.idUsuario);
    formData.append('idCuestionario', payload.idCuestionario);
    formData.append('puntaje', payload.puntaje);
    formData.append('tiempo', payload.tiempo);
    formData.append('fecha', payload.fecha);
  
    return this.http.post(this.apiUrl + 'puntuaciones/AddPuntuacion.php', formData);
  }

  postQuestionnaire(payload: any) {
    const formData = new FormData();
    formData.append('fecha', payload.fecha);
    formData.append('categoria', payload.categoria);
    formData.append('dificultad', payload.dificultad);
    formData.append('cantPreguntas', payload.cantPreguntas);
    formData.append('nombre', payload.nombre);
  
    return this.http.post(this.apiUrl + 'cuestionarios/AddCuestionario.php', formData);
  }

  crearQuestionnaire(payload: any) {
    return this.http.post(this.apiUrl + 'cuestionarios/CrearCuestionario.php', payload);
  }

  /*getQuestionnaireData(cantidadPreguntas: string): Observable<any> {
    return this.http.get(`http://ec2-54-166-40-215.compute-1.amazonaws.com:5000/api/categories/javascript?level=facil&limit=${cantidadPreguntas}`);
  }*/
    
  getQuestionnaireData(cantidadPreguntas: string): Observable<any> {
    return this.http.get(`${this.apiLocal}${cantidadPreguntas}`);
  }

  getQuestionnaireDataTest(cantidadPreguntas: string , category : string): Observable<any> {
    return this.http.get(`${this.apiDesa}&limit=${cantidadPreguntas}&category=${category}`);
  }
    
}
