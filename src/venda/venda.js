import React from "react";
import axios from 'axios';
import './venda.css';
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import Botao from "../componentes/botao/botao";

class Venda extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            produtos: [
                {
                    id: 1,
                    name: "Calça Jeans Renner",
                    codigo: '123456',
                    qtd: 1,
                    valorUn: 70,
                    valor: 70 
                }
            ],
            codigo: ''
        }

    }

    render () {
        return (
            <Container>

                <Row className="header-vendas">
                    <Col className="header-vendedor">Vendedora: Paloma</Col>
                </Row>

                <Row className="main-vendas">

                    <Col xs lg="9" className="itens">
                        <Row>
                            <Col>
                                {
                                    this.state.produtos.map((item) => {
                                        return (
                                            <Row>
                                                <Col>
                                                    { item.name }
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col><Button onClick={() => this.alterarQtd(item.id, '-')}>-</Button></Col>
                                                        <Col>{ item.qtd }</Col>
                                                        <Col><Button onClick={() => this.alterarQtd(item.id, '+')}>+</Button></Col>
                                                    </Row>
                                                </Col>
                                                <Col>
                                                    { item.valorUn }
                                                </Col>
                                                <Col>
                                                    { item.valor }
                                                </Col>
                                                <Col>
                                                    <Button onClick={() => this.excluirItem(item.id)}>Excluir</Button>
                                                </Col>
                                            </Row>
                                        )
                                    })
                                }
                            </Col>

                        </Row>
                        <Row>
                            <InputGroup className="mb-3" >
                                <FormControl
                                    placeholder="Recipient's username"
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
                            <Col>Comprador: Ariel</Col>
                        </Row>

                        <Row>
                            <Col>CPF: 156.125.577-79</Col>
                        </Row>

                        <div className="footer">

                            <Row className="total">
                                <Col>R$ {this.precoTotal()}</Col>
                            </Row>

                            <Row className="option">
                                <Col xs="auto"><Button color="success">Finalizar</Button></Col>
                                <Col xs="auto"><Button color="danger">Cancelar</Button></Col>
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

    precoTotal(){
        let total = 0;
        this.state.produtos.forEach(element => {
            total =+ element.valor;            
        });
        return total;
    }

    inserirItem(ethis){
        axios.get('http://localhost:8000/produtos?codigo=' + ethis.state.codigo)
        .then(res => {
            console.log(res.data)
            if(res.data){
                let produto = ethis.state.produtos;
                produto.push(res.data);
                ethis.setState({
                    produtos: produto
                })
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


        if (upd) this.setState({
            produtos: produto
        })
    }
}

export default Venda;
