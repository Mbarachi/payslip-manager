import { useNavigate, useParams } from "react-router-dom"
import payslipData from '../mockData'
import moment from "moment"
import { Alert, Button, Card, Container } from "react-bootstrap"
import DownloadIcon from "../components/DownloadIcon"
import { ArrowLeftCircle } from "lucide-react"
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem"
import { useState } from "react"
import { motion } from "framer-motion"

const PayslipDetails = () => {
    const { id } = useParams<{ id: string }>()
    const [showAlert, setShowAlert] = useState(false);

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
        try {
            await Filesystem.writeFile({
                path: `payslip-${payslip.id}.pdf`,
                data: 'This is a test',
                directory: Directory.Documents,
                encoding: Encoding.UTF8,
            });
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        } catch (error) {
            console.error('Error downloading payslip:', error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <Container style={{ marginTop: '1rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: showAlert ? 1 : 0, y: showAlert ? 0 : -20 }}
                    transition={{ duration: 0.5 }}
                >
                    {showAlert &&
                        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible style={{ marginTop: "1rem" }}>
                            Payslip downloaded successfully!
                        </Alert>
                    }
                </motion.div>

                <ArrowLeftCircle style={{ marginBottom: "0.5rem", cursor: "pointer" }} onClick={() => navigate(-1)} />
                <Card>
                    <Card.Body>
                        <h3>Payslip Details</h3>
                        <p>ID: {payslip.id}</p>
                        <p>Period: {formatDate(payslip.fromDate)} to {formatDate(payslip.toDate)}</p>
                        <Button style={{ marginTop: "0.7rem" }} size="sm" variant="dark" onClick={downloadPayslip}>
                            Download Payslip
                            <DownloadIcon />
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        </motion.div>
    )
}

export default PayslipDetails