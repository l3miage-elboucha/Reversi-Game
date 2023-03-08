import { ChangeDetectionStrategy, Component, PLATFORM_ID } from '@angular/core';
import { ReversiGameEngineService } from './reversi-game-engine.service';
import { BoardtoString, C, GameState, TileCoords } from './ReversiDefinitions';
import { Observable, map, scan } from 'rxjs';


interface ETAT {
  gs: GameState; // '?' means the attribute is optional and can be undefined
  strBoard : String;
  Lplay : TileCoords[];
  canPlayHere : boolean[][];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {

  // gs?: GameState; // '?' means the attribute is optional and can be undefined
  // strBoard : String = "";
  // Lplay : TileCoords[] = [];
  // canPlayHere : boolean[][] = [];

  etat: Observable<ETAT>;
  historique: Observable<ETAT[]>;

  constructor(public RGS: ReversiGameEngineService) {
    this.etat = RGS.gameStateObs.pipe(
      map( gs => {
        const Lplay = [...RGS.whereCanPlay()] // contains cases that you can play
        const canPlayHere = gs.board.map(
          L => L.map( () => false ) // () -> element
        )
        for (const [i, j] of Lplay){
          // EITHER const [i, j] = coord;
          /* EITHER const i = coord[0]
                     const j = coord[1] */
  
          canPlayHere[i][j] = true;
        }
        return {
          gs, // equivalent to gs: gs
          strBoard: BoardtoString(gs.board),
          Lplay, // equivalent to Lplay: Lplay
          canPlayHere
        };
      })
    )

    this.historique = this.etat.pipe(
      scan( (L, gs) => [gs, ...L], [] as ETAT[] ),
      map( (L: readonly ETAT[]) => {
          const NL = [...L];
          NL.shift();
          return NL;
      })
    )
    
    }

    
    

  playHere( coup : TileCoords ) : void {

    this.RGS.play( ...coup );

  }

  caseToString(c: C) : string {
    switch(c){
      case 'Empty' : return ''
      case 'Player1' : return 'X'
      case 'Player2' : return 'O'
    }
  }

}

