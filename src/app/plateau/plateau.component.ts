import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Board_RO, C, Turn, TileCoords} from '../ReversiDefinitions';

@Component({
  selector: 'app-plateau[board][playable][turn]', // selecteur css
  templateUrl: './plateau.component.html',
  styleUrls: ['./plateau.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlateauComponent {
  @Input() board!: Board_RO;
  @Input() turn: Turn = "Player1";
  @Input() playable!: boolean[][];

  @Output() play = new EventEmitter<TileCoords>();

  PLAY(c: TileCoords): void{
    this.play.emit(c);
  }

  trackByIndex(i: number): number {
    return i;
  }
  

}
