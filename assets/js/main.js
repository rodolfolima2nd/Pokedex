
const pokemonList = document.querySelector('.pokemons')
const pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon'

function createPokemonElement(pokemon) {
	const pokemonElement = document.createElement('li')
	pokemonElement.classList.add('pokemon')

	const number = document.createElement('span')
	number.classList.add('number')
	number.textContent = `#${String(pokemon.id).padStart(3, '0')}`

	const name = document.createElement('span')
	name.classList.add('name')
	name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

	const detail = document.createElement('div')
	detail.classList.add('detail')

	const types = document.createElement('ol')
	types.classList.add('types')

	pokemon.types.forEach(({ type }) => {
		const typeElement = document.createElement('li')
		typeElement.classList.add('type')
		typeElement.textContent = type.name
		types.append(typeElement)
	})

	const image = document.createElement('img')
	image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`
	image.alt = name.textContent

	detail.append(types, image)
	pokemonElement.append(number, name, detail)
	return pokemonElement
}

async function loadPokemon() {
	try {
		const response = await fetch(`${pokemonApiUrl}?limit=151`)
		if (!response.ok) throw new Error('Não foi possível carregar a lista de Pokémon.')

		const { results } = await response.json()
		const pokemonDetails = []

		for (let index = 0; index < results.length; index += 20) {
			const batch = results.slice(index, index + 20)
			const batchDetails = await Promise.all(batch.map(async ({ url }) => {
				const pokemonResponse = await fetch(url)
				if (!pokemonResponse.ok) throw new Error('Não foi possível carregar os dados de um Pokémon.')
				return pokemonResponse.json()
			}))
			pokemonDetails.push(...batchDetails)
		}

		pokemonList.append(...pokemonDetails.map(createPokemonElement))
	} catch (error) {
		console.error('Erro ao carregar os Pokémon:', error)
	}
}

loadPokemon()
