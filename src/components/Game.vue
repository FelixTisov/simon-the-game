<template>
  <div class="simon-game">
    <div class="title-container">
      <h1>Саймон говорит</h1>
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
            <div class="round-counter">Раунд: {{ round }}</div>
          </div>
          <div class="start-button-container">
            <button @click="startGame">Начать</button>
          </div>
        </div>

        <div class="settings-container">
          <div class="difficulty-levels">
            <div class="option-container">
              <label class="option-container-title">Уровень сложности:</label>
            </div>

            <div class="option-container">
              <input
                type="radio"
                id="easy"
                name="difficulty"
                value="Легкий"
                v-model="selectedDifficulty"
              />
              <label for="easy">Легкий</label>
            </div>

            <div class="option-container">
              <input
                type="radio"
                id="medium"
                name="difficulty"
                value="Средний"
                v-model="selectedDifficulty"
              />
              <label for="medium">Средний</label>
            </div>

            <div class="option-container">
              <input
                type="radio"
                id="hard"
                name="difficulty"
                value="Сложный"
                v-model="selectedDifficulty"
              />
              <label for="hard">Сложный</label>
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
      selectedDifficulty: 'Легкий',
    }
  },
  methods: {
    handleClick(index) {},
    startGame() {
      this.round = 1
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
    justify-content: center
    height: 30%
    width: 100%

    .round-container
      display: flex
      align-items: center
      justify-content: flex-start
      height: 50%
      width: 100%
      font-weight: 400

      .round-counter
        font-size: 20px

    .start-button-container
      display: flex
      align-items: center
      justify-content: flex-start
      height: 50%
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
</style>
