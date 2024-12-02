export interface IFormInputs {
  bookName: string;
  bookAuthor: string;
  bookPages: string;
  bookPrice: string;
}

export interface ReceivedBookData {
  id: string;
  bookName: string;
  bookAuthor: string;
  bookPages: string;
  bookPrice: string;
  bookAvailability: string;
  statusButton: string;
}

export interface IssueButtonData {
  bookAvailability: string;
  statusButton: string;
}
