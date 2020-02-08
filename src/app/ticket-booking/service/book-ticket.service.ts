import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class BookTicketService {
  constructor(private http: HttpClient) {}

  public get(): Observable<HttpResponse<any>> {
    return this.http.get<any>("/get/seats", { headers: null });
  }
}

// @Injectable()
// export class BusTicketService {
// constructor(private http: HttpClient){}

// public get(): Observable<HttpResponse<any>> {
//  return this.http.get<any>(
// '/get/seats', {headers: null}
// );

// }
// }
