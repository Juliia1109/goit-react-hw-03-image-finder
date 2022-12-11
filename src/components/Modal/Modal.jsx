import PropTypes from 'prop-types';
import css from './Modal.module.css';
import React, { Component } from 'react'


export default class Modal extends Component {
 
  componentDidMount() {
    window.addEventListener("keydown",this.closeByEsc);
}

componentWillUnmount() {
    window.removeEventListener("keydown",this.closeByEsc);
}

  closeByEsc = (e) => {
        if(e.code === "Escape") {
            this.props.onClose()
        }
    }

  render() {
   const { src, alt } = this.props;
    return (
<div className={css.Overlay} onClick={this.closeByEsc}>
<div className={css.Modal}>
<img src={src} alt={alt} />
</div>
</div>
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}