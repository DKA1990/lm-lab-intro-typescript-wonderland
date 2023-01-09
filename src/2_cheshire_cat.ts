import { endAdventure } from '..';
import { askQuestion, clear, print } from '../console';
import { attendATeaParty } from './3_tea_party';

const expressions = [
	'☹ Frown ☹',
	'🙂 Smile 🙂',
	'😁 Grin 😁',
	'😶 Blank Face 😶',
	'😡 Angry Face 😡',
] as const; // 💡 CURIOUS - see activity_2.md for explanations
type FacialExpression = typeof expressions[number];

class CheshireCat {
	name: string = 'The Cheshire Cat';
	expression: FacialExpression = expressions[0];
}

export function meetTheCheshireCat(): void {
	clear(true);

	const theCat = new CheshireCat();

	// 👉 FIXME ❌
	theCat.expression = '😁 Grin 😁';
	// 👉 END FIXME ❌

	print(
		`You can see ${theCat.name}. A wide ${theCat.expression} is hovering in the air.`
	);

	if (theCat.expression === '😁 Grin 😁') {
		print(
			`🥳 The cat allows you to continue onwards. There is the sound of a party in the distance... 🥳 `
		);
		return askQuestion('Press ENTER to continue! ', attendATeaParty);
	} else {
		print(`😱 The cat will not allow you to pass. 😱 `);
		return endAdventure();
	}
}
