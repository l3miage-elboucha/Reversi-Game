import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReversiGameEngineService } from './reversi-game-engine.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(public RGS: ReversiGameEngineService) {}

}
