import * as readline from 'readline';

export class RiceCooker {
  private rice: number;
  private riceTest: number;
  private water: number;
  private waterTest: number;
  private isStartButtonPressed: boolean;
  private isCooking: boolean;
  private isWarm: boolean;
  private temperature: number;
  private rl: readline.Interface;

  constructor() {
    this.rice = 0;
    this.riceTest = 0;
    this.water = 0;
    this.waterTest = 0;
    this.isStartButtonPressed = false;
    this.isCooking = false;
    this.isWarm = false;
    this.temperature = 0;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  private askUserInput(question: string): Promise<number> {
    return new Promise(resolve => {
      this.rl.question(question, (answer: string) => {
        resolve(parseFloat(answer) || 0);
      });
    });
  }

  async addRiceFromUserInput() {
      const newRiceAmount = await this.askUserInput("Combien de grammes de riz voulez-vous ajouter ? ");
      this.rice += newRiceAmount;
      console.log(`Vous avez maintenant ${this.rice} grammes de riz.`);
  }
  
  async addWaterFromUserInput() {
    const additionalWater = await this.askUserInput("Combien de litres d'eau souhaitez-vous ajouter ? ");
    this.water += additionalWater;
    console.log(`Vous avez maintenant ${this.water} litres d'eau.`);
  }

  async removeWaterFromUserInput() {
    if (this.water > 0) {
      const waterToRemove = await this.askUserInput("Combien de litres d'eau voulez-vous retirer ? ");
      if (waterToRemove <= this.water) {
        this.water -= waterToRemove;
        console.log(`Vous avez maintenant ${this.water} litres d'eau.`);
      } else {
        console.log("Impossible de retirer plus d'eau que ce qui est disponible.");
      }
    } else {
      console.log("Il n'y a pas d'eau à retirer.");
    }
  }

  async removeRiceFromUserInput() {
    if (this.rice > 0 && this.water === 0) {
      const riceToRemove = await this.askUserInput("Combien de grammes de riz voulez-vous retirer ? ");
      if (riceToRemove <= this.rice) {
        this.rice -= riceToRemove;
        console.log(`Vous avez maintenant ${this.rice} grammes de riz.`);
      } else {
        console.log("Impossible de retirer plus de riz que ce qui est disponible.");
      }
    } else {
      console.log("Impossible de retirer du riz après avoir ajouté de l'eau.");
    }
  }  
  
  calculateWaterFromRice() {
    const waterRatio = 2;
    this.waterTest = this.rice * waterRatio / 1000;
    console.log(`Pour ${this.rice} g de riz, vous aurez besoin de ${this.waterTest} litres d'eau.`);
  }

  calculateRiceFromWater() {
    const riceRatio = 0.5;
    this.riceTest = this.water * riceRatio * 1000;
    console.log(`Avec ${this.water} litres d'eau, vous aurez environ ${this.riceTest} grammes de riz.`);
  }

  getWaterAmount() {
    console.log(`\nQuantité d'eau actuelle : ${this.water} litres`);
  }

  getRiceAmount() {
    console.log(`\nQuantité de riz actuelle : ${this.rice} grammes`);
  }

  getTemperature() {
    console.log(`\nTempérature actuelle du cuiseur à riz : ${this.temperature} °C`);
  }

  turnOnPower() {
    console.log("\nVeuillez allumer l'alimentation électrique.");
    this.rl.question("\nAppuyez sur 'Y' pour allumer l'alimentation électrique : ", (answer: string) => {
      switch (answer.toUpperCase()) {
        case 'Y':
          this.isStartButtonPressed = true;
          console.log("\nAlimentation électrique allumée.");
          this.showMenu();
          break;
        default:
          console.log("\nL'alimentation électrique n'a pas été activée.");
          this.rl.close();
          break;
      }
    });
  }

  async showMenu() {
    console.log("\nMenu:");
    console.log("1. Ajouter du riz");
    console.log("2. Ajouter de l'eau");
    console.log("3. Enlever de l'eau");
    console.log("4. Enlever du riz");
    console.log("5. Voir la quantité d'eau");
    console.log("6. Voir la quantité de riz");
    console.log("7. Voir la température");
    console.log("8. Tout faire cuire");
    console.log("9. Quitter");

    const choice = await this.askUserInput("Choisissez une option : ");

    switch (choice) {
      case 1:
        await this.addRiceFromUserInput();
        this.calculateWaterFromRice();
        this.showMenu();
        break;
      case 2:
        await this.addWaterFromUserInput();
        this.calculateRiceFromWater();
        this.showMenu();
        break;
      case 3:
        await this.removeWaterFromUserInput();
        this.showMenu();
        break;
      case 4:
        await this.removeRiceFromUserInput();
        this.showMenu();
        break;
      case 5:
        this.getWaterAmount();
        this.showMenu();
        break;
      case 6:
        this.getRiceAmount();
        this.showMenu();
        break;
      case 7:
        this.getTemperature();
        this.showMenu();
        break;
      case 8:
        this.startCooking();
        break;
      case 9:
        console.log("Arrêt du programme.");
        this.rl.close();
        break;
      default:
        console.log("Option invalide.");
        this.showMenu();
        break;
      }
  }
  
  checkWaterAmount(): boolean {
    if (this.rice === 0 || this.water === 0) {
      console.log("Ajoutez du riz et de l'eau pour démarrer la cuisson.");
      return false;
    }
  
    return true;
  }  

  startCooking() {
    if (!this.isStartButtonPressed) {
      console.log("Vérifiez le bouton de démarrage pour commencer la cuisson.");
      return;
    }
  
    if (this.isCooking) {
      console.log("Le processus de cuisson est déjà en cours.");
      return;
    }
  
    const waterCheck = this.checkWaterAmount();
    if (!waterCheck) {
      console.log("Impossible de démarrer la cuisson : vérifiez la quantité d'eau et de riz.");
      this.showMenu();
      return;
    }
  
    this.isCooking = true;
    console.log("Cuisson en cours...");
    setTimeout(() => {
      this.isCooking = false;
      this.keepWarm();
      console.log("Le riz est prêt !");
      this.rl.close();
    }, 5000);
  }  

  keepWarm() {
    this.isWarm = true;
    console.log("Maintien au chaud...");
  }

  stopCooking() {
    this.isCooking = false;
    this.isWarm = false;
    console.log("Arrêt de la cuisson.");
    this.rl.close();
  }

  checkCommonErrors() {
    if (this.rice > 0 && this.water === 0) {
      console.log("Erreur : Ajoutez une quantité suffisante d'eau.");
      return true;
    }
    if (!this.isCooking && this.rice === 0 && this.water === 0) {
      console.log("Erreur : Le cuiseur est vide. Ajoutez du riz et de l'eau.");
      return true;
    }
    if (!this.isCooking && this.rice > 0 && this.water === 0) {
      console.log("Erreur : Ajoutez de l'eau pour démarrer la cuisson.");
      return true;
    }
    if (!this.isCooking && this.rice === 0 && this.water > 0) {
      console.log("Erreur : Ajoutez du riz pour démarrer la cuisson.");
      return true;
    }
    return false;
  }
}