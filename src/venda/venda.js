import React from "react";
import axios from 'axios';
import './venda.css';
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import Botao from "../componentes/botao/botao";

class Venda extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            funcionario: [],
            produtos: [],
            comprador: []
        }

    }

    render () {
        return (
            <Container>

                <Row className="header-vendas">
                    {
                        this.state.funcionario.map((pessoa) => {
                            return (
                                
                                <Col className="header-vendedor">

                                    { pessoa.funcao + ": " + pessoa.name }

                                </Col>

                            )
                        })
                    }
                </Row>

                <Row className="main-vendas">

                    <Col xs lg="9" className="itens">

                        <Row>
                            <Col>Nome do Produto</Col>
                            <Col>Quantidade</Col>
                            <Col>Valor unit</Col>
                            <Col>Valor</Col>
                        </Row>
                        
                        <Row>
                            <Col>
                                {
                                    this.state.produtos.map((item) => {
                                        return (
                                            <Row className="listIten">
                                                <Col>
                                                    { item.name }
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col><Button className="buttonList" onClick={() => this.alterarQtd(item.id, '-')}>-</Button></Col>
                                                        <Col>{ item.qtd }</Col>
                                                        <Col><Button className="buttonList" onClick={() => this.alterarQtd(item.id, '+')}>+</Button></Col>
                                                    </Row>
                                                </Col>
                                                <Col>
                                                    { item.valorUn }
                                                </Col>
                                                <Col>
                                                    { item.valor }
                                                </Col>
                                                <Col>
                                                    <Button className="buttonList" onClick={() => this.excluirItem(item.id)}>Excluir</Button>
                                                </Col>
                                            </Row>
                                        )
                                    })
                                }
                            </Col>

                        </Row>
                        <Row>
                            <InputGroup className="mb-3" id="input">
                                <FormControl
                                    id="Form"
                                    placeholder="Insira o código de barra"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    onChange={(event) => this.setState({codigo: event.currentTarget.value})} 
                                    type="text"
                                />
                                <InputGroup.Append>
                                <Button variant="outline-secondary" onClick={() => this.inserirItem(this)}>Button</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Row>
                            
                    </Col>

                    <Col>

                        <Row>
                            <Col>
                                <InputGroup className="mb-3" >
                                    <FormControl className="informatColab" placeholder="Nome do Comprador"/>
                                </InputGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <InputGroup>
                                    <FormControl placeholder="CPF do Comprador"/>
                                </InputGroup>
                            </Col>
                        </Row>

                        <div className="footer">

                            <Row className="total">
                                <Col>R$ {this.precoTotal()}</Col>
                            </Row>

                            <Row className="option">
                                <Col xs="auto"><Button className="buttonFinaliza">Finalizar</Button></Col>
                                <Col xs="auto"><Button className="buttonCancela" onClick={() => this.cancelar()}>Cancelar</Button></Col>
                            </Row>

                        </div>

                        

                    </Col>

                </Row>

            </Container>

            
        );
    }

    excluirItem(id) {
        let produtos = this.state.produtos.filter(
            (item) => item.id != id
        );
        this.setState({
            produtos: produtos,
        })
    }

    cancelar(){
        let produtos = this.state.produtos.filter(
            (item) => item.id == null
        );
        let comprador = this.state.comprador.filter(
            (pessoa) => pessoa.name == null
        )
        this.setState({
            produtos: produtos,
            comprador: comprador
        })
    }

    limparInput(){
        let produto = this.state.produtos;
        let input = this.state.FormControl.filter(
            (item) => item.codigo == produto.codigo
        );
        this.state({
            
        })
    }


    precoTotal(){
        let total = 0;
        this.state.produtos.forEach(element => {
            total += element.valor;            
        });
        return total;
    }

    inserirItem(ethis){
        axios.get('http://localhost:8000/produtos?codigo=' + ethis.state.codigo)
        .then(res => {
            let contido = false;
            if(res.data){
                ethis.state.produtos.forEach(element => {
                    if(res.data.codigo === element.codigo){
                        contido = true;
                    }
                });
                if(!contido){
                    let produto = ethis.state.produtos;
                    produto.push(res.data);
                    ethis.setState({
                        produtos: produto
                    })
                    let limpar = document.getElementById('Form').value;
                    limpar.value = 0;
                } else {
                    this.alterarQtd(res.data.id, '+');
                }
            } 

        }).catch(err => {
           console.error(err); 
        })
    }

    alterarQtd(id, sinal){
        let upd = true;
        let produto = this.state.produtos.map((element) => {
            if(element.id === id){
                switch (sinal) {
                    case '+':
                        element.qtd += 1;
                        element.valor = element.valorUn * element.qtd;
                        return element;
                        break;
                    case '-':
                        if(element.qtd == 1) {
                            this.excluirItem(id);
                            upd = false
                        } else {
                            element.qtd -= 1;
                            element.valor = element.valorUn * element.qtd;
                            return element;
                        }
                        break;
                    default:
                        break;
                }
            } else {
                return element;
            }
        })


        if(upd) this.setState({
            produtos: produto
        })
    }
    
}

export default Venda;
