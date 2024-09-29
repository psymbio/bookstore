import BookAddForm from "../components/BookAddForm";
import BookGlobalSearch from "../components/BookGlobalSearch";
import BookListAll from "../components/BookListAll";
import BookRentRange from "../components/BookRentRange";
import BookSearch from "../components/BookSearch";

export default function Books() {
    return (
        <div>
            <BookAddForm />
            <BookListAll />
            <BookSearch />
            <BookRentRange />
            <BookGlobalSearch />
        </div>
    );
}