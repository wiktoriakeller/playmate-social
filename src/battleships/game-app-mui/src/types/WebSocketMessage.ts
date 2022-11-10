export interface WebSocketMessage {
  id: string;
  type: string;
  data: number[] | string[];
}
