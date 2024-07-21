import { useParams } from "react-router-dom"
import payslipData from '../mockData'

const PayslipDetails = () => {
    const { id } = useParams<{ id: string }>()

    const payslip = payslipData.find(slip => slip.id === id)

    const formatDate = (timestamp: string) => {
        const date = new Date(parseInt(timestamp) * 1000);
        return date.toLocaleDateString();
    };

    if (!payslip) {
        return <div>Payslip not found</div>;
    }

    return (
        <div>
            <h1>Payslip Details</h1>
            <p>ID: {payslip.id}</p>
            <p>Period: {formatDate(payslip.fromDate)} to {formatDate(payslip.toDate)}</p>
            <button>Download Payslip</button>
        </div>
    )
}

export default PayslipDetails