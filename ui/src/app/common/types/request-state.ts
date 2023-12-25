export enum RequestStatus {
  InProgress,
  OK,
  Error
}

export interface RequestState {
  status?: RequestStatus,
  msg?: string
}
