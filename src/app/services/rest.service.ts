import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie.model';
import { toArray } from 'rxjs/operators';
import { MovieDetails } from '../models/movieDetails.model';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient) { }

  getMovies(ttl: string, year: string, page: number) {
    return this.http
      .get<Movie>(
        'https://www.omdbapi.com/' + '?s=' + ttl + '&apikey=71771be9' + '&y=' + year + '&page=' + page
      )
      .pipe(toArray<Movie>());
  }

  getMovie(id: string) {
    return this.http.get('https://www.omdbapi.com/' + '?i=' + id + '&apikey=71771be9').pipe(toArray<MovieDetails>());;
  }
}
