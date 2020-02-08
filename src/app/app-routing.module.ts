import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BookTicketComponent } from "./ticket-booking/book-ticket/book-ticket.component";

const routes: Routes = [
  {
    path: "book",
    component: BookTicketComponent
  },

  { path: "", redirectTo: "book", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
