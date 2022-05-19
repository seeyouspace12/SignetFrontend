import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {FilmList, GetFilmsParams} from "../../shared/models/films";

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(
    private http: HttpClient
  ) {}

  public getFilms(params?: GetFilmsParams): Observable<FilmList>{
    const queryParams = new HttpParams({fromObject: GetFilmsParams.serialize(params)});
    return this.http.get<FilmList>(`${environment.apiUrl}/films`, {params: queryParams})
  }
}
