const Persons = ({ filteredPhoneBook, deletePerson }) => {
    return (
    <ul>
      {filteredPhoneBook.map(person =>
      <li key={person.name}>
        {person.name} {person.number}
        <button onClick={() => deletePerson(person.id)}>delete</button>
      </li>)}
    </ul>
    )
}

export default Persons