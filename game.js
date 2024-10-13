let level = 1;
let bulletSpeed = 5;

const soldier = document.getElementById('soldier');
const bloodEffect = document.createElement('div');
bloodEffect.id = 'bloodEffect';
document.getElementById('gameArea').appendChild(bloodEffect);

const gameOverMessage = document.createElement('div');
gameOverMessage.id = 'gameOverMessage';
gameOverMessage.innerHTML = "İlaydam sağ olsun!";
document.getElementById('gameArea').appendChild(gameOverMessage);

// Askeri fareyle hareket ettirme
document.addEventListener('click', function(event) {
    soldier.style.left = event.clientX - 20 + 'px';
    soldier.style.top = event.clientY - 20 + 'px';
});

// Mermi oluşturma fonksiyonu
function createBullet() {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.left = Math.random() * window.innerWidth + 'px';
    bullet.style.top = '0px';
    document.getElementById('gameArea').appendChild(bullet);

    let bulletInterval = setInterval(() => {
        let bulletTop = parseInt(bullet.style.top.replace('px', ''));
        bullet.style.top = bulletTop + bulletSpeed + 'px'; // Mermilerin hızı seviyeye göre değişir

        if (bulletTop > window.innerHeight) {
            bullet.remove();
            clearInterval(bulletInterval);
        }

        checkCollision(bullet, bulletInterval);
    }, 20);
}

// Çarpışma kontrolü
function checkCollision(bullet, bulletInterval) {
    const soldierRect = soldier.getBoundingClientRect();
    const bulletRect = bullet.getBoundingClientRect();

    if (
        bulletRect.left < soldierRect.right &&
        bulletRect.right > soldierRect.left &&
        bulletRect.top < soldierRect.bottom &&
        bulletRect.bottom > soldierRect.top
    ) {
        clearInterval(bulletInterval);
        gameOver(bullet);
    }
}

// Oyun kaybedildiğinde kan ve mesaj göster
function gameOver(bullet) {
    bloodEffect.style.left = soldier.style.left;
    bloodEffect.style.top = soldier.style.top;
    bloodEffect.style.display = 'block';
    
    gameOverMessage.style.display = 'block';

    setTimeout(() => {
        window.location.reload();
    }, 3000); // 3 saniye sonra oyunu yeniden başlat
}

// Seviyeler arasında geçiş yapma
function levelUp() {
    level++;
    if (level === 2) {
        bulletSpeed = 7;
    } else if (level === 3) {
        bulletSpeed = 10;
    }
    if (level <= 3) {
        setTimeout(levelUp, 10000); // Her 10 saniyede bir seviye atla
    }
}

// İlk başta mermiler yavaş
setInterval(function() {
    for (let i = 0; i < 5; i++) { // Aynı anda 5 mermi oluştur
        createBullet();
    }
}, 300); // Her 0.3 saniyede bir 5 mermi oluştur


setTimeout(levelUp, 10000); // 10 saniye sonra 2. seviye başlar
