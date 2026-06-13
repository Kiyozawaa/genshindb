export default function Search({setQuery, type}) {
  let totalFilters = 0;
  return (
    <div className='search'>
      <input
        className='search__input'
        type='text' placeholder={`Search ${type}...`}
        onChange={e => setQuery(e.target.value)}
      />
      <button 
        className='search__button'
        onClick={e => setModal(!modal)}>
        Filters &nbsp;
        {totalFilters > 0 && <>({totalFilters})</>}
      </button>
    </div>
  );
}