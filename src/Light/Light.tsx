import React from 'react'

type LightProps = {
    key: number,
    lit: boolean,
    buttonSize: number,
    onClickHandler: React.MouseEventHandler<HTMLButtonElement>
}

class Light extends React.Component<LightProps, {}> {
    render() {
        const litStyle = {
            width: `${this.props.buttonSize}px`,
            height: `${this.props.buttonSize}pxs`
        }

        return (
            <button style={litStyle} className={this.props.lit ? 'lit' : 'dark'} onClick={this.props.onClickHandler}>&nbsp;</button>
        )
    }
}

export default Light