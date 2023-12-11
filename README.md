# Cuiseur à riz en TypeScript

Ce projet est une simulation d'un cuiseur à riz utilisant TypeScript.

## Fonctionnalités

- Ajout de riz et d'eau dans le cuiseur.
- Démarrage de la cuisson du riz.
- Maintien au chaud une fois la cuisson terminée.
- Arrêt de la cuisson.

## Utilisation

1. **Installation des dépendances**

   Assurez-vous d'avoir Node.js installé. Ensuite, exécutez la commande suivante pour installer les dépendances :
	
	```bash
	npm install

2. **Exécution du code**

Pour lancer le cuiseur à riz, utilisez la commande suivante :

	```bash
	 npm start

3. **Exemple d'utilisation**

Modifiez le fichier `index.ts` pour personnaliser les actions du cuiseur à riz. Voici un exemple d'utilisation :

```typescript
const myRiceCooker = new RiceCooker();
myRiceCooker.addRice(2); // Ajouter 2 tasses de riz
myRiceCooker.addWater(4); // Ajouter 4 tasses d'eau
myRiceCooker.startCooking(); // Démarrer la cuisson
