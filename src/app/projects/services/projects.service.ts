import { Injectable } from '@angular/core';
import { Project } from '../projects/model/project';
import { delay, first, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private readonly API = 'api/projects';

  constructor(private httpClient: HttpClient) { }

  // metodo que vai retornar a lista de projetos
  list() {
    return this.httpClient.get<Project[]>(this.API)
    .pipe(
      first(),
      delay(10000),
      tap(projects => console.log(projects))
    );
  }
}
