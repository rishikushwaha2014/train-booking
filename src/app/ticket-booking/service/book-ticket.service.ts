import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class BookTicketService {
  constructor(private http: HttpClient) {}
}
