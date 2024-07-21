import { useParams } from "react-router-dom"
import payslipData from '../mockData'
import moment from "moment"
import { Button, Card, Container } from "react-bootstrap"
import DownloadIcon from "../components/DownloadIcon"

const PayslipDetails = () => {
    const { id } = useParams<{ id: string }>()

    const payslip = payslipData.find(slip => slip.id === id)

    const formatDate = (timestamp: string) => {
        const date = moment.unix(parseInt(timestamp));
        return date.format('Do MMM YYYY');
    };

    if (!payslip) {
        return <div>Payslip not found</div>;
    }

    return (
        <Container style={{ marginTop: '1rem' }}>
            <Card>
                <Card.Body>
                    <h1>Payslip Details</h1>
                    <p>ID: {payslip.id}</p>
                    <p>Period: {formatDate(payslip.fromDate)} to {formatDate(payslip.toDate)}</p>
                    <Button className="flex-btn">
                        Download Payslip
                        <DownloadIcon />
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default PayslipDetails