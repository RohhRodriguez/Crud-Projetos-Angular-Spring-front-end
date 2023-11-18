import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatTableModule } from '@angular/material/table';
// import {MatCardModule} from '@angular/material/card';
// import { MatToolbarModule } from '@angular/material/toolbar';
import { ProjectsService } from '../services/projects.service';
import { Project } from './model/project';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-projects',
  // standalone: true,
  // imports: [CommonModule, MatTableModule, MatCardModule, MatToolbarModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects$: Observable<Project[]>;
  displayedColumns = ['_id', 'name', 'category']; // para a classe html conseguir interar as colunas da table
  // injeção de dependências
  constructor(
    private projectsService: ProjectsService,
    public dialog: MatDialog
    ) {
    this.projects$ = this.projectsService.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar lista de projetos! Tente novamente.')
        return of([]) // cria um Onservable que retorna um array vazio para nao dar erro
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent,{
      data: errorMsg
    })
  }

}
