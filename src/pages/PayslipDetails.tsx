import { useNavigate, useParams } from "react-router-dom"
import payslipData from '../mockData'
import moment from "moment"
import { Button, Card, Container } from "react-bootstrap"
import DownloadIcon from "../components/DownloadIcon"
import { ArrowLeftCircle } from "lucide-react"
import { Directory, Filesystem } from "@capacitor/filesystem"

const PayslipDetails = () => {
    const { id } = useParams<{ id: string }>()

    const navigate = useNavigate()

    const payslip = payslipData.find(slip => slip.id === id)

    const formatDate = (timestamp: string) => {
        const date = moment.unix(parseInt(timestamp));
        return date.format('Do MMM YYYY');
    };

    if (!payslip) {
        return <div>Payslip not found</div>;
    }

    const downloadPayslip = async () => {
        const response = await fetch(payslip.file);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64data = reader.result;
            await Filesystem.writeFile({
                path: `payslip-${payslip.id}.pdf`,
                data: base64data as string,
                directory: Directory.Documents,
            });
            alert('File downloaded');
        };
        reader.readAsDataURL(blob);
    };

    return (
        <Container style={{ marginTop: '1rem' }}>
            <ArrowLeftCircle style={{ marginBottom: "0.5rem" }} onClick={() => navigate(-1)} />
            <Card>
                <Card.Body>
                    <h3>Payslip Details</h3>
                    <p>ID: {payslip.id}</p>
                    <p>Period: {formatDate(payslip.fromDate)} to {formatDate(payslip.toDate)}</p>
                    <Button className="flex-btn" onClick={downloadPayslip}>
                        Download Payslip
                        <DownloadIcon />
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default PayslipDetails