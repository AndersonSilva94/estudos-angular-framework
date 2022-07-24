import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { delay, take } from 'rxjs';

export class CrudService<T extends{id?: number}> {

  constructor(
    protected http: HttpClient,
    @Inject(String) private API_URL: string
  ) {}

  list() {
    return this.http.get<T[]>(this.API_URL)
      .pipe(
        delay(2000)
      );
  }

  loadById(id: number) {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  private create(record: any) {
    return this.http.post(this.API_URL, record).pipe(take(1));
  }

  private update(record: any) {
    return this.http.put(`${this.API_URL}/${record.id}`, record).pipe(take(1));
  }

  save(record: any) {
    if(record.id) {
      return this.update(record);
    }
    return this.create(record);
  }

  remove(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }
}
