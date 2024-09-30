import TransactionIssue from "../components/TransactionIssue";
import TransactionListAll from "../components/TransactionListAll";
import TransactionReturn from "../components/TransactionReturn";

export default function Transactions() {
    return (
        <div>
            <TransactionListAll />
            <TransactionIssue />
            <TransactionReturn />
        </div>
    );
}