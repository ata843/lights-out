import React from 'react'

type WinProps = {
  started: boolean
  win: boolean
  rate: number
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>
  onReset: React.MouseEventHandler<HTMLButtonElement>
  currentSteps: number
}

class Win extends React.Component<WinProps, {}> {
  render() {
    let result: string

    if (this.props.rate === 1) {
      result = "Flawless!"
    } else if (this.props.rate > 1) {
      result = "Excellent!"
    } else {
      result = "Ok."
    }

    return (
      <div className="controls">
        <h2 className={this.props.win ? 'show-result' : ''}><span>{result}</span></h2>
        <div className="buttons">
          <button onClick={this.props.onReset}>Reset</button>
          <button disabled={!this.props.started && !this.props.win} onClick={this.props.onClickHandler}>{this.props.started ? "New\nGame" : "Next\nLevel"}</button>
        </div>
      </div>
    )
  }
}

export default Win