import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FilmsService} from "../core/services/films.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Film, GetFilmsParams} from "../shared/models/films";
import {BehaviorSubject, take} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit, AfterViewInit {

  constructor(
    private filmsService: FilmsService,
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  pageSizeOptions = [5, 10, 20];
  displayedColumns: string[] = ['name', 'genre', 'leadStudio', 'audienceScore', 'profitability', 'rottenTomatoes', 'worldwideGross', 'year'];
  dataSource: MatTableDataSource<Film>;
  ELEMENT_DATA: Film[];
  $total = new BehaviorSubject(0)
  total: number;

  form: FormGroup;

  requestParams: GetFilmsParams = {
    page: 1, perPage: this.pageSizeOptions[0]
  }


  public updateFilms(params?: GetFilmsParams) {
    this.filmsService.getFilms(params).pipe(take(1)).subscribe(res => {
      this.ELEMENT_DATA = res.data;
      this.dataSource = new MatTableDataSource<Film>(this.ELEMENT_DATA);
    });
  }

  public sort($event) {
    this.requestParams.sort = {[$event.active]: $event.direction};
    this.updateFilms(this.requestParams);
  }

  private initForm() {
    this.form = new FormGroup({
      search: new FormControl(''),
      filterGenre: new FormControl(''),
      filterYear: new FormControl([])
    });
  }

  public submit() {
    const formValue = this.form.getRawValue();
    if (formValue.search) {
      this.requestParams.search = {name: formValue.search};
    }
    this.requestParams.filters = {
      ...this.requestParams.filters,
      genre: formValue.filterGenre ? formValue.filterGenre : undefined,
      year: formValue.filterYear ? formValue.filterYear : undefined
    };
    this.updateFilms(this.requestParams);
  }

  setYear($event) {
    this.form.patchValue({filterYear: $event.value});
  }


  ngOnInit(): void {
    this.initForm();
    this.filmsService.getFilms(this.requestParams).pipe(take(1)).subscribe(res => {
      this.ELEMENT_DATA = res.data;
      this.dataSource = new MatTableDataSource<Film>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.total = res.meta.total;
    });
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(paginator => {
      this.requestParams.page = paginator.pageIndex;
      this.requestParams.perPage = paginator.pageSize;
      this.updateFilms(this.requestParams)
    });
  }

}
