import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { succinctAi } from './aiType';

@Injectable({
  providedIn: 'root'
})
export class APIClientService {

  allAi: BehaviorSubject<succinctAi[]> = new BehaviorSubject<succinctAi[]>([]);
  // TODO: Find all anys
  public sharedAllAi: Observable<succinctAi[]> = this.allAi.asObservable();
  chosen = 1;

  constructor(private api: HttpClient) {
    this.getAllAi();
  }


  getAiMove(board: string, id:number) {
    return this.api.post<string>(`https://tacticsmellytoes.fly.dev/ai/move`, JSON.stringify({board, id}), {
      withCredentials: true,
      headers: {'Content-Type': 'application/json'}
    })
  }

  getRandomMove(board: string) {
    return this.api.post<string>(`https://tacticsmellytoes.fly.dev/ai/randommove`, JSON.stringify({board}), {
      withCredentials: true,
      headers: {'Content-Type': 'application/json'}
    })
  }

  getPerfectMove(board: string, toPlay: 'X' | 'O') {
    return this.api.post<string>(`https://tacticsmellytoes.fly.dev/ai/perfectmove`, JSON.stringify({board, toPlay}), {
      withCredentials: true,
      headers: {'Content-Type': 'application/json'}
    })
  }

  sendMatch(matchMoves: ((number | string)[])[], result: 'win'|'draw'|'lose', id:number) {
    return this.api.post<any>(`https://tacticsmellytoes.fly.dev/ai/train`, JSON.stringify({
      match: {
        result,
        matchMoves
      },
      id
    }), {
      withCredentials: true,
      headers: {'Content-Type': 'application/json'}
    })
  }

  getAllAi() {
    this.api.get<succinctAi[]>('https://tacticsmellytoes.fly.dev/ai/getAllAi', {
      withCredentials: true
    }).subscribe({
      next: data => {
        this.allAi.next(data);
        if (data.length) this.chosen = (data[0] as any).id
      },
      error: error => console.log(error)
    })
  }

  getAi(id:number) {
    return this.api.post('https://tacticsmellytoes.fly.dev/ai/get', JSON.stringify({id: id}), {
      withCredentials: true,
      headers: {'Content-Type': 'application/json'}
    });
  }

  createAi(ai: {name:string, win:number, lose:number, draw:number, color:string}) {
    return this.api.post('https://tacticsmellytoes.fly.dev/ai/create', JSON.stringify(ai), {
      withCredentials: true,
      headers: {'Content-Type': 'application/json'}
    });
  }
  deleteAi(ai:{id:number}){
    return this.api.post('https://tacticsmellytoes.fly.dev/ai/delete', JSON.stringify(ai), {
      withCredentials: true,
      headers: {'Content-Type': 'application/json'}
    });
  }
  updateAi(ai: {name:string, win:number, lose:number, draw:number, color:string, id:number}) {
    return this.api.post('https://tacticsmellytoes.fly.dev/ai/edit', JSON.stringify(ai), {
      withCredentials: true,
      headers: {'Content-Type': 'application/json'}
    });
  }

}
