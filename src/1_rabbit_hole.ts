import { endAdventure } from '..';
import { meetTheCheshireCat } from './2_cheshire_cat';
import { clear, print, askQuestion } from '../console';

// NOTE: making a custom type from an array can be very useful
const holes = ['Badger', 'Fox', 'Swiss Cheese', 'Donut', 'Rabbit'] as const; // 👉 FIXME ❌
// hover 'Hole' in the below line and see that it's now defined as the union of whatever is in the 'holes' array
type Hole = typeof holes[number];

export function enterTheRabbitHole(name: string) {
	clear(false);
	print('------------------------');
	print(`🥳 Welcome ${name}! 🥳`);
	print('------------------------');
	print('You can see a number of holes: ');
	holes.forEach((h, i) => print(`   ${i} - ${h}`));
	askQuestion('Which number hole will you choose?', enterHole);
}

export function enterHole(hole: string): void {
	clear(true);

	//  it might seem like we know this is a number, but of course the user can enter any nonsense to the prompt!
	const number = parseInt(hole);

	if (isNaN(number)) {
		print(`😮`);
		print(`That's not a number 😭`);
		return endAdventure();
	}

	if (number < 0 || number > holes.length - 1) {
		print(`😮`);
		print(`${number} is an invalid number 😭`);
		return endAdventure();
	}

	if (holes[number] === 'Rabbit') {
		return meetTheCheshireCat();
	} else {
		print(`WHAAAAT ❓🤯😅❓`);
		print(`You can't find adventures down a ${holes[number]} hole!`);
		return endAdventure();
	}
}
