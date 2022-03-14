import * as React from 'react'
import Light from '../Light/Light'
import Win from '../Header/Header'

type BoardProps = {
  winHandler: Function
}

interface BoardStates {
  size: number,
  level: number,
  lits: Array<boolean>,
  steps: number,
  stopped: boolean,
  win: boolean,
  timerSec: number,
  timerMin: number
  width: number
}

class Board extends React.Component<BoardProps, BoardStates> {
  constructor(props: BoardProps) {
    super(props)

    this.state = {
      level: 0,
      size: 5,
      width: 340,
      lits: [],
      steps: 0,
      stopped: true,
      win: false,
      timerSec: 0,
      timerMin: 0
    }
  }

  tick = () => {
    setTimeout(() => {
      if (!this.state.stopped) {
        this.setState((prevState) => {
          let sec: number
          let min: number
          if (prevState.timerSec + 1 === 60) {
            sec = 0
            min = prevState.timerMin + 1
          } else {
            sec = prevState.timerSec + 1
            min = prevState.timerMin
          }
          return {
            timerSec: sec,
            timerMin: min
          }
        })
        this.tick()
      }
    }, 1000)
  }

  componentDidMount = () => {
    this.clearBoard()

    return
  }

  clearBoard = () => {
    const brd = new Array<boolean>()
    for (let i = 0; i < this.state.size * this.state.size; i++) {
      brd.push(false)
    }

    this.setState({
      lits: brd
    })

    return
  }


  reset = () => {
    this.clearBoard()
    this.setState({
      win: false,
      level: 0,
      steps: 0,
      stopped: true,
      timerMin: 0,
      timerSec: 0
    })
  }


  shuffle = () => {
    this.clearBoard()

    if (this.state.win || this.state.level === 0) {
      this.setState({
        level: (this.state.level < this.state.size * this.state.size) ? this.state.level + 1 : 1
      })
    }

    if (this.state.level < (this.state.size * this.state.size) + 1) {
      let clicks = new Array<number>()
      for (let i = 0; i < this.state.level + 1; i++) {
        let rndm: number | undefined

        do {
          rndm = Math.floor(Math.random() * this.state.size * this.state.size)
        }
        while (!clicks.indexOf(rndm))

        this.onClickHandler(rndm)
        clicks.push(rndm)
      }

      this.setState({
        steps: 0,
        stopped: false,
        timerSec: 0,
        timerMin: 0
      })

      this.props.winHandler(false)
      this.tick()
    }

    return
  }

  onClickHandler = (i: number) => {
    let isPlay: boolean | undefined

    this.setState((prevState) => {
      const lit = prevState.lits.map((lt: boolean, index: number) => {
        if (
          (index === i - prevState.size) ||
          (index === i - 1 && (i % prevState.size) !== 0) ||
          (index === i) ||
          (index === i + 1 && (i % prevState.size) !== (prevState.size - 1)) ||
          (index === i + prevState.size)
        ) {
          return !lt
        } else {
          return lt
        }
      })

      isPlay = lit.find((lt: boolean) => lt)

      return {
        lits: lit,
        steps: (prevState.stopped) ? prevState.steps : prevState.steps + 1,
        stopped: isPlay ? false : true,
        win: isPlay ? false : true
      }
    })

    return
  }

  render() {
    let gridCols: string = ""
    let gridSize: number = this.state.width / this.state.size
    for (let i = 0; i < this.state.size; i++) {
      if (i > 0) {
        gridCols += " "
      }

      gridCols += `${gridSize}px`
    }

    const boardStyle = {
      display: "grid",
      gridTemplateColumns: gridCols,
      gridTemplateRows: gridCols,
    }

    if (this.state.win) {
      this.props.winHandler(true)
    }

    const board = Array<JSX.Element>()

    this.state.lits.map((lit: boolean, index: number) => {
      board.push(
        <Light
          key={index}
          lit={lit}
          buttonSize={this.state.width / this.state.size}
          onClickHandler={() => (this.state.stopped) ? () => { } : this.onClickHandler(index)}
        />
      )

      return true
    })

    return (
      <div className="board-container">
        <Win started={this.state.level < 1} win={this.state.win} rate={this.state.level / this.state.steps} onReset={() => { this.reset() }} onClickHandler={() => { this.shuffle() }} currentSteps={this.state.steps} />
        <div style={boardStyle}>
          {board}
        </div>
        <div className="counters">
          <div className="steps">Steps: {this.state.steps}</div>
          <div className="level">{(this.state.level > 0) ? "Level " + this.state.level : ""}</div>
          <div className="timer">Time: {(this.state.timerMin < 10) ? "0" : ""}{this.state.timerMin}:{(this.state.timerSec < 10) ? "0" : ""}{this.state.timerSec}</div>
        </div>
      </div>
    )
  }
}

export default Board