import TransactionHistory from "../components/TransactionHistory";
import TransactionIssue from "../components/TransactionIssue";
import TransactionListAll from "../components/TransactionListAll";
import TransactionRent from "../components/TransactionRent";

export default function Transactions() {
    return (
        <div>
            <TransactionListAll />
            <TransactionIssue />
            <TransactionHistory />
            <TransactionRent />
        </div>
    );
}