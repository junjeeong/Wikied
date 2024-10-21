import { PaginationBarContainer } from "@/containers/PaginationBarContainer"

const Pagination = () => {
  return(

    <PaginationBarContainer totalCount={20} itemsPerPage={2} maxPage={7}/>
  )
}

export default Pagination;