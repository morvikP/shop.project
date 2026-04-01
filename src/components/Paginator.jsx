import left from "../assets/images/leftsearch.svg"
import right from "../assets/images/rightsearch.svg"

function Paginator({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="pagination1">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                <img src={left} alt="prev" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    className={currentPage === i + 1 ? "active1" : ""}
                    onClick={() => onPageChange(i + 1)}
                >
                    {i + 1}
                </button>
            ))}

            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                <img src={right} alt="next" />
            </button>
        </div>
    );
}

export default Paginator;
