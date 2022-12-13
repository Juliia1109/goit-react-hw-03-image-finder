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

  closeByEsc = e => {
        if(e.code === "Escape") {
            this.props.onClose()
        }
    }

  closeBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
  
   const { closeBackdrop } = this;
    return (
<div className={css.Overlay} onClick={closeBackdrop}>
<div className={css.Modal}>
<img src={this.props.img} alt={this.props.alt} />
</div>
</div>
    );
  }
}

Modal.propTypes = {
	img: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
}