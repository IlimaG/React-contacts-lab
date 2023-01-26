import { useState } from "react";
import contacts from "../contacts.json";


const FirstContacts = () => {

    const fiveContacts = contacts.slice(0, 5);

    const [contactsArr, setContactArr] = useState(fiveContacts)

    const allContacts = contacts.slice(5, (contacts.length));

    const addNewContacts = () => {
        let randomContac = Math.floor(Math.random() * allContacts.length) - 1;
        let newContact = allContacts.splice(randomContac, 1)
        setContactArr([...contactsArr, newContact[0]])
        allContacts.splice(randomContac, 1)
    }

    const sortByPopularity = () => {
        let copyContacts = [...contactsArr]
        copyContacts.sort((a, b) => b.popularity - a.popularity)
        setContactArr(copyContacts);
    }


    const sortByName = () => {
        let copyContacts = [...contactsArr]

        copyContacts.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        })


        setContactArr(copyContacts);
    }



    return (
        <div>
            <button onClick={addNewContacts} >Add Random Contact</button>
            <button onClick={sortByPopularity} >Sort by popularity</button>
            <button onClick={sortByName} >Sort by name</button>
            <table>
                <thead>
                    <tr>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Popularity</th>
                        <th>Won an Oscar</th>
                        <th>Won an Emmy</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {contactsArr.map((cont) => {
                        return (
                            <tr key={cont.id}>
                                <td><img src={cont.pictureUrl} alt={cont.name} /></td>
                                <td>{cont.name}</td>
                                <td>{cont.popularity.toFixed(2)}</td>
                                <td>{(cont.wonOscar) ? "🏆" : null}</td>
                                <td>{(cont.wonEmmy) ? "🌟" : null}</td>
                                <td><button onClick={(contactID) => {

                                    contactID = cont.id
                                    const filteredContacts = contactsArr.map(contact => {
                                        if (contact.id === contactID) {
                                            filteredContacts.splice(filteredContacts.indexOf(contact), 1)
                                        }
                                        setContactArr(filteredContacts)
                                    }) 
                                }}>DELETE</button></td>
                            </tr>
                        )
                    })

                    }
                </tbody>
            </table>
        </div>

    )





}

export default FirstContacts