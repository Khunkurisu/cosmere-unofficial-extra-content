import { radiantSkills } from './skills.mjs';

Hooks.once('init', () => {
	globalThis.cosmereHomebrewRadiants = Object.assign(
		game.modules.get('cosmere-radiant-homebrew')
	);
	if (game.modules.get('cosmere-rpg-workbench') && game.modules.get('cosmere-rpg-workbench').active) {
		Hooks.once('customSkillRegistry', (customSkills) => {
			radiantSkills.forEach((skill) => {
				if (!customSkills.find((s) => s.id === skill.id)) {
					console.log(skill);
					customSkills.push(skill);
				}
			});
		});
	} else {
		console.log("Cosmere RPG Workbench not found, registering skills manually.");
		radiantSkills.forEach((skill) => {
			if (!CONFIG.COSMERE.skills[skill]) {
				cosmereRPG.api.registerSkill(skill);
			}
		});
	}
});

Hooks.once('ready', () => {
	if (!(game.modules.get('cosmere-rpg-workbench') && game.modules.get('cosmere-rpg-workbench').active)) {
		radiantSkills.forEach((skill) => {
			game.i18n.translations.COSMERE.Skill[skill.id] = skill.label;
		});
	}
});
