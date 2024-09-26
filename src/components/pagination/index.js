import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import usePagination, {DOTS} from '../../store/use-pagination';
import './style.css';

function Pagination(props) {
  const {
    setNumberPage,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    totalCount,
    currentPage,
    siblingCount,
    pageSize
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const cn = bem('Pagination');
  return (
    <ul className={cn()}>
      {paginationRange.map((pageNum, index) => {
        if (pageNum === DOTS) {
          return <li className={cn('item dots')} key={pageNum + index}>&#8230;</li>
        }

        return (
          <li
            className={cn('item', {selected: pageNum === currentPage})}
            key={pageNum}
            onClick={() => {
              setNumberPage(pageNum)
            }}
          >
          {pageNum}
          </li>
        )
      })}
    </ul>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  totalCount: PropTypes.number,
  setNumberPage: PropTypes.func,
  siblingCount: PropTypes.number,
};

Pagination.defaultProps = {
  setNumberPage: (num) => {},
}

export default memo(Pagination);