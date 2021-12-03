export interface ApiError {
  data:{
    message: string;
    error: string;
    status: number;
  }
}