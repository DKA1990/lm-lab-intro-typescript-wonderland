import { endAdventure, haveAdventures } from '..';
import { askQuestion, clear, print } from '../console';

interface RoomItemInterface {
    name: string;
    outcome: string;
    youDied: boolean;
    progress: () => boolean;
    examine: () => void;
}

type RoomItems = RoomItemInterface[];

const room: RoomItems = [
    {
        name: 'Bookcase',
        outcome: 'You examine the bookcase. Your books are in disarray and there is a red handprint on the shelf.',
        youDied: false,
        progress: () => false,
        examine: () => print(room[0].outcome),
    },
    {
        name: 'Bedroom Door',
        outcome: 'You crack the door slightly and peek through. The house is as much of a mess as your bedroom. You push forward...',
        youDied: false,
        progress: () => true,
        examine: () => print(room[1].outcome)
    },
    {
        name: 'Cupboard',
        outcome: 'You move closer to the cupboard door. As you get closer you seem a hand hanging out from the bottom of the unhinged door. \r\nBefore you can get a closer look the hand grabs your ankle!!',
        youDied: true,
        progress: () => false,
        examine: () => print(room[2].outcome)
    },
    {
        name: 'Tarts',
        outcome: 'Hmm... A tray of tarts. Curious. There are more pressing matters than enjoying a tart!',
        youDied: false,
        progress: () => false,
        examine: () => print(room[3].outcome)
    }];

export function viewSurroundings(): void {
    clear(true);
	print('Wait... where am I?');

    print('Your bed is different...');
    print('Your room has changed... ');
    print('Things are out of place or broken. What has happened here?');
    pickSurroundings();
}

function pickSurroundings(): void {
    room.forEach((h, i) => print(`   ${i} - ${h.name}`));
    askQuestion('What part of your room would you like to examine?', examinedObject);  
}

function examinedObject(roomItemNo: string): void {
    const num = parseInt(roomItemNo);

	if (isNaN(num)) {
        clear(true);
		print(`😮`);
		print(`That's not a number 😭`);
		return pickSurroundings();
	}

	if (num < 0 || num > room.length - 1) {
        clear(true);
		print(`😮`);
		print(`${num} is an invalid number 😭`);
		return pickSurroundings();
	}

    room[num].examine();

    if (room[num].progress()) {
        print('✅ CONGRATULATIONS! You successfully made it through Wonderland and a door! 🥳')
        return askQuestion('Press ENTER to re-enter Wonderland! ', haveAdventures);
    } else {
        if (room[num].youDied) {
            return endAdventure();
        } else {
            print('');
            return pickSurroundings();
        }
    }

}