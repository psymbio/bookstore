import TransactionBookStatus from "../components/TransactionBookStatus";
import TransactionDateRange from "../components/TransactionDateRange";
import TransactionIssue from "../components/TransactionIssue";
import TransactionListAll from "../components/TransactionListAll";
import TransactionRent from "../components/TransactionRent";
import TransactionUser from "../components/TransactionUser";

export default function Transactions() {
    return (
        <div>
            <TransactionListAll />
            <TransactionIssue />
            <TransactionBookStatus />
            <TransactionRent />
            <TransactionUser />
            <TransactionDateRange />
        </div>
    );
}