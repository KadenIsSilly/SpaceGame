/**
 * Create blank sprites
 */

let rocks: Sprite = null
let laser: Sprite = null
let spaceship: Sprite = null

// Set fire projectile on button A
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    laser = sprites.createProjectileFromSide(assets.image`laser`, 0, -100)
    laser.setPosition(spaceship.x, spaceship.y)
    laser.setKind(SpriteKind.Projectile)
})

// Player overlaps with enemy: -1 score and destroy rock
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, othersprite) {
    info.changeLifeBy(-1)
    othersprite.destroy(effects.spray, 100)
    music.powerDown.play()
})

// Projectile overlap with enemy will destroy
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, othersprite) {
    info.changeScoreBy(1)
    othersprite.destroy(effects.fire, 100)
    music.baDing.play()
    sprite.destroy()
})

// Set background colour to black
scene.setBackgroundColor(15)

// Move stars across screen
effects.starField.startScreenEffect()

// Create spaceship
spaceship = sprites.create(assets.image`rocket`, SpriteKind.Player)

// Let user move spaceship with arrow keys on x axis
controller.moveSprite(spaceship, 100, 0)

// Keep spaceship in screen
spaceship.setStayInScreen(true)

// Set spaceship position
spaceship.setPosition(80, 100)

// Set lives to 3
info.setLife(3)

// Set score to 0
info.setScore(0)

// Start countdown for 30 seconds
info.startCountdown(30)

// Set the rocks to fall
game.onUpdateInterval(500, function () {
    rocks = sprites.createProjectileFromSide(assets.image`rock`, 0, 70)
    // Set random position for rocks to fall
    rocks.setPosition(Math.randomRange(0, 160), 0)
    rocks.setKind(SpriteKind.Enemy)
})