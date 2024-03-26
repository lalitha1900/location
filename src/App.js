import { useState, useEffect } from "react";
export default function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cites, setCites] = useState([]);
  const [selectedcountries, setSelectedCountries] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedcountry, setSelectedCountry] = useState("");
  var getCountries = async function () {
    var response = await fetch(
      " https://crio-location-selector.onrender.com/countries"
    );
    if(response.ok){
    var data = await response.json();
    setCountries(data);
    console.log(data);
    }
  };

  async function onChangeCountry(e) {
    console.log("check" + e.target.value);
    setSelectedCountry(e.target.value);
    setSelectedState("");
    setSelectedCity("");
    document.getElementById("textDisplay").style.display = "none";
    await getStates(e.target.value);
  }
  var getStates = async function (country) {
    var response = await fetch(
      "https://crio-location-selector.onrender.com/country=" +
        country +
        "/states"
    );
    if (response.ok) {
      var data = await response.json();
      setStates(data);
      document
        .getElementsByClassName("stateClass")[0]
        .removeAttribute("disabled");
      console.log(data);
    }
  };

  async function onChangeState(e) {
    console.log("check");
    setSelectedState(e.target.value);
    setSelectedCity("");
    document.getElementById("textDisplay").style.display = "none";
    await getCites(e.target.value);
  }

  var getCites = async function (stateName) {
    var response = await fetch(
      "https://crio-location-selector.onrender.com/country=" +
        selectedcountry +
        "/state=" +
        stateName +
        "/cities"
    );
    if (response.ok) {
      var data = await response.json();
      setCites(data);
      document
        .getElementsByClassName("cityClass")[0]
        .removeAttribute("disabled");
      console.log(data);
    }
  };
  function onChangeCity(value){
    setSelectedCity(value);
    document.getElementById("textDisplay").style.display = "block";
  }
  useEffect(() => {
    getCountries();
  }, [selectedcountries]);
  return (
    <div className="city-selector">
      <h1>Select Location</h1>
      <div className="dropdowns">
        <select
          value={selectedcountry}
          onChange={(e) => onChangeCountry(e)}
          className="dropdown"
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select
          value={selectedState}
          onChange={(e) => onChangeState(e)}
          className="dropdown stateClass"
          disabled
        >
          <option value="" disabled>
            Select State
          </option>
          {selectedcountry &&
            states.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
        </select>
        <select
          value={selectedCity}
          onChange={(e) => onChangeCity(e.target.value)}
          className="dropdown cityClass"
          disabled
        >
          <option value="" disabled>
            Select City
          </option>
          {cites.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div id="textDisplay" style={{display:'none'}}>You selected {selectedCity},{selectedState},{selectedcountry}</div>
    </div>
  );
}
