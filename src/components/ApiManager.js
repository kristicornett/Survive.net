export const createNewUser = (user) => {
    return fetch('http://localhost:8088/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
}

export const getUserByEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
            .then(response => response.json())
}

export const getTowns = () => {
    return fetch('http://localhost:8088/towns')
            .then(response => response.json())
}

export const getZombieSightings = () => {
    return fetch('http://localhost:8088/zombieSightings?_expand=town&_expand=zombieSightingType&_expand=zombieSightingDistance&_expand=zombieSightingStatus')
            .then(response => response.json())
}

export const getUsers = () => {
    return fetch('http://localhost:8088/users')
           .then(response => response.json())
}

export const createZombieSighting = (zombieSightingToSendToAPI) => {
    return fetch('http://localhost:8088/zombieSightings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(zombieSightingToSendToAPI)
    })
        .then(response => response.json())

}

export const updateZombieSighting = (zombieSighting) => {
    return fetch(`http://localhost:8088/zombieSightings/${zombieSighting.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(zombieSighting)
    })
        .then(response => response.json())
}

export const deleteZombieSighting = (zombieSighting) => {
    return fetch(`http://localhost:8088/zombieSightings/${zombieSighting.id}`, {
        method: 'DELETE'
    })
}

export const getDistances = () => {
    return fetch('http://localhost:8088/zombieSightingDistances')
        .then(response => response.json())
}

export const getZombieSightingTypes = () => {
    return fetch('http://localhost:8088/zombieSightingTypes')
           .then(response => response.json())
}

export const createNewTown = (newTownToSendToAPI) => {
    return fetch('http://localhost:8088/towns', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTownToSendToAPI)
    })
        .then(response => response.json())
}
