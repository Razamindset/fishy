import { Chess } from 'chess.js';

class ChessGame {
  constructor() {
    this.initGame();
  }

  initGame() {
    this.chess = new Chess();
    this.player_white_id = null;
    this.player_black_id = null;
    this.time_format = null;
    this.roomId = null;
    this.player_turn = 'white';
    this.white_time_left = null;
    this.black_time_left = null;
    this.move_history = [];
    this.members_count = 0;
  }

  joinGame(color, id) {
    if (color === 'white') {
      this.player_white_id = id;
    } else if (color === 'black') {
      this.player_black_id = id;
    }
    this.members_count++;
  }

  leaveGame(id) {
    // Implement logic to handle player leaving the game
    this.members_count--;
  }

  makeMove(move, userId) {
    //* Logic to validate and make the move
    // if (
    //   (this.player_turn === 'white' && userId === this.player_white_id) ||
    //   (this.player_turn === 'black' && userId === this.player_black_id)
    // ) {
    //   const result = this.chess.move(move);
    //   if (result) {
    //     this.move_history.push(result);
    //     this.player_turn = this.player_turn === 'white' ? 'black' : 'white';
    //     return result;
    //   }
    // }
    // return null;
  }

  getGameState() {
    return {
      fen: this.chess.fen(),
      player_turn: this.player_turn,
      white_time_left: this.white_time_left,
      black_time_left: this.black_time_left,
      move_history: this.move_history,
      members_count: this.members_count
    };
  }
}

export default ChessGame;