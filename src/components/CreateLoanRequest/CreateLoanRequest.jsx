// External libraries
import React, { Component } from "react";
import {
    Button,
    Col,
    ControlLabel,
    Form,
    FormControl,
    FormGroup,
    InputGroup,
} from "react-bootstrap";
import Dharma from "@dharmaprotocol/dharma.js";

// Components
import Loading from "../Loading/Loading";
import TimeUnitSelect from "./TimeUnitSelect/TimeUnitSelect";
import TokenSelect from "./TokenSelect/TokenSelect";

// Services
import Api from "../../services/api";

// Styling
import "./CreateLoanRequest.css";
import Title from "../Title/Title";

class CreateLoanRequest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            principal: 0,
            principalTokenSymbol: "WETH",
            collateral: 0,
            collateralTokenSymbol: "REP",
            interestRate: 0,
            termLength: 0,
            termUnit: "weeks",
            expirationLength: 0,
            expirationUnit: "days",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.createLoanRequest = this.createLoanRequest.bind(this);
    }

    async createLoanRequest(event) {
        event.preventDefault();

        const api = new Api();

        try {
            const debtorAddress = await this.getDebtorAddress();
            const loanRequest = await this.generateLoanRequest(debtorAddress);
            await this.authorizeCollateralTransfer(debtorAddress);

            const id = await api.create("loanRequests", loanRequest.toJSON());

            this.props.onCompletion(id);
        } catch (e) {
            console.error(e);
        }
    }

    async authorizeCollateralTransfer(debtorAddress) {
        const { dharma } = this.props;

        const { Allowance } = Dharma.Types;

        const { principalTokenSymbol } = this.state;

        const allowance = new Allowance(dharma, debtorAddress, principalTokenSymbol);

        await allowance.makeUnlimitedIfNecessary();

        // TODO(kayvon): handle async call to mine transaction if necessary
    }

    async getDebtorAddress() {
        const { dharma } = this.props;

        const debtorAccounts = await dharma.blockchain.getAccounts();
        return debtorAccounts[0];
    }

    async generateLoanRequest(debtorAddress) {
        const { dharma } = this.props;

        const { LoanRequest } = Dharma.Types;

        const {
            principal,
            principalTokenSymbol,
            collateralTokenSymbol,
            collateral,
            termUnit,
            expirationUnit,
            expirationLength,
            interestRate,
            termLength,
        } = this.state;

        return LoanRequest.create(dharma, {
            principalAmount: principal,
            principalToken: principalTokenSymbol,
            collateralAmount: collateral,
            collateralToken: collateralTokenSymbol,
            interestRate,
            termDuration: termLength,
            termUnit,
            debtorAddress,
            expiresInDuration: expirationLength,
            expiresInUnit: expirationUnit,
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    render() {
        const { tokens } = this.props;

        if (tokens.length === 0) {
            return <Loading />;
        }

        const {
            principal,
            principalTokenSymbol,
            collateral,
            collateralTokenSymbol,
            termUnit,
            termLength,
            interestRate,
            expirationUnit,
            expirationLength,
        } = this.state;

        const labelWidth = 3;
        const dropdownWidth = 4;
        const inputWidth = 5;

        return (
            <div className="CreateLoanRequest">
                <Title>Create a Loan Request</Title>
                <Col md={7}>
                    <Form horizontal onSubmit={this.createLoanRequest}>
                        <FormGroup controlId="principal">
                            <Col componentClass={ControlLabel} sm={labelWidth}>
                                Principal
                            </Col>
                            <Col sm={inputWidth}>
                                <FormControl
                                    onChange={this.handleInputChange}
                                    type="number"
                                    placeholder="Principal"
                                    name="principal"
                                    value={principal}
                                />
                            </Col>
                            <Col sm={dropdownWidth}>
                                <TokenSelect
                                    name="principalTokenSymbol"
                                    onChange={this.handleInputChange}
                                    defaultValue={principalTokenSymbol}
                                    tokens={tokens}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="collateral">
                            <Col componentClass={ControlLabel} sm={labelWidth}>
                                Collateral
                            </Col>
                            <Col sm={inputWidth}>
                                <FormControl
                                    onChange={this.handleInputChange}
                                    type="number"
                                    name="collateral"
                                    placeholder="Collateral"
                                    value={collateral}
                                />
                            </Col>
                            <Col sm={dropdownWidth}>
                                <TokenSelect
                                    onChange={this.handleInputChange}
                                    name="collateralTokenSymbol"
                                    defaultValue={collateralTokenSymbol}
                                    tokens={tokens}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="term">
                            <Col componentClass={ControlLabel} sm={labelWidth}>
                                Term Length
                            </Col>
                            <Col sm={inputWidth}>
                                <FormControl
                                    onChange={this.handleInputChange}
                                    type="number"
                                    placeholder="Term Length"
                                    name="termLength"
                                    value={termLength}
                                />
                            </Col>
                            <Col sm={dropdownWidth}>
                                <TimeUnitSelect
                                    onChange={this.handleInputChange}
                                    name="termUnit"
                                    defaultValue={termUnit}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="interest">
                            <Col componentClass={ControlLabel} sm={labelWidth}>
                                Interest Rate
                            </Col>
                            <Col sm={inputWidth}>
                                <InputGroup>
                                    <FormControl
                                        onChange={this.handleInputChange}
                                        type="number"
                                        placeholder="Interest Rate"
                                        name="interestRate"
                                        value={interestRate}
                                    />
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="expiration">
                            <Col componentClass={ControlLabel} sm={labelWidth}>
                                Expiration
                            </Col>
                            <Col sm={inputWidth}>
                                <FormControl
                                    onChange={this.handleInputChange}
                                    type="number"
                                    placeholder="Expiration"
                                    name="expirationLength"
                                    value={expirationLength}
                                />
                            </Col>
                            <Col sm={dropdownWidth}>
                                <TimeUnitSelect
                                    onChange={this.handleInputChange}
                                    name="expirationUnit"
                                    defaultValue={expirationUnit}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={labelWidth} sm={10}>
                                <Button type="submit" bsStyle="primary">
                                    Create
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
            </div>
        );
    }
}

export default CreateLoanRequest;
