document.addEventListener("DOMContentLoaded", function() {
    const gameArea = document.getElementById('gameArea');
    const basket = document.getElementById('basket');
    const scoreDisplay = document.getElementById('score');
    let score = 0;
    let basketLeft = 50;

    // Control the basket
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft' && basketLeft > 0) {
            basketLeft -= 5;
        } else if (event.key === 'ArrowRight' && basketLeft < 100) {
            basketLeft += 5;
        }
        basket.style.left = basketLeft + '%';
    });

    // Generate falling items
    function createItem() {
        const item = document.createElement('div');
        item.classList.add('item');
        item.style.left = Math.random() * 100 + '%';
        gameArea.appendChild(item);

        // Move the item
        let itemTop = -30;
        const itemFallInterval = setInterval(function() {
            itemTop += 5;
            item.style.top = itemTop + 'px';

            // Check for collision with the basket
            const itemRect = item.getBoundingClientRect();
            const basketRect = basket.getBoundingClientRect();

            if (itemRect.top > window.innerHeight) {
                clearInterval(itemFallInterval);
                gameArea.removeChild(item);
            } else if (
                itemRect.bottom >= basketRect.top &&
                itemRect.right >= basketRect.left &&
                itemRect.left <= basketRect.right
            ) {
                clearInterval(itemFallInterval);
                gameArea.removeChild(item);
                score++;
                scoreDisplay.textContent = 'Score: ' + score;
            }
        }, 50);
    }

    // Create items at intervals
    setInterval(createItem, 2000);
});
