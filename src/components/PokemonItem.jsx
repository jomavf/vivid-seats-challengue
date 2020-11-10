import React from "react";
import "../App.css";

export const PokemonItem = ({
  urlImage = "",
  nameFound = "",
  name = "",
  types = [],
}) => {
  function trasformName() {
    if (!name.toLowerCase().includes(nameFound.toLowerCase())) {
      return <span>{name}</span>;
    }

    let beforeName = "";
    let afterName = "";
    let _nameFound = "";
    const firstIndex = name.toLowerCase().search(nameFound.toLowerCase());
    const lastIndex = firstIndex + nameFound.length;
    for (let i = 0; i < name.length; i++) {
      // Omanyte
      // O m a n y t e
      // 0 1 2 3 4 5 6 7 8
      if (i < firstIndex) {
        beforeName += name[i];
      } else if (i >= lastIndex) {
        afterName += name[i];
      } else {
        _nameFound += name[i];
      }
    }
    return (
      <>
        {beforeName}
        <span className="hl">{_nameFound}</span>
        {afterName}
      </>
    );
  }
  return (
    <>
      <img src={urlImage} alt="" />
      <div className="info">
        <h1>{trasformName(name)}</h1>
        {types.map((type, index) => {
          return (
            <span key={index} className={`type ${type.toLowerCase()}`}>
              {type}
            </span>
          );
        })}
      </div>
    </>
  );
};
