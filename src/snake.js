import {store, storeR} from 'rstore';
import Rx from 'rxjs';
import * as reducers from './reducers';
import _ from './util';
import {getDirection, isDirectionKey} from './keyboard';
import CanvasGraphics from './graphics';

const graphics = new CanvasGraphics();
graphics.drawGrid();

const speedSubject = new Rx.BehaviorSubject(500);
const keydownObservable = 
    Rx.Observable
        .fromEvent(document, 'keydown');

const direction$ = 
    keydownObservable
        .map (e => e.which)
        .filter(isDirectionKey)
        .map(code => ({
            direction: getDirection(code)
        }));

// const refresh$ = 
//     speedSubject
//         .combineLatest(
//             Rx.Observable.merge(
//                 speedSubject, 
//                 direction$
//             ),
//             s => s
//         )
//         .switchMap((s) => Rx.Observable.of(null).concat(Rx.Observable.interval(s)));

// const refresh$ = 
//     speedSubject
//         .combineLatest(direction$, s => s)
//         .switchMap((s) => Rx.Observable.of(null).concat(Rx.Observable.interval(s)));

const refresh$ = 
    speedSubject
        .combineLatest(direction$, s => s)
        .switchMap((s) => Rx.Observable.interval(s).startWith(null));

refresh$.subscribe(x => {
    console.log(x);
})

// const initialDirection = _.randomDirection();
// const initialSnake = _.initSnake(initialDirection);
// const initialApple = _.generateApple(initialSnake);

// const initialState = {
//     direction: initialDirection,
//     snake: initialSnake,
//     apple: initialApple,
//     lastKey: 0
// };

// const rxStore = storeR(initialState)
//     .plug(
//         direction$, reducers.direction,
//         refresh$, reducers.refresh
//     )
//     .subscribe(state => {
//         graphics.clear();
//         graphics.drawSnake(state.snake);
//         graphics.drawApple(state.apple);
//     });

// rxStore.toRx(Rx)
//     .map(state => state.snake.length)
//     .filter(len => len % 5 === 0)
//     .distinct()
//     .subscribe(len => {
//         speedSubject.next(500 - len * 2);
//     });