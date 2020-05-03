import React from "react";
import './botao.css';

class Botao extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            
            <button className="button">

                 <p className="button-login" onClick={this.props.click}>{ this.props.label }</p>

            </button>

        );

    }

}

export default Botao;
