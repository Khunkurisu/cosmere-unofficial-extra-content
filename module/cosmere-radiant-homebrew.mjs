import { radiantSkills } from './skills.mjs';

let workbenchFound = true;

Hooks.once('init', () => {
	if (!game.modules.get('cosmere-rpg-workbench')) {
		workbenchFound = false;
		console.log("Cosmere RPG Workbench not found, registering skills manually.");
		radiantSkills.forEach((skill) => {
			cosmereRPG.api.registerSkill(skill);
		});
	}
});

Hooks.once('ready', () => {
	if (!workbenchFound) {
		radiantSkills.forEach((skill) => {
			game.i18n.translations.COSMERE.Skill[skill.id] = skill.label;
		});
	}
});

Hooks.once('customSkillRegistry', (customSkills) => {
	radiantSkills.forEach((skill) => {
		if (!customSkills.find((s) => s.id === skill.id)) {
			customSkills.push(skill);
		}
	});
});
