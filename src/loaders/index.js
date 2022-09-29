import mongo from './mongo';
import dependencyInjector from './dependencyInjector';
import express from './express';

export default async ({ expressApp }) => {
	await mongo();
	dependencyInjector();
	express(expressApp);
};
