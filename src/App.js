import './App.css'
import contacts from './contacts.json'

import React, { useState } from 'react'

function App() {
  const informationArr = [...contacts]

  let newArr = informationArr.filter((el, i) => {
    return i < 5
  })

  const [contactsArr, setcontactsArr] = useState(newArr)
  const [infoArr, setinfoArr] = useState(informationArr)

  const addRandom = event => {
    event.preventDefault()

    const random = Math.trunc(Math.random() * (infoArr.length - 5) + 5)

    let newContact
    newContact = infoArr[random]

    infoArr.splice(random, 1)

    setcontactsArr([...contactsArr, newContact])

    console.log('ES INFO ARRAY', infoArr)
    console.log('ES INFO CONTACT', contactsArr)
  }

  const sortPopularity = event => {
    event.preventDefault()

    let arrSort = contactsArr.sort((a, b) => {
      return b.popularity - a.popularity
    })

    setcontactsArr([...arrSort])
    console.log(arrSort)
  }

  const sortName = event => {
    event.preventDefault()
    let arrSort = contactsArr.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
    setcontactsArr([...arrSort])
    console.log('POR LETRA', arrSort)
  }

  const deleteContact = (event, nombre) => {
    console.log(nombre)
    event.preventDefault()
    let filterArr = contactsArr.filter(element => {
      return element.name !== nombre
    })
    console.log(filterArr)
    setcontactsArr([...filterArr])
  }

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button
        onClick={event => {
          addRandom(event)
        }}
      >
        Add Random Contact
      </button>

      <button
        onClick={event => {
          sortPopularity(event)
        }}
      >
        Sort by popularity
      </button>

      <button
        onClick={event => {
          sortName(event)
        }}
      >
        Sort by name
      </button>

      <table>
        <tbody>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
          </tr>

          {contactsArr.map((el, i) => {
            let oscar

            if (el.wonOscar) {
              oscar = '🏆 '
            } else {
              oscar = ' '
            }

            let Emmy

            if (el.wonEmmy) {
              Emmy = '🏆 '
            } else {
              Emmy = ''
            }

            return (
              <tr key={i}>
                <td>
                  {' '}
                  <img src={el.pictureUrl} width="200" height="200" />{' '}
                </td>
                <td> {el.name}</td>
                <td>{el.popularity}</td>
                <td>{oscar} </td>
                <td>{Emmy} </td>
                <td>
                  <button
                    onClick={event => {
                      deleteContact(event, el.name)
                    }}
                  >
                    Delete
                  </button>{' '}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App
