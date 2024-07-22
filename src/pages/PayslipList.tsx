import { useState } from "react"
import payslipData from '../mockData'
import { Payslip } from "../types"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import { Container, ListGroup } from "react-bootstrap";
import { ArrowRight, Receipt } from "lucide-react";

const PayslipList = () => {
    const [payslips, setPayslips] = useState<Payslip[]>(payslipData)

    const formatDate = (timestamp: string) => {
        const date = moment.unix(parseInt(timestamp));
        return date.format('Do MMM YYYY');
    };

    const navigate = useNavigate()

    return (
        <Container>
            <h3>Payslip List</h3>
            <ListGroup>
                {payslips.map((payslip => (
                    <ListGroup.Item variant="primary" key={payslip.id} action onClick={() => navigate(`/payslip/${payslip.id}`)}>
                        <div className="flex-payslip">
                            <div>
                                <Receipt style={{ marginRight: "0.5rem" }} />
                                {formatDate(payslip.fromDate)} to {formatDate(payslip.toDate)}
                            </div>
                            <ArrowRight className="payslip-arrow" />
                        </div>
                    </ListGroup.Item>
                )))}
            </ListGroup>
        </Container>
    )
}

export default PayslipList