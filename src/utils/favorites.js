class Favorites {
  constructor () {
    let storedFavorites = this._getFromLocalStorage()
    if (storedFavorites && typeof storedFavorites !== 'undefined') {
      this.favorites = storedFavorites
    } else {
      this.favorites = {}
    }

    this._updateLocalStorage()
    return this
  }

  _getFromLocalStorage () {
    return JSON.parse(localStorage.getItem('yelpAroundFavorites'))
  }

  get () {
    return this.favorites
  }

  _updateLocalStorage () {
    localStorage.setItem('yelpAroundFavorites', JSON.stringify(this.favorites))
  }

  add (business) {
    this.favorites[business.id] = business
    this._updateLocalStorage()
  }

  remove (business) {
    this.favorites[business.id] = undefined
    this._updateLocalStorage()
  }

  isFavorite (business) {
    return typeof this.favorites[business.id] !== 'undefined'
  }
}

export default Favorites
