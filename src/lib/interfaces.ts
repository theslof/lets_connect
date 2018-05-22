export interface TextInterface{
  text:string;
}
export interface User{
  uid: string,
  email:string,
  displayName:string,
  profileImage: string,
  highscore:number;
}
export interface Game{
  type: string,
  player1: string,
  player2: string,
  state: string,
  activePlayer: number;
}
export interface Moves{
  move:number,
  player:number,
  x: number,
  y: number;
}
