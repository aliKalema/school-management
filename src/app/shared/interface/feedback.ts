export interface Feedback {
  class: string;
  messages: Message[]
}

export interface Message{
  dateTime: string;
  message: string
}
