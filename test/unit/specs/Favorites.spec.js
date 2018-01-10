import Favorites from '@/utils/favorites'

describe('Favorites.js', () => {
  it('should have an empty favorites list', () => {
  	let favorites = new Favorites()
    expect(favorites.get())
    .toEqual({})
  })
})
