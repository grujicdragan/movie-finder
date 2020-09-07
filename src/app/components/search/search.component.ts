import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RestService } from '../../services/rest.service';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../../models/movie.model';
import { MovieDetails } from '../../models/movieDetails.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
})
export class SearchComponent implements OnInit {
  public movies: Movie[];
  public movieDetails: MovieDetails[];
  public fullArray = [];
  title = new FormControl('', [Validators.required]);
  year = new FormControl('');
  page: number = 1;
  totalPages: number;
  errMsg = '';

  getErrorMessageTitle() {
    if (this.title.hasError('required')) {
      return 'Enter any title (minimum 3 characters!)';
    } else {
      return '3 characters is minimum!';
    }
  }

  constructor(private service: RestService, private http: HttpClient) { }

  ngOnInit() { }

  getMovieByTitle() {
    this.fullArray = [];
    this.errMsg = '';
    document.getElementById('buttons').style.display = 'flex';

    this.service
      .getMovies(this.title.value, this.year.value, this.page)
      .subscribe((data) => {
        this.movies = data;
        for (let i in this.movies) {
          let res = this.movies[i];
          let totalP = this.movies[i];
          let movie = this.movies[i]['Search'];
          if (res.Response === 'False') {
            this.errMsg = res.Error;
            document.getElementById('buttons').style.display = 'none';
          }
          this.totalPages = Math.round(Number(totalP.totalResults) / 10);
          if (this.totalPages < 1) {
            this.totalPages = 1;
          }
          for (let j in movie) {
            let id = movie[j];
            this.service.getMovie(id.imdbID).subscribe((data) => {
              this.movieDetails = data;
              this.fullArray.push(data);
            });
          }
        }
      }
      );
  }

  prev() {
    this.page--;
    this.fullArray = [];

    if (this.page < 1) {
      this.page = 1;
    }
    this.service.getMovies(this.title.value, this.year.value, this.page).subscribe((data) => {
      this.movies = data;
      for (let i in this.movies) {
        let movie = this.movies[i]['Search'];
        for (let j in movie) {
          let id = movie[j];
          this.service.getMovie(id.imdbID).subscribe((data) => {
            this.movieDetails = data;
            this.fullArray.push(data);
          });
        }
      }
    });
  }

  next() {
    this.page++;
    this.fullArray = [];

    this.service.getMovies(this.title.value, this.year.value, this.page).subscribe((data) => {
      this.movies = data;
      for (let i in this.movies) {
        let movie = this.movies[i]['Search'];
        for (let j in movie) {
          let id = movie[j];
          this.service.getMovie(id.imdbID).subscribe((data) => {
            this.movieDetails = data;
            this.fullArray.push(data);
          });
        }
      }
    });
  }
}
