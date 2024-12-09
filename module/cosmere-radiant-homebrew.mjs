import { radiantSkills } from './skills.mjs';

Hooks.once('init', () => {
	globalThis.cosmereHomebrewRadiants = Object.assign(
		game.modules.get('cosmere-radiant-homebrew')
	);
	if (!cosmereWorkbench) {
		console.log("Cosmere RPG Workbench not found, registering skills manually.");
		radiantSkills.forEach((skill) => {
			cosmereRPG.api.registerSkill(skill);
		});
	}
});

Hooks.once('ready', () => {
	if (!cosmereWorkbench) {
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
