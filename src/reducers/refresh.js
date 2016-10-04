import _ from '../util';

const refreshReducer = (state, action) => {
    let snake = state.snake.slice(0),
        head = snake[0].slice(0),
        apple = state.apple;

    head[0] = Math.abs((30 + head[0] + state.direction[0]) % 30);
    head[1] = Math.abs((30 + head[1] + state.direction[1]) % 30); 
    snake.unshift(head);

    if (!_.cellsEqual(head, apple)) {
        snake.pop();
    } else {
        state.apple = _.generateApple(snake);
    }
    
    state.snake = snake;

    return state;
}

export default refreshReducer;