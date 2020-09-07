import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
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
        environment.apiURL + '?s=' + ttl + environment.apiKey + '&y=' + year + '&page=' + page
      )
      .pipe(toArray<Movie>());
  }

  getMovie(id: string) {
    return this.http.get(environment.apiURL + '?i=' + id + environment.apiKey).pipe(toArray<MovieDetails>());;
  }
}
