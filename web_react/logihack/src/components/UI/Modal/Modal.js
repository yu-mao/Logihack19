import React, { Component } from 'react';

import classes from './Modal.css';
import Aux_ from '../../../hoc/Aux_/Aux_';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show;
    }

    componentWillUpdate () {
        console.log('[Modal] WillUpdate');
    }

    render () {
        return (
            <Aux_>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux_>
        )
    }
}

export default Modal;