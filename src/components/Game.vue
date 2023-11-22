<template>
  <div class="simon-game">
    <div class="title-container">
      <h1>Simon Says</h1>
    </div>
    <div class="wrapper">
      <!-- Устройство для игры -->
      <div class="interface-container">
        <div class="interface">
          <div class="square blue" @click="handleClick(0)"></div>
          <div class="square coral" @click="handleClick(1)"></div>
          <div class="square yellow" @click="handleClick(2)"></div>
          <div class="square green" @click="handleClick(3)"></div>
        </div>
      </div>
      <!-- Панель управления -->
      <div class="controls-container">
        <div class="main-controls">
          <div class="round-container">
            <div class="round-counter">Round: {{ round }}</div>
          </div>
          <div class="start-button-container">
            <button @click="startGame">Start</button>
          </div>
          <div class="game-over-message">
            <p v-if="isGameOver">Sorry, you lost after {{ round }} rounds!</p>
          </div>
        </div>

        <div class="settings-container">
          <div class="difficulty-levels">
            <div class="option-container">
              <label class="option-container-title">Difficulty level:</label>
            </div>

            <div class="option-container">
              <input
                type="radio"
                id="easy"
                name="difficulty"
                value="Easy"
                v-model="selectedDifficulty"
              />
              <label for="easy">Easy</label>
            </div>

            <div class="option-container">
              <input
                type="radio"
                id="medium"
                name="difficulty"
                value="Medium"
                v-model="selectedDifficulty"
              />
              <label for="medium">Medium</label>
            </div>

            <div class="option-container">
              <input
                type="radio"
                id="hard"
                name="difficulty"
                value="Hard"
                v-model="selectedDifficulty"
              />
              <label for="hard">Hard</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Game',
  data() {
    return {
      round: 1,
      selectedDifficulty: 'Easy',
      generatedSubsequence: [],
      userSubsequence: [],
      soundFiles: [
        '/sounds/1.mp3',
        '/sounds/2.mp3',
        '/sounds/3.mp3',
        '/sounds/4.mp3',
      ],
      isGameOver: false,
      canUserClick: false,
    }
  },
  methods: {
    // Начать игру
    startGame() {
      this.playSound(this.soundFiles[0], 'unlock')
      this.isGameOver = false
      this.round = 1
      this.generatedSubsequence = []
      this.userSubsequence = []

      setTimeout(() => {
        this.playRound()
      }, this.difficultyTime)
    },
    // Обработчик нажатия на квадрат
    async handleClick(index) {
      if (this.canUserClick) {
        this.userSubsequence.push(index)
        this.playSound(this.soundFiles[index])

        if (this.checkUserSequence()) {
          // Если пользователь ввел всю последовательности текущего раунда, переходим на следующий
          if (
            this.userSubsequence.length === this.generatedSubsequence.length
          ) {
            this.round++
            this.userSubsequence = []

            setTimeout(() => {
              this.playRound()
            }, this.difficultyTime)
          }
        } else this.isGameOver = true
      }
    },
    // Воспроизведение звука
    playSound(soundFile, type) {
      const audio = new Audio(soundFile)
      // Необходимо, чтобы разрешить автовоспроизведение на IOS
      if (type === 'unlock') {
        audio.src = '/sounds/empty.mp3'
        audio.muted = true
      } else {
        audio.muted = false
      }
      audio.play().catch((error) => console.error(error))
    },
    // Функция выбора случайного квадрата
    chooseRandomSquare() {
      return Math.floor(Math.random() * 4)
    },
    // Функция анимации для определенного квадрата
    animateSquare(squareIndex, color, time) {
      return new Promise((resolve) => {
        const square = document.querySelectorAll('.square')[squareIndex]
        square.style.backgroundColor = color

        // Возвращаем цвет квадрату обратно
        setTimeout(() => {
          square.style.backgroundColor = ''
          resolve()
        }, time)
      })
    },
    // Функция проигрывания последовательности раунда
    async playRound() {
      this.canUserClick = false
      this.generatedSubsequence.push(this.chooseRandomSquare())

      for (const index of this.generatedSubsequence) {
        this.playSound(this.soundFiles[index])

        await this.animateSquare(
          index,
          this.getColorForSquare(index),
          this.difficultyTime
        )
        // вернуть изначальный цвет, небольшая задержка для того,
        // чтобы было видно, когда повторно загорается тот же квадрат
        await this.animateSquare(index, '', 50)
      }

      this.canUserClick = true
    },
    // Функция проверки последовательности пользователя
    checkUserSequence() {
      for (let i = 0; i < this.userSubsequence.length; i++) {
        if (this.userSubsequence[i] !== this.generatedSubsequence[i]) {
          return false
        }
      }
      return true
    },
    // Получение цвета для квадрата
    getColorForSquare(squareIndex) {
      const colors = ['#A8D0FF', '#FFB199', '#FFF59B', '#DBFFB7']
      return colors[squareIndex]
    },
  },
  computed: {
    // Изменение времени в зависимости от уровня сложности
    difficultyTime() {
      switch (this.selectedDifficulty) {
        case 'Easy':
          return 1500
        case 'Medium':
          return 1000
        case 'Hard':
          return 400
        default:
          return 1500
      }
    },
  },
}
</script>

