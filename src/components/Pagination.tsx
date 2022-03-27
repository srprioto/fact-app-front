import { BiCaretLeft, BiCaretRight } from "react-icons/bi";

interface paginate {
    getData:Function;
    previous:string;
    currentPage?:number;
    next:string;
    searchState?:boolean;
}

export const Pagination = ({ getData, previous, currentPage, next, searchState }:paginate) => {

    return (
        <div className="pagination">

            {
                !searchState
                && (
                    <div className="grid-3 gap mt-25">
                        <div />
                        <div className="grid-5 gap">
                            <div />
                            {
                                previous
                                ? <button 
                                    onClick={() => getData(previous)}
                                    className="btn btn-primary"
                                ><BiCaretLeft /></button>
                                : <div />
                            }
                            
                            {
                                previous == "" && next == ""
                                ? <h3></h3>
                                : <h3 className="middle primary">{ currentPage }</h3>
                            }                            

                            {
                                next
                                ? <button 
                                    onClick={() => getData(next)}
                                    className="btn btn-primary"
                                ><BiCaretRight /></button>
                                : <div />
                            }
                            <div />
                        </div>
                        <div />
                    </div>
                )
            }

        </div>
    )
};
