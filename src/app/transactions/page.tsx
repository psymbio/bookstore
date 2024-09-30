import TransactionDateRange from "../components/TransactionDateRange";
import TransactionHistory from "../components/TransactionHistory";
import TransactionIssue from "../components/TransactionIssue";
import TransactionListAll from "../components/TransactionListAll";
import TransactionRent from "../components/TransactionRent";
import TransactionUser from "../components/TransactionUser";

export default function Transactions() {
    return (
        <div>
            <TransactionListAll />
            <TransactionIssue />
            <TransactionHistory />
            <TransactionRent />
            <TransactionUser />
            <TransactionDateRange />
        </div>
    );
}