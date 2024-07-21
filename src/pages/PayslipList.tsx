import { useState } from "react"
import payslipData from '../mockData'
import { Payslip } from "../types"
import { Link } from "react-router-dom"

const PayslipList = () => {
    const [payslips, setPayslips] = useState<Payslip[]>(payslipData)

    const formatDate = (timestamp: string) => {
        const date = new Date(parseInt(timestamp) * 1000);
        return date.toLocaleDateString();
    };

    return (
        <div>
            <h1>Payslip List</h1>
            <ul>
                {payslips.map((paylsip => (
                    <li key={paylsip.id}>
                        <Link to={`/payslip/${paylsip.id}`}>
                            {formatDate(paylsip.fromDate)} to {formatDate(paylsip.toDate)}ƒ
                        </Link>
                    </li>
                )))}
            </ul>
        </div>
    )
}

export default PayslipList