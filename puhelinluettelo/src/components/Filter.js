const Filter = ({ filteredName, handleFilter }) => {
    return (
      <form>
        <div>
          filter shown with <input value={filteredName} onChange={handleFilter} />
        </div>
      </form>
    )
}

export default Filter
