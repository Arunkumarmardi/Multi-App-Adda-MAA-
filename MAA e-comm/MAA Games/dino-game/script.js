document.addEventListener('DOMContentLoaded', () => {
    const dino = document.getElementById('dino');
    const obstacle = document.getElementById('obstacle');
    const scoreDisplay = document.getElementById('score');

    let isJumping = false;
    let score = 0;
    let gameInterval;
    let obstacleInterval;

    function startGame() {
        gameInterval = setInterval(() => {
            const dinoRect = dino.getBoundingClientRect();
            const obstacleRect = obstacle.getBoundingClientRect();

            if (isJumping) {
                dino.style.bottom = '90px';
            } else {
                dino.style.bottom = '20px';
            }

            if (obstacleRect.left < 0) {
                obstacle.style.right = '100%';
                score++;
                scoreDisplay.innerText = `Score: ${score}`;
            } else if (obstacleRect.left < dinoRect.right && obstacleRect.right > dinoRect.left &&
                       obstacleRect.top < dinoRect.bottom && obstacleRect.bottom > dinoRect.top) {
                clearInterval(gameInterval);
                clearInterval(obstacleInterval);
                alert('Game Over! Your score: ' + score);
            }
            
              // for slowing or fast the obstacle
            obstacle.style.right = `${parseInt(obstacle.style.right) + 5}px`;

        }, 5);

        obstacleInterval = setInterval(() => {
            obstacle.style.right = '0px';
        }, 4500);
    }

    function jump() {
        if (!isJumping) {
            isJumping = true;
            setTimeout(() => {
                isJumping = false;
            }, 400);
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            jump();
        }
    });

    startGame();
});
