class RiceCooker:
    def __init__(self):
        self.rice = 0
        self.rice_test = 0
        self.water = 0
        self.water_test = 0
        self.is_start_button_pressed = False
        self.is_cooking = False
        self.is_warm = False
        self.temperature = 0

    def add_rice_from_user_input(self):
        new_rice_amount = float(input("Combien de grammes de riz voulez-vous ajouter ? "))
        self.rice += new_rice_amount
        print(f"Vous avez maintenant {self.rice} grammes de riz.")

    def add_water_from_user_input(self):
        additional_water = float(input("Combien de litres d'eau souhaitez-vous ajouter ? "))
        self.water += additional_water
        print(f"Vous avez maintenant {self.water} litres d'eau.")

    def remove_water_from_user_input(self):
        if self.water > 0:
            water_to_remove = float(input("Combien de litres d'eau voulez-vous retirer ? "))
            if water_to_remove <= self.water:
                self.water -= water_to_remove
                print(f"Vous avez maintenant {self.water} litres d'eau.")
            else:
                print("Impossible de retirer plus d'eau que ce qui est disponible.")
        else:
            print("Il n'y a pas d'eau à retirer.")

    def remove_rice_from_user_input(self):
        if self.rice > 0 and self.water == 0:
            rice_to_remove = float(input("Combien de grammes de riz voulez-vous retirer ? "))
            if rice_to_remove <= self.rice:
                self.rice -= rice_to_remove
                print(f"Vous avez maintenant {self.rice} grammes de riz.")
            else:
                print("Impossible de retirer plus de riz que ce qui est disponible.")
        else:
            print("Impossible de retirer du riz après avoir ajouté de l'eau.")

    def calculate_water_from_rice(self):
        water_ratio = 2
        self.water_test = self.rice * water_ratio / 1000
        print(f"Avec {self.rice} g de riz, vous aurez besoin de {self.water_test} litres d'eau.")

    def calculate_rice_from_water(self):
        rice_ratio = 0.5
        self.rice_test = self.water * rice_ratio * 1000
        print(f"Avec {self.water} litres d'eau, vous aurez environ {self.rice_test} grammes de riz.")

    def get_water_amount(self):
        print(f"\nQuantité d'eau actuelle : {self.water} litres")

    def get_rice_amount(self):
        print(f"\nQuantité de riz actuelle : {self.rice} grammes")

    def get_temperature(self):
        print(f"\nTempérature actuelle du cuiseur à riz : {self.temperature} °C")

    def turn_on_power(self):
        print("\nVeuillez allumer l'alimentation électrique.")
        answer = input("\nAppuyez sur 'Y' pour allumer l'alimentation électrique : ")
        if answer.upper() == 'Y':
            self.is_start_button_pressed = True
            print("\nAlimentation électrique allumée.")
            self.show_menu()
        else:
            print("\nL'alimentation électrique n'a pas été activée.")

    def show_menu(self):
        print("\nMenu:")
        print("1. Ajouter du riz")
        print("2. Ajouter de l'eau")
        print("3. Enlever de l'eau")
        print("4. Enlever du riz")
        print("5. Voir la quantité d'eau")
        print("6. Voir la quantité de riz")
        print("7. Voir la température")
        print("8. Tout faire cuire")
        print("9. Quitter")

        choice = int(input("Choisissez une option : "))

        if choice == 1:
            self.add_rice_from_user_input()
            self.calculate_water_from_rice()
            self.show_menu()
        elif choice == 2:
            self.add_water_from_user_input()
            self.calculate_rice_from_water()
            self.show_menu()
        elif choice == 3:
            self.remove_water_from_user_input()
            self.show_menu()
        elif choice == 4:
            self.remove_rice_from_user_input()
            self.show_menu()
        elif choice == 5:
            self.get_water_amount()
            self.show_menu()
        elif choice == 6:
            self.get_rice_amount()
            self.show_menu()
        elif choice == 7:
            self.get_temperature()
            self.show_menu()
        elif choice == 8:
            self.start_cooking()
        elif choice == 9:
            print("Arrêt du programme.")
        else:
            print("Option invalide.")
            self.show_menu()

            def check_water_amount(self):
                if self.rice == 0 or self.water == 0:
                    print("Ajoutez du riz et de l'eau pour démarrer la cuisson.")
                    return False
                return True

    def start_cooking(self):
        if not self.is_start_button_pressed:
            print("Vérifiez le bouton de démarrage pour commencer la cuisson.")
            return

        if self.is_cooking:
            print("Le processus de cuisson est déjà en cours.")
            return

        water_check = self.get_water_amount()  # Utilisation de get_water_amount() pour vérifier la quantité d'eau
        if water_check is False:
            print("Impossible de démarrer la cuisson : vérifiez la quantité d'eau et de riz.")
            return

        # Si la quantité d'eau est supérieure à 2 fois la quantité de riz, affiche un avertissement
        if self.water > 2 * self.rice:
            print("Attention : la quantité d'eau est supérieure à la normale. La cuisson peut être affectée.")

        self.is_cooking = True
        print("Cuisson en cours...")
        # Simuler un délai de cuisson de 5 secondes
        import time
        time.sleep(5)
        self.is_cooking = False
        self.keep_warm()
        print("Le riz est prêt !")

    def keep_warm(self):
        self.is_warm = True
        print("Maintien au chaud...")

    def stop_cooking(self):
        self.is_cooking = False
        self.is_warm = False
        print("Arrêt de la cuisson.")
