import { useState } from "react"
import Card from 'react-bootstrap/Card';
import payslipData from '../mockData'
import { Payslip } from "../types"
import { Link } from "react-router-dom"
import moment from "moment"
import { Container } from "react-bootstrap";

const PayslipList = () => {
    const [payslips, setPayslips] = useState<Payslip[]>(payslipData)

    const formatDate = (timestamp: string) => {
        const date = moment.unix(parseInt(timestamp));
        return date.format('Do MMM YYYY');
    };

    return (
        <Container style={{ marginTop: '1rem' }}>
            <Card>
                <Card.Body>
                    <h1>Payslip List</h1>
                    <ul>
                        {payslips.map((paylsip => (
                            <li key={paylsip.id}>
                                <Link to={`/payslip/${paylsip.id}`}>
                                    {formatDate(paylsip.fromDate)} to {formatDate(paylsip.toDate)}
                                </Link>
                            </li>
                        )))}
                    </ul>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default PayslipList