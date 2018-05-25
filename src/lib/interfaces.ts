export interface User{
  uid: string,
  email:string,
  displayName:string,
  profileImage: string,
  highscore:number;
}
export interface Game{
  gid: string,
  type: string,
  player1: string,
  player2: string,
  state: string,
  activePlayer: number;
}
export interface Move{
  move:number,
  player:number,
  x: number,
  y: number;
}
