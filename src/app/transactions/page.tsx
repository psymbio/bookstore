import TransactionHistory from "../components/TransactionHistory";
import TransactionIssue from "../components/TransactionIssue";
import TransactionListAll from "../components/TransactionListAll";

export default function Transactions() {
    return (
        <div>
            <TransactionListAll />
            <TransactionIssue />
            <TransactionHistory />
        </div>
    );
}