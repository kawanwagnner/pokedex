const PokemonName = document.querySelector(".pokemon-name");
const PokemonNumber = document.querySelector(".pokemon-number");
const PokemonImage = document.querySelector(".pokemon-img");

const form = document.querySelector(".form");
const input = document.querySelector(".input-search");
const buttonPrev = document.querySelector(".button-prev");
const buttonNext = document.querySelector(".button-next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const ApiPokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (ApiPokemon.status === 200) {
    const data = await ApiPokemon.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  PokemonName.innerHTML = "Loading...";
  PokemonNumber.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  if (data) {
    PokemonImage.style.display = "block";
    PokemonName.innerHTML = data.name;
    PokemonNumber.innerHTML = data.id;
    PokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    input.value = "";
    searchPokemon = data.id;
  } else {
    PokemonImage.style.display = "none";
    PokemonName.innerHTML = "Not Found :c";
    PokemonNumber.innerHTML = "";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
