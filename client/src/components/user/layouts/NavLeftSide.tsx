import React, { useState } from 'react'
import {
    Combobox,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
  } from "@headlessui/react";
  
  interface Person {
    id: number;
    name: string;
  }
  
  const people: Person[] = [
    { id: 1, name: "location" },
    { id: 2, name: "Kochi" },
    { id: 3, name: "Therese Wunsch" },
    { id: 4, name: "Benedict Kessler" },
    { id: 5, name: "Katelyn Rohan" },
  ];
  
const NavLeftSide = () => {

    const [selectedPerson, setSelectedPerson] = useState<Person>(people[0]);
  const [query, setQuery] = useState<string>("");

  const filteredPeople: Person[] =
    query === ""
      ? people
      : people.filter((person: Person) =>
          person.name.toLowerCase().includes(query.toLowerCase())
        );
  return (
    <div className="lg:flex items-center text-[14px] px-10 ">
    <Combobox
      value={selectedPerson}
      onChange={(person: Person | null) =>
        person && setSelectedPerson(person)
      }
      onClose={() => setQuery("")}
    >
      <ComboboxInput
      className="w-44 focus:outline-none border border-gray-400 p-2 h-8"
        aria-label="Assignee"
        displayValue={(person: Person | null) => person?.name || ""}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(event.target.value)
        }
      />
      <ComboboxOptions anchor="bottom" className="empty:hidden w-44 bg-white  shadow-xl shadow-black text-[15px] font-bold font-sans  p-2 ">
        {filteredPeople.map((person: Person) => (
          <ComboboxOption
            key={person.id}
            value={person}
            className="data-[focus]:bg-blue-100"
          >
            {person.name}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  </div>
  )
}

export default NavLeftSide
