import React from 'react';

import Typed from 'typed.js';

class TypedComponent extends React.Component {
  componentDidMount() {
    const { strings } = this.props;
    const options = {
      strings: strings,
      typeSpeed: 40,
      showCursor: false,
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
    return (
      <div className="wrap" onClick={() => this.typed.start()}>
        <div className="type-wrap">
          <span
            style={{ whiteSpace: 'pre-wrap' }}
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
