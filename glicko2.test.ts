import { Glicko2, Player, Race } from "./glicko2";

describe("Glicko2 Class", () => {
    test("Is Glicko2 an object when initialized", () => {
        expect(typeof new Glicko2()).toBe("object");
    });

    test("Create player", () => {
        const Glicko = new Glicko2();

        const player = Glicko.makePlayer();
        expect(Glicko.players_index).toBe(1);
        expect(JSON.stringify(Glicko.players)).toBe(
            JSON.stringify({
                "0": player,
            })
        );
    });

    test.todo("Create match");

    test.todo("Update ratings");
});

describe("Player class", () => {
    test("Is Player an object when initialized", () => {
        expect(typeof new Player(1, 1, 1, 1)).toBe("object");
    });

    test.todo("Add result");

    test.todo("Update rank");
});

describe("Race class", () => {
    test("Create a race with no equal result", () => {
        const player1 = new Player(1500, 350, 0.06, 0.5);
        const player2 = new Player(1500, 350, 0.06, 0.5);
        const player3 = new Player(1500, 350, 0.06, 0.5);
        expect(
            JSON.stringify(new Race([[player1], [player2], [player3]]).matches)
        ).toBe(
            JSON.stringify([
                [player1, player2, 1],
                [player1, player3, 1],
                [player2, player3, 1],
            ])
        );
    });

    test("Create a race with players with equal result", () => {
        const player1 = new Player(1500, 350, 0.06, 0.5);
        const player2 = new Player(1500, 350, 0.06, 0.5);
        const player3 = new Player(1500, 350, 0.06, 0.5);
        expect(
            JSON.stringify(new Race([[player1], [player2, player3]]).matches)
        ).toBe(
            JSON.stringify([
                [player1, player2, 1],
                [player1, player3, 1],
                [player2, player3, 0.5],
            ])
        );
    });
});
