import React from 'react';

import Typed from 'typed.js';

class TypedComponent extends React.Component {
  componentDidMount() {
    const { strings } = this.props;
    const options = {
      strings: strings,
      typeSpeed: 40,
      backSpeed: 50,
      // loop: true,
      // loopCount: Infinity,
      showCursor: true,
      onComplete: (self) => {
        this.props.setIsVisible(true);
      },
    };
    this.typed = new Typed(this.el, options);
  }

  componentWillUnmount() {
    this.typed.destroy();
  }

  render() {
    const style = {
      // display: 'block',
      // width: '100%'
    };
    return (
      <div style={style} className="wrap" onClick={() => this.typed.start()}>
        <div className="type-wrap">
          <span
            style={{ whiteSpace: 'pre-wrap', fontSize: 25 }}
            ref={(el) => {
              this.el = el;
            }}
          />
        </div>
      </div>
    );
  }
}

export default TypedComponent;
