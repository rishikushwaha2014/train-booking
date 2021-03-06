import { Component, OnInit } from "@angular/core";
import { mockResponse } from "./book-system-response";
import {
  BookTicketResponseModel,
  TrainSeatInfoModel
} from "../model/book-ticket.model";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { BookTicketService } from "../service/book-ticket.service";
@Component({
  selector: "app-book-ticket",
  templateUrl: "./book-ticket.component.html",
  styleUrls: ["./book-ticket.component.css"]
})
export class BookTicketComponent implements OnInit {
  public bookingInfo: BookTicketResponseModel;
  public bookingForm: FormGroup;
  public availablseats: TrainSeatInfoModel[] = [];
  public flag: boolean = true;
  public error: string;
  public res: any;

  constructor(private fb: FormBuilder) {
    this.initateForm();
  }

  public ngOnInit(): void {
    this.bookingInfo = mockResponse;
    this.availablseats = this.getAvailablseats();
  }

  public onSubmit(formValues: FormGroup): void {
    const userName: string = formValues.controls.name.value;
    const requiredSeats: number = parseInt(formValues.controls["count"].value);
    if (requiredSeats > this.availablseats.length) {
      this.error = "required seats not available";
    } else if (requiredSeats > 7) {
      this.error = "Maximum 7 seats can be booked at a time";
    } else if (requiredSeats > 0) {
      this.checkInCategorys(userName, requiredSeats);
    }
  }

  public openBookingForm(): void {
    this.bookingForm.setValue({
      name: "",
      count: ""
    });
    this.flag = true;
    this.error = "";
  }

  // get all available seats
  private getAvailablseats(): TrainSeatInfoModel[] {
    let availablseats: TrainSeatInfoModel[] = [];
    this.bookingInfo.seats.forEach(seat => {
      if (seat.status === "available") {
        availablseats.push(seat);
      }
    });
    return availablseats;
  }

  // category2 is last rows which has 3 seats
  // category3 is all rows

  private checkInCategorys(name: string, count: number): void {
    let category2: TrainSeatInfoModel[] = [];
    let category3: TrainSeatInfoModel[] = [];
    category3 = this.checkInCategory(count, 3);
    if (category3.length !== 0) {
      this.bookSeat(category3, name);
    } else {
      category2 = this.checkInCategory(count, 2);
      if (category2.length !== 0) {
        this.bookSeat(category2, name);
      }
    }
  }

  // seat book function
  private bookSeat(bookseats: TrainSeatInfoModel[], name: string): void {
    bookseats.forEach(seat => {
      const index: number = this.bookingInfo.seats.findIndex(
        data => data.seatNo === seat.seatNo
      );
      this.bookingInfo.seats[index].status = "booked";
      this.bookingInfo.seats[index].bookedBy = name;
    });

    this.availablseats = this.getAvailablseats();

    this.flag = false;
  }

  // check category and reserve seat
  private checkInCategory(
    count: number,
    category: number
  ): TrainSeatInfoModel[] {
    let bookseats: TrainSeatInfoModel[] = [];
    this.availablseats.forEach(seat => {
      if (bookseats.length < count) {
        if (seat.category === category) {
          bookseats.push(seat);
        }
        if (bookseats.length === count && count > 1) {
          bookseats = this.chekIfSameRow(bookseats);
        }
      }
    });
    if (bookseats.length === count) {
      return bookseats;
    } else {
      return [];
    }
  }

  // it checks booking seat is in same row or not
  private chekIfSameRow(bookseats: TrainSeatInfoModel[]): TrainSeatInfoModel[] {
    let row: number[] = [];
    bookseats.forEach(seat => {
      row.push(seat.row);
    });
    if (Array.from(new Set(row)).length === 1) {
      return bookseats;
    } else {
      const removeIndex = bookseats.splice(-1, 1);

      return removeIndex;
    }
  }

  private initateForm(): void {
    this.bookingForm = this.fb.group({
      name: ["", Validators.required],
      count: ["", Validators.required]
    });
  }
}
