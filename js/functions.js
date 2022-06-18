const DATA = `<html><head><title>Gulliver Traveller - Roteiros</title></head>
<body>
<b>->1 - Roteiros para *São Paulo*</b>
<br>A Terra da Garoa!
<br>
Fundada em 25 de janeiro de 1554 a cidade tem hoje cerca de 12 milhões de habitantes e é considerada o centro financeiro
do Brasil e aqui vão 3 dicas de roteiros obrigatórios para aqueles que passam pela capital paulista
<br>
#Roteiro A | Região: Avenida Paulista
<br>
MASP; Parque Trianon; Rua Augusta
<br>
#Roteiro B | Região: Centro
<br>
Catedral da Sé; Pátio do Colégio; Rua Augusta
<br>
#Roteiro C | Região: Vila Madalena
<br>
Beco do Batman; Feirinha da Benedito Calixto; Livraria da Vila
<br>
 <b>
 ->2 - Roteiros para *Las Vegas*
 </b>
 <br>
 Viva Las Vegas!
 <br>
A cidade mais populosa e mais densamente povoada do estado de Nevada, Las Vegas foi fundada em 1905 e é considerada uma
cidade, oficialmente, desde 1911 e conta com mais de meio milhão de habitantes. Venha conhecer a capital dos jogos de
azar!
<br>
#Roteiro A | Região: Las Vegas Boulevard South
<br>
Fonte do Bellagio; Principais Cassinos; Madame Tussauds
<br>
#Roteiro B | Região: Downtown
<br>
; Fremont; Las Vegas Art Museum; Museu nacional do Crime Organizado;
<br>
#Roteiro C | Região: Las Vegas Boulevard North
<br>
Outlet Premium North; Stratosphere; Apple Fashion Show
<br>
<b>
->3 - Roteiros para *Moscou*
</b>
<br>
Privet!
<br>
A capital Russa fica situada às margens do Rio Moscou e apesar de ser a cidade mais cosmopolita da Rússia, conta com
grande resguardo de sua história soviética
<br>
#Roteiro A | Região: Praça Vermelha
<br>
Museu Histórico do Estado; Catedral de São Basílico; Mausoléu de Lênin
<br>
#Roteiro B | Região: Centro
<br>
Teatro Bolshoi; Monumento a Karl Marx; Rio Moscou
<br>
#Roteiro C | Região: Obras pela cidade
<br>
Metrô de Moscou; As Sete Irmãs; Moscow Leningradsky Railway Station
<br>
</body>
</html>`;

let dataElements = DATA.split('->');

dataElements.shift();

dataElements.forEach((value, key) => {
    let cityName, cityItineraries, itinerariesQty, spNamesCenter, downTown, dataDisplay;

    cityName = _getName(key);
    cityItineraries = _getItineraryA(key);
    itinerariesQty = _getQtyLocales(key);
    if (key === 0) {
        spNamesCenter = _getSpCenterNames(key);
    }
    if (key === 1) {
        downTown = _getLADowntownNames(key);
    }

    _pushDataArray(cityName, cityItineraries, itinerariesQty, spNamesCenter, downTown, key);
});

function _getName(key) {
    return dataElements[key].split('*')[1];
}

function _getItineraryA(key) {
    let data = dataElements[key].split('#')[1];
    let result = data.replace(/<br>/g, "");
    result = result.replace(/(^[ \t]*\n)/gm, "");
    return result;
}

function _getQtyLocales(key) {
    let data = dataElements[key];
    data = data.split('<br>')[4];
    data = data.trim();
    data = data.split(';');
    return data.length;
}

function _getSpCenterNames(key) {
    let data = dataElements[key].split('<br>')[4].trim();
    data = data.split(';');

    return data;
}

function _getLADowntownNames(key) {
    let data = dataElements[key];
    data = data.split('#');
    data.shift();

    data.forEach(function(value, index) {
        let isDownton = value.search('Downtown')

        if (isDownton !== -1) {
            data = value.split(';');
            data.shift();
            data.pop();
        }
    })

    return data;
}

function _pushDataArray(cityName, cityItineraries, itinerariesQty, spNamesCenter, downTown, key) {
    let cardCities, cardCitiesTitle, cardCitiesItinerary, cardCitiesPlaces, spCenterPLaces, vegasDowntown;
    let element = document.getElementById('rated-cities');

    cardCities = document.createElement('div');
    cardCities.classList.add('city-card');

    cardCitiesTitle = document.createElement('h2');
    cardCitiesTitle.innerText = cityName;

    cardCitiesItinerary = document.createElement('div');
    cardCitiesItinerary.classList.add('city-itinerary');
    cardCitiesItinerary.innerText = cityItineraries;

    cardCitiesPlaces = document.createElement('div');
    cardCitiesPlaces.classList.add('itinerary-qty-places');
    cardCitiesPlaces.innerText = itinerariesQty + ' Lugares para visitar';

    if (cityName === 'São Paulo') {
        spCenterPLaces = document.createElement('div');
        spCenterPLaces.classList.add('sp-center');
        spCenterPLaces.innerText = spNamesCenter;
    }

    if (cityName === 'Las Vegas') {
        vegasDowntown = document.createElement('div');
        vegasDowntown.classList.add('vegas-downtown');
        vegasDowntown.innerText = downTown;
    }

    element.append(cardCities);
    cardCities.appendChild(cardCitiesTitle);
    cardCities.append(cardCitiesItinerary);
    cardCities.append(cardCitiesPlaces);
    if (cityName === 'São Paulo') {
        cardCities.append(spCenterPLaces);
    }
    if (cityName === 'Las Vegas') {
        cardCities.append(vegasDowntown);
    }
}