<style lang="sass">
.simon-game
  display: flex
  flex-direction: column
  justify-content: flex-start
  align-items: center
  padding-top: 50px
  box-sizing: border-box
  height: 100vh
  width: 100%
  font-size: 16px
  font-family: 'Roboto'
  font-weight: 300

  .title-container
    display: flex
    justify-content: center
    align-items: flex-start
    height: 150px
    width: 850px

    h1
      color: #2C2C2C
      font-size: 36px
      font-family: 'Roboto'
      font-weight: 400
      letter-spacing: 1.2px

.wrapper
  display: flex
  width: 850px
  height: 420px

.interface-container
  display: flex
  align-items: center
  justify-content: center
  height: 100%
  width: 50%

  .interface
    display: grid
    grid-template-columns: repeat(2, 1fr)
    grid-template-rows: repeat(2, 1fr)
    gap: 10px
    width: 400px
    height: 400px

    .square
      width: 100%
      height: 100%
      border-radius: 10px
      cursor: pointer

      &.blue
        background-color: #4C9EFF
      &.coral
        background-color: #FF774C
      &.yellow
        background-color: #FFED4C
      &.green
        background-color: #A6FF4C

.controls-container
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  height: 100%
  width: 50%
  padding-left: 100px
  box-sizing: border-box

  .main-controls
    display: flex
    flex-direction: column
    align-items: center
    justify-content: flex-start
    height: 30%
    width: 100%

    .round-container
      display: flex
      align-items: center
      justify-content: flex-start
      height: 40%
      width: 100%
      font-weight: 400

      .round-counter
        font-size: 20px

    .start-button-container
      display: flex
      align-items: center
      justify-content: flex-start
      height: 40%
      width: 100%

      button
        width: 95px
        height: 40px
        text-align: center
        background-color: #5C8DC6
        color: #fff
        border: none
        border-radius: 10px
        cursor: pointer
        font-size: 18px
        font-weight: 400
        letter-spacing: 1.6px

    .game-over-message
      display: flex
      align-items: center
      justify-content: flex-start
      height: 20%
      width: 100%

  .settings-container
    display: flex
    flex-direction: column
    align-items: flex-start
    justify-content: center
    height: 40%
    width: 100%
    box-sizing: border-box
    font-weight: 300

    .difficulty-levels
      display: flex
      flex-direction: column
      height: 80%
      align-items: flex-start
      justify-content: space-between
      width: 160px

      .option-container
        display: flex
        align-items: center
        justify-content: flex-start
        height: 26px
        width: 100%

        .option-container-title
          font-weight: 400

        input[type="radio"]
          cursor: pointer

@media (max-width: 640px)
  .simon-game
    padding-top: 0
    height: auto
    min-width: 320px
    width: 100%
    max-width: 640px

    .title-container
      height: 70px
      min-width: 320px
      width: 100%
      max-width: 640px

  .wrapper
    flex-direction: column
    min-width: 320px
    width: 100%
    max-width: 640px
    min-height: 800px
    max-height: 800px

  .interface-container
    height: fit-content
    min-width: 320px
    width: 100%
    max-width: 640px

    .interface
      padding: 20px 20px 20px 20px
      min-width: 300px
      max-width: 300px
      min-height: 300px
      max-height: 300px

  .controls-container
    justify-content: flex-start
    margin-top: 20px
    height: 50%
    min-width: 320px
    width: 100%
    max-width: 640px
    padding-left: 0

    .main-controls
      justify-content: center
      height: 40%

      .round-container
        align-items: flex-start
        justify-content: center

        .round-counter
          font-size: 26px

      .start-button-container
        align-items: flex-start
        justify-content: center

        button
          width: 130px
          height: 85%
          font-size: 26px
          letter-spacing: 2px

      .game-over-message
        align-items: flex-start
        justify-content: center
        min-height: 50px
        max-height: 50px
        font-size: 20px
        width: 100%

    .settings-container
      align-items: center
      justify-content: flex-start
      height: 50%

      .difficulty-levels
        margin-top: 10px

        .option-container
          .option-container-title
            font-size: 24px
            margin-left: 0

          input
            width: 24px
            height: 24px

          label
            font-size: 22px
            margin-left: 12px
</style>
