
const pokemonList = document.querySelector('.pokemons')
const pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon'

const typeColors = {
	fire: '#ee8130',
	flying: '#a98ff3',
	water: '#6390f0',
	grass: '#7ac74c',
	electric: '#f7d02c',
	psychic: '#f95587',
	ice: '#96d9d6',
	dragon: '#6f35fc',
	dark: '#705746',
	fairy: '#d685ad',
	normal: '#a8a77a',
	fighting: '#c22e28',
	poison: '#a33ea1',
	ground: '#e2bf65',
	rock: '#b6a136',
	bug: '#a6b91a',
	ghost: '#735797',
	steel: '#b7b7ce'
}

function formatPokemonName(name) {
	return name
		.split('-')
		.map(part => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ')
}

function closePokemonDetails() {
	const modal = document.querySelector('.pokemon-modal')
	if (modal) modal.remove()
	document.body.classList.remove('modal-open')
}

function createPokemonModal(pokemon) {
	const modal = document.createElement('div')
	modal.className = 'pokemon-modal'
	modal.setAttribute('role', 'dialog')
	modal.setAttribute('aria-modal', 'true')
	modal.setAttribute('aria-label', `Detalhes de ${formatPokemonName(pokemon.name)}`)

	const backdrop = document.createElement('div')
	backdrop.className = 'pokemon-modal__backdrop'

	const card = document.createElement('article')
	card.className = 'pokemon-details'

	const primaryType = pokemon.types[0].type.name
	card.style.setProperty('--pokemon-primary-type', typeColors[primaryType] || '#49d0b0')

	const closeButton = document.createElement('button')
	closeButton.className = 'pokemon-details__close'
	closeButton.type = 'button'
	closeButton.setAttribute('aria-label', 'Fechar detalhes')
	closeButton.textContent = '×'

	const header = document.createElement('header')
	header.className = 'pokemon-details__header'

	const identity = document.createElement('div')
	const number = document.createElement('span')
	number.className = 'pokemon-details__number'
	number.textContent = `#${String(pokemon.id).padStart(3, '0')}`

	const name = document.createElement('h2')
	name.textContent = formatPokemonName(pokemon.name)

	const speciesName = document.createElement('p')
	speciesName.className = 'pokemon-details__species'
	speciesName.textContent = 'Carregando descrição...'
	identity.append(number, name, speciesName)

	const image = document.createElement('img')
	image.className = 'pokemon-details__image'
	image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`
	image.alt = formatPokemonName(pokemon.name)
	header.append(identity, image)

	const types = document.createElement('div')
	types.className = 'pokemon-details__types'
	pokemon.types.forEach(({ type }) => {
		const typeElement = document.createElement('span')
		typeElement.className = 'pokemon-details__type'
		typeElement.style.backgroundColor = typeColors[type.name] || '#49d0b0'
		typeElement.textContent = type.name.toUpperCase()
		types.append(typeElement)
	})

	const measurements = document.createElement('div')
	measurements.className = 'pokemon-details__measurements'
	measurements.innerHTML = `
		<p><strong>Altura</strong><span>${(pokemon.height / 10).toLocaleString('pt-BR')} m</span></p>
		<p><strong>Peso</strong><span>${(pokemon.weight / 10).toLocaleString('pt-BR')} kg</span></p>
	`

	const stats = document.createElement('section')
	stats.className = 'pokemon-details__stats'

	const statsTitle = document.createElement('h3')
	statsTitle.textContent = 'Atributos-base'
	stats.append(statsTitle)

	const statNames = {
		hp: 'HP',
		attack: 'Ataque',
		defense: 'Defesa',
		'special-attack': 'Ataque especial',
		'special-defense': 'Defesa especial',
		speed: 'Velocidade'
	}

	pokemon.stats.forEach(({ base_stat, stat }) => {
		const statRow = document.createElement('div')
		statRow.className = 'pokemon-details__stat'

		const label = document.createElement('div')
		label.className = 'pokemon-details__stat-label'
		label.innerHTML = `<span>${statNames[stat.name] || stat.name}</span><strong>${base_stat}</strong>`

		const track = document.createElement('div')
		track.className = 'pokemon-details__stat-track'
		const value = document.createElement('span')
		value.style.width = `${Math.min((base_stat / 180) * 100, 100)}%`
		track.append(value)
		statRow.append(label, track)
		stats.append(statRow)
	})

	const abilities = document.createElement('section')
	abilities.className = 'pokemon-details__abilities'
	const abilitiesTitle = document.createElement('h3')
	abilitiesTitle.textContent = 'Habilidades'
	abilities.append(abilitiesTitle)

	const abilitiesList = document.createElement('div')
	abilitiesList.className = 'pokemon-details__abilities-list'
	pokemon.abilities.forEach(({ ability, is_hidden }) => {
		const abilityElement = document.createElement('span')
		abilityElement.textContent = formatPokemonName(ability.name)
		if (is_hidden) {
			abilityElement.classList.add('hidden')
			abilityElement.title = 'Habilidade oculta'
		}
		abilitiesList.append(abilityElement)
	})
	abilities.append(abilitiesList)

	card.append(closeButton, header, types, measurements, stats, abilities)
	modal.append(backdrop, card)
	document.body.append(modal)
	document.body.classList.add('modal-open')

	closeButton.focus()
	backdrop.addEventListener('click', closePokemonDetails)
	closeButton.addEventListener('click', closePokemonDetails)

	return speciesName
}

async function openPokemonDetails(pokemon) {
	const speciesName = createPokemonModal(pokemon)

	try {
		const speciesResponse = await fetch(pokemon.species.url)
		if (!speciesResponse.ok) throw new Error('Não foi possível carregar a espécie.')
		const species = await speciesResponse.json()

		const description = species.flavor_text_entries.find(entry =>
			entry.language.name === 'pt'
		) || species.flavor_text_entries.find(entry =>
			entry.language.name === 'en'
		)

		speciesName.textContent = description
			? description.flavor_text.replace(/\f|\n/g, ' ')
			: formatPokemonName(pokemon.name)
	} catch (error) {
		console.error(error)
		speciesName.textContent = formatPokemonName(pokemon.name)
	}
}

function createPokemonElement(pokemon) {
	const pokemonElement = document.createElement('li')
	pokemonElement.classList.add('pokemon')
	pokemonElement.tabIndex = 0
	pokemonElement.setAttribute('role', 'button')
	pokemonElement.setAttribute('aria-label', `Ver detalhes de ${formatPokemonName(pokemon.name)}`)

	pokemonElement.addEventListener('click', () => openPokemonDetails(pokemon))
	pokemonElement.addEventListener('keydown', event => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault()
			openPokemonDetails(pokemon)
		}
	})

	const number = document.createElement('span')
	number.classList.add('number')
	number.textContent = `#${String(pokemon.id).padStart(3, '0')}`

	const name = document.createElement('span')
	name.classList.add('name')
	name.textContent = formatPokemonName(pokemon.name)

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

document.addEventListener('keydown', event => {
	if (event.key === 'Escape') closePokemonDetails()
})
