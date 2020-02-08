import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TicketBookingModule } from "./ticket-booking/ticket-booking.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, TicketBookingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
