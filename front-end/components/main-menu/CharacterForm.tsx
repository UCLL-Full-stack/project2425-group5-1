import CharacterService from "@/services/CharacterService";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const CharacterForm: React.FC = () => {
    const [name, setName] = useState("");
    const router = useRouter();

    function handleSubmit() {
        if (!name.length) return;
        const data = {
            name: name,
            level: 1,
            xp: 0,
            strength: 1,
            speed: 1,
            magic: 1,
            dexterity: 1,
            healthPoints: 10,
            manaPoints: 10,
            luck: 1,
            defense: 1,
            magicDefense: 1,
            progress: "1-1",
            userId: Number(localStorage.getItem("userId")),
        };
        CharacterService.postCharacterData(data);
        router.push("/dashboard");
    }

    function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <h1>Character Creator</h1>
            <label>
                <b>Name</b>
                <input
                    type="text"
                    placeholder="Enter Character Name"
                    name="name"
                    onChange={handleNameChange}
                    required
                />
            </label>
            <label>
                <b>Level</b>
                <input
                    type="number"
                    placeholder="Level"
                    name="level"
                    required
                    readOnly
                    value={1}
                />
            </label>
            <label>
                <b>Xp</b>
                <input
                    type="number"
                    placeholder="Xp"
                    name="xp"
                    required
                    readOnly
                    value={0}
                />
            </label>
            <label>
                <b>Strength</b>
                <input
                    type="number"
                    placeholder="Strength"
                    name="strength"
                    required
                    readOnly
                    value={1}
                />
            </label>
            <label>
                <b>Speed</b>
                <input
                    type="number"
                    placeholder="Speed"
                    name="speed"
                    required
                    readOnly
                    value={1}
                />
            </label>
            <label>
                <b>Magic</b>
                <input
                    type="number"
                    placeholder="Magic"
                    name="magic"
                    required
                    readOnly
                    value={1}
                />
            </label>
            <label>
                <b>Dexterity</b>
                <input
                    type="number"
                    placeholder="Dexterity"
                    name="dexterity"
                    required
                    readOnly
                    value={1}
                />
            </label>
            <label>
                <b>HP</b>
                <input
                    type="number"
                    placeholder="HP"
                    name="HP"
                    required
                    readOnly
                    value={10}
                />
            </label>
            <label>
                <b>MP</b>
                <input
                    type="number"
                    placeholder="MP"
                    name="mp"
                    required
                    readOnly
                    value={10}
                />
            </label>
            <label>
                <b>Luck</b>
                <input
                    type="number"
                    placeholder="Luck"
                    name="luck"
                    required
                    readOnly
                    value={1}
                />
            </label>
            <label>
                <b>Defense</b>
                <input
                    type="number"
                    placeholder="Defense"
                    name="defense"
                    required
                    readOnly
                    value={1}
                />
            </label>
            <label>
                <b>Magic Defense</b>
                <input
                    type="number"
                    placeholder="Magic Defense"
                    name="magic-defense"
                    required
                    readOnly
                    value={1}
                />
            </label>
            <button type="submit">Register</button>
        </form>
    );
};

export default CharacterForm;