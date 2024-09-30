import TransactionBookStatus from "../components/TransactionBookStatus";
import TransactionIssue from "../components/TransactionIssue";
import TransactionListAll from "../components/TransactionListAll";

export default function Transactions() {
    return (
        <div>
            <TransactionListAll />
            <TransactionIssue />
            <TransactionBookStatus />
        </div>
    );
